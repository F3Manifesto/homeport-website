import { useEffect, useState } from "react";
import { Details, Gallery, OracleData } from "../../../../types/general.types";
import { Profile } from "../../../../graphql/generated";
import {
  LitNodeClient,
  checkAndSignAuthMessage,
} from "@lit-protocol/lit-node-client";
import { PublicClient, createWalletClient, custom } from "viem";
import { ACCEPTED_TOKENS, F3M_OPEN_ACTION } from "../../../../lib/constants";
import { polygon } from "viem/chains";
import { Dispatch } from "redux";
import toHexWithLeadingZero from "../../../../lib/helpers/leadingZero";
import findBalance from "../../../../lib/helpers/findBalance";
import actPost from "../../../../lib/helpers/actPost";
import { setInsufficientBalance } from "../../../../redux/reducers/insufficientBalanceSlice";
import encodeActData from "../../../../lib/helpers/encodeActData";
import { setSuccessCheckout } from "../../../../redux/reducers/successCheckoutSlice";
import { encryptItems } from "../../../../lib/helpers/encryptItems";

const useCheckout = (
  collection: Gallery | undefined,
  address: `0x${string}` | undefined,
  lensConnected: Profile | undefined,
  client: LitNodeClient,
  publicClient: PublicClient,
  oracleData: OracleData[],
  dispatch: Dispatch
) => {
  const [encryptedFulfillment, setEncryptedFulfillment] = useState<
    | {
        pubId: string;
        data: string;
      }[]
    | undefined
    | undefined
  >();
  const [isApprovedSpend, setApprovedSpend] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const [encryptionLoading, setEncryptionLoading] = useState<boolean>(false);
  const [collectPostLoading, setCollectPostLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<Details>({
    name: "",
    contact: "",
    address: "",
    zip: "",
    city: "",
    state: "",
    country: "",
    checkoutCurrency: "",
    chosenAmount: 1,
  });

  const encryptFulfillment = async () => {
    if (
      !address ||
      details?.address?.trim() === "" ||
      details?.city?.trim() === "" ||
      details?.name?.trim() === "" ||
      details?.state?.trim() === "" ||
      details?.zip?.trim() === "" ||
      details?.country?.trim() === ""
    )
      return;
    setEncryptionLoading(true);
    try {
      const authSig = await checkAndSignAuthMessage({
        chain: "polygon",
      });

      await client.connect();

      const encryptedItems = await encryptItems(
        client,
        {
          ...details,
          contact: lensConnected?.handle?.suggestedFormatted?.localName!,
        },
        address,
        authSig,
        collection!
      );
      setEncryptedFulfillment(encryptedItems);
    } catch (err: any) {
      console.error(err.message);
    }
    setEncryptionLoading(false);
  };

  const checkApproved = async () => {
    try {
      const data = await publicClient.readContract({
        address: details?.checkoutCurrency?.toLowerCase() as `0x${string}`,
        abi: [
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
            ],
            name: "allowance",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
        ],
        functionName: "allowance",
        args: [address as `0x${string}`, F3M_OPEN_ACTION],
        account: address,
      });

      if (address) {
        if (
          Number((data as any)?.toString()) /
            Number(
              oracleData?.find(
                (oracle) => oracle.currency === details?.checkoutCurrency
              )?.wei
            ) >=
          Number(
            Number(collection?.prices?.[0]) * details?.chosenAmount * 10 ** 18
          ) /
            Number(
              oracleData?.find(
                (oracle) => oracle.currency === details?.checkoutCurrency
              )?.rate
            )
        ) {
          setApprovedSpend(true);
        } else {
          setApprovedSpend(false);
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const approveSpend = async () => {
    setApproveLoading(true);
    try {
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: details?.checkoutCurrency as `0x${string}`,
        abi: [
          details?.checkoutCurrency ===
          "0x6968105460f67c3bf751be7c15f92f5286fd0ce5"
            ? {
                inputs: [
                  {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "tokens",
                    type: "uint256",
                  },
                ],
                name: "approve",
                outputs: [
                  { internalType: "bool", name: "success", type: "bool" },
                ],
                stateMutability: "nonpayable",
                type: "function",
              }
            : details?.checkoutCurrency ===
              "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"
            ? {
                constant: false,
                inputs: [
                  { name: "guy", type: "address" },
                  { name: "wad", type: "uint256" },
                ],
                name: "approve",
                outputs: [{ name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
              }
            : {
                inputs: [
                  {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                ],
                name: "approve",
                outputs: [
                  {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                  },
                ],
                stateMutability: "nonpayable",
                type: "function",
              },
        ],
        functionName: "approve",
        chain: polygon,
        args: [
          F3M_OPEN_ACTION,
          ((Number(
            Number(collection?.prices?.[0]) * details?.chosenAmount * 10 ** 18
          ) /
            Number(
              oracleData?.find(
                (oracle) =>
                  oracle.currency ===
                  ACCEPTED_TOKENS.find(
                    (item) => item[2] === details?.checkoutCurrency
                  )?.[2]
              )?.rate
            )) *
            10 ** 18 *
            1.3) as any,
        ],
        account: address,
      });
      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });
      setApprovedSpend(true);
    } catch (err: any) {
      console.error(err.message);
    }
    setApproveLoading(false);
  };

  const collectItem = async () => {
    if (!encryptedFulfillment) return;

    setCollectPostLoading(true);
    try {
      const balance = await findBalance(
        publicClient,
        details?.checkoutCurrency,
        address as `0x${string}`
      );

      if (
        Number(balance) <
        (Number(
          Number(collection?.prices?.[0]) * details?.chosenAmount * 10 ** 18
        ) /
          Number(
            oracleData?.find(
              (oracle) =>
                oracle.currency?.toLowerCase() ===
                details?.checkoutCurrency?.toLowerCase()
            )?.rate
          )) *
          Number(
            oracleData?.find(
              (oracle) =>
                oracle.currency?.toLowerCase() ===
                details?.checkoutCurrency?.toLowerCase()
            )?.wei
          )
      ) {
        dispatch(
          setInsufficientBalance({
            actionValue: true,
            actionMessage: "Pockets Empty. Need to top up?",
          })
        );
        setCollectPostLoading(false);
        return;
      }

      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      const unknownOpenAction = encodeActData(
        [0],
        [details?.chosenAmount],
        encryptedFulfillment[0]?.data,
        details?.checkoutCurrency as `0x${string}`
      );

      const success = await actPost(
        `${toHexWithLeadingZero(
          Number(collection?.profileId)
        )}-${toHexWithLeadingZero(Number(collection?.pubId))}`,
        {
          unknownOpenAction,
        },
        dispatch,
        address as `0x${string}`,
        clientWallet,
        publicClient
      );

      setEncryptedFulfillment(undefined);
      setDetails((prev) => ({
        name: "",
        contact: "",
        address: "",
        zip: "",
        city: "",
        state: "",
        country: "",
        checkoutCurrency: prev?.checkoutCurrency,
        chosenAmount: 1,
      }));
      dispatch(
        setSuccessCheckout({
          actionValue: true,
          actionImage:
            collection?.collectionMetadata?.images?.[0]?.split("ipfs://")?.[1],
        })
      );
    } catch (err: any) {
      console.error(err.message);
    }

    setCollectPostLoading(false);
  };

  useEffect(() => {
    if (collection && details?.checkoutCurrency == "") {
      setDetails((prev) => ({
        ...prev,
        checkoutCurrency: collection?.acceptedTokens?.[0],
      }));
    }
  }, [collection]);

  useEffect(() => {
    if (lensConnected?.id && details?.checkoutCurrency) {
      checkApproved();
    }
  }, [details?.checkoutCurrency, lensConnected?.id]);

  return {
    encryptedFulfillment,
    openDropdown,
    setOpenDropdown,
    details,
    setDetails,
    encryptionLoading,
    approveLoading,
    collectPostLoading,
    encryptFulfillment,
    isApprovedSpend,
    approveSpend,
    collectItem,
  };
};

export default useCheckout;
