import { useContext, useEffect, useState } from "react";
import { LIT_NETWORK } from "@lit-protocol/constants";
import { AccessControlConditions } from "@lit-protocol/types";
import {
  LitNodeClient,
  checkAndSignAuthMessage,
  uint8arrayFromString,
} from "@lit-protocol/lit-node-client";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { DIGITALAX_ADDRESS, F3M_OPEN_ACTION } from "../../../lib/constants";
import { Details } from "../types/collect.types";
import { chains } from "@lens-chain/sdk/viem";
import { Gallery } from "../../Common/types/common.types";
import { ModalContext } from "@/app/providers";
import { executePostAction } from "@lens-protocol/client/actions";
import { blockchainData } from "@lens-protocol/client";
import { ethers } from "ethers";
import pollResult from "@/app/lib/helpers/pollResult";

const useCheckout = (
  collection: Gallery,
  address: `0x${string}` | undefined,
  dict: any
) => {
  const publicClient = createPublicClient({
    chain: chains.mainnet,
    transport: http("https://rpc.lens.xyz"),
  });
  const client = new LitNodeClient({
    litNetwork: LIT_NETWORK.Datil,
    debug: false,
  });
  const context = useContext(ModalContext);
  const coder = new ethers.AbiCoder();
  const [approved, setApproved] = useState<boolean>(false);
  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const [collectPostLoading, setCollectPostLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<Details>({
    address: "",
    zip: "",
    city: "",
    state: "",
    country: "",
    checkoutCurrency: "",
    tamano: "M",
  });

  const encryptFulfillment = async () => {
    if (
      !address ||
      details?.address?.trim() === "" ||
      details?.city?.trim() === "" ||
      details?.state?.trim() === "" ||
      details?.zip?.trim() === "" ||
      details?.country?.trim() === ""
    )
      return;

    try {
      let nonce = await client.getLatestBlockhash();
      await checkAndSignAuthMessage({
        chain: "polygon",
        nonce: nonce!,
      });
      await client.connect();

      const { tamano, ...newDetails } = details;

      const accessControlConditions = [
        {
          contractAddress: "",
          standardContractType: "",
          chain: "polygon",
          method: "",
          parameters: [":userAddress"],
          returnValueTest: {
            comparator: "=",
            value: address.toLowerCase(),
          },
        },
        {
          operator: "or",
        },
        {
          contractAddress: "",
          standardContractType: "",
          chain: "polygon",
          method: "",
          parameters: [":userAddress"],
          returnValueTest: {
            comparator: "=",
            value: DIGITALAX_ADDRESS?.toLowerCase() as string,
          },
        },
      ] as AccessControlConditions;

      const { ciphertext, dataToEncryptHash } = await client.encrypt({
        accessControlConditions,
        dataToEncrypt: uint8arrayFromString(
          JSON.stringify({
            ...newDetails,
            sizes: tamano?.trim() !== "" ? [tamano] : [],
            fulfillerAddress: [DIGITALAX_ADDRESS],
          })
        ),
      });

      const res = await fetch("/api/ipfs", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ciphertext,
          dataToEncryptHash,
          accessControlConditions,
          chain: "polygon",
        }),
      });
      const json = await res.json();

      if (!json?.cid) {
        return "";
      }

      return "ipfs://" + json?.cid;
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const checkApproved = async () => {
    try {
      if (!context?.lensConectado?.sessionClient) return;

      const data = await publicClient.readContract({
        address: details?.checkoutCurrency as `0x${string}`,
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
      });

      if (
        Number(data as any) >=
        (Number(collection?.price) /
          Number(
            context?.oracleData?.find(
              (oraculo) =>
                oraculo.currency?.toLowerCase() ===
                details?.checkoutCurrency?.toLowerCase()
            )?.rate
          )) *
          Number(
            context?.oracleData?.find(
              (oraculo) =>
                oraculo.currency?.toLowerCase() ===
                details?.checkoutCurrency?.toLowerCase()
            )?.wei
          )
      ) {
        setApproved(true);
      } else {
        setApproved(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const approveFunds = async () => {
    if (!context?.lensConectado?.sessionClient) return;
    setApproveLoading(true);
    try {
      const clientWallet = createWalletClient({
        chain: chains.mainnet,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: details?.checkoutCurrency as `0x${string}`,
        abi: [
          {
            type: "function",
            name: "approve",
            inputs: [
              { name: "spender", type: "address", internalType: "address" },
              { name: "value", type: "uint256", internalType: "uint256" },
            ],
            outputs: [{ name: "", type: "bool", internalType: "bool" }],
            stateMutability: "nonpayable",
          },
        ],
        functionName: "approve",
        args: [
          F3M_OPEN_ACTION,
          BigInt(
            (Number(collection?.price) /
              Number(
                context?.oracleData?.find(
                  (oraculo) =>
                    oraculo.currency?.toLowerCase() ===
                    details?.checkoutCurrency?.toLowerCase()
                )?.rate
              )) *
              Number(
                context?.oracleData?.find(
                  (oraculo) =>
                    oraculo.currency?.toLowerCase() ===
                    details?.checkoutCurrency?.toLowerCase()
                )?.wei
              )
          ),
        ],
        chain: chains.mainnet,
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      const tx = await publicClient.waitForTransactionReceipt({ hash: res });

      if (tx?.transactionHash) {
        setApproved(true);
      } else {
        context?.setNotification(dict?.collect?.pockets);
      }
    } catch (err: any) {
      context?.setNotification(dict?.collect?.pockets);

      console.error(err.message);
    }
    setApproveLoading(false);
  };

  const collectItem = async () => {
    setCollectPostLoading(true);
    const encryptedFulfillment = await encryptFulfillment();

    if (!encryptedFulfillment || !encryptedFulfillment?.includes("ipfs://")) {
      context?.setNotification(dict?.collect?.fill);
      setCollectPostLoading(false);
      return;
    }

    try {
      const postRes = await executePostAction(
        context?.lensConectado?.sessionClient!,
        {
          post: collection?.postId,
          action: {
            unknown: {
              address: F3M_OPEN_ACTION,
              params: [
                {
                  key: ethers.keccak256(
                    ethers.toUtf8Bytes("lens.param.buyF3M")
                  ),
                  data: blockchainData(
                    coder.encode(
                      ["string[]", "address[]", "uint256[]", "uint8[]"],
                      [
                        [encryptedFulfillment],
                        [details?.checkoutCurrency],
                        [],
                        [1],
                      ]
                    )
                  ),
                },
              ],
            },
          },
        }
      );

      if (postRes.isErr()) {
        context?.setNotification?.(dict.common.error);
        setCollectPostLoading(false);
        return;
      }

      if ((postRes.value as any)?.reason?.includes("Signless")) {
        context?.setSignless?.(true);
      } else if ((postRes.value as any)?.raw) {
        context?.setIndexar(dict?.collect?.indexCol);
        const provider = new ethers.BrowserProvider(window.ethereum);

        const signer = await provider.getSigner();

        const tx = {
          chainId: (postRes.value as any)?.raw?.chainId,
          from: (postRes.value as any)?.raw?.from,
          to: (postRes.value as any)?.raw?.to,
          nonce: (postRes.value as any)?.raw?.nonce,
          gasLimit: (postRes.value as any)?.raw?.gasLimit,
          maxFeePerGas: (postRes.value as any)?.raw?.maxFeePerGas,
          maxPriorityFeePerGas: (postRes.value as any)?.raw
            ?.maxPriorityFeePerGas,
          value: (postRes.value as any)?.raw?.value,
          data: (postRes.value as any)?.raw?.data,
        };
        const txResponse = await signer.sendTransaction(tx);
        await txResponse.wait();

        setDetails((prev) => ({
          address: "",
          zip: "",
          city: "",
          state: "",
          country: "",
          checkoutCurrency: prev?.checkoutCurrency,
          chosenAmount: 1,
          tamano: "M",
        }));
        context?.setSuccessCheckout(collection);

        context?.setIndexar(dict?.collect?.index);
      } else if ((postRes.value as any)?.hash) {
        context?.setIndexar(dict?.collect?.indexCol);
        if (
          await pollResult(
            (postRes.value as any)?.hash,
            context?.lensConectado?.sessionClient!
          )
        ) {
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
            tamano: "M",
          }));
          context?.setSuccessCheckout(collection);

          context?.setIndexar(dict?.common?.index);
        } else {
          context?.setNotification?.(dict.common.error);
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }

    setTimeout(() => {
      context?.setIndexar(undefined);
    }, 3000);
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
    if (context?.lensConectado?.sessionClient && details?.checkoutCurrency) {
      checkApproved();
    }
  }, [details?.checkoutCurrency, context?.lensConectado?.sessionClient]);
  return {
    details,
    setDetails,
    collectPostLoading,
    approveLoading,
    approved,
    approveFunds,
    collectItem,
  };
};

export default useCheckout;
