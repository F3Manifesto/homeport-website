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
import {
  deposit,
  executePostAction,
  fetchAccountBalances,
} from "@lens-protocol/client/actions";
import {
  AnyAccountBalance,
  blockchainData,
  Erc20Amount,
  evmAddress,
} from "@lens-protocol/client";
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
    litNetwork: LIT_NETWORK.DatilDev,
    debug: false,
  });
  const context = useContext(ModalContext);
  const coder = new ethers.AbiCoder();
  const [deposited, setDeposited] = useState<boolean>(false);
  const [depositLoading, setDepositLoading] = useState<boolean>(false);
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
            value: address?.toLowerCase() as string,
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

      return JSON.stringify({
        ciphertext,
        dataToEncryptHash,
        accessControlConditions,
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const checkDeposited = async () => {
    try {
      if (!context?.lensConectado?.sessionClient) return;

      const res = await fetchAccountBalances(
        context?.lensConectado?.sessionClient!,
        {
          includeNative: false,
          tokens: [details?.checkoutCurrency],
        }
      );

      if (res?.isOk()) {
        if (
          ((res.value as AnyAccountBalance[])?.[0] as Erc20Amount)?.value >=
          (Number(collection?.price) /
            10 ** 18 /
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
          setDeposited(true);
        } else {
          setDeposited(false);
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const depositFunds = async () => {
    if (!context?.lensConectado?.sessionClient) return;
    setDepositLoading(true);
    try {
      const res = await deposit(context?.lensConectado?.sessionClient!, {
        erc20: {
          value:
            (Number(collection?.price) /
              10 ** 18 /
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
            ),
          currency: evmAddress(details?.checkoutCurrency),
        },
      });

      if (res?.isOk()) {
        const provider = new ethers.BrowserProvider(window.ethereum);

        const signer = await provider.getSigner();

        const tx = {
          chainId: (res.value as any)?.raw?.chainId,
          from: (res.value as any)?.raw?.from,
          to: (res.value as any)?.raw?.to,
          nonce: (res.value as any)?.raw?.nonce,
          gasLimit: (res.value as any)?.raw?.gasLimit,
          maxFeePerGas: (res.value as any)?.raw?.maxFeePerGas,
          maxPriorityFeePerGas: (res.value as any)?.raw?.maxPriorityFeePerGas,
          value: (res.value as any)?.raw?.value,
          data: (res.value as any)?.raw?.data,
        };
        const txResponse = await signer.sendTransaction(tx);
        await txResponse.wait();
        setDeposited(true);
      } else {
        context?.setNotification(dict?.collect?.pockets);
      }
    } catch (err: any) {
      context?.setNotification(dict?.collect?.pockets);

      console.error(err.message);
    }
    setDepositLoading(false);
  };

  const collectItem = async () => {
    setCollectPostLoading(true);
    const encryptedFulfillment = await encryptFulfillment();

    try {
      const erc20 = new ethers.Contract(
        details?.checkoutCurrency,
        [
          "function approve(address spender, uint256 amount) public returns (bool)",
        ],
        new ethers.JsonRpcProvider("https://rpc.lens.xyz", 232)
      );

      const approveData = erc20.interface.encodeFunctionData("approve", [
        F3M_OPEN_ACTION,
        BigInt(
          ((Number(collection?.price) * 1.1) /
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
      ]);

      const clientWallet = createWalletClient({
        chain: chains.mainnet,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: context?.lensConectado?.profile?.address,
        abi: [
          {
            type: "function",
            name: "executeTransaction",
            inputs: [
              { name: "to", type: "address" },
              { name: "value", type: "uint256" },
              { name: "data", type: "bytes" },
            ],
            outputs: [{ name: "", type: "bytes" }],
            stateMutability: "payable",
          },
        ],
        functionName: "executeTransaction",
        chain: chains.mainnet,
        args: [
          details?.checkoutCurrency as `0x${string}`,
          BigInt(0),
          approveData as `0x${string}`,
        ],
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });

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
                      ["string", "address", "bool"],
                      [encryptedFulfillment, details?.checkoutCurrency, 1]
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
      checkDeposited();
    }
  }, [details?.checkoutCurrency, context?.lensConectado?.sessionClient]);
  return {
    details,
    setDetails,
    collectPostLoading,
    deposited,
    depositLoading,
    depositFunds,
    collectItem,
  };
};

export default useCheckout;
