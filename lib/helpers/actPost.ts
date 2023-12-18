import { AnyAction, Dispatch } from "redux";
import { omit } from "lodash";
import { WalletClient, PublicClient } from "viem";
import { ActOnOpenActionInput } from "../../graphql/generated";
import { collectPost } from "../../graphql/lens/mutations/collect";
import handleIndexCheck from "./handleIndexCheck";
import { LENS_HUB_PROXY_ADDRESS_MATIC } from "../constants";
import { polygon } from "viem/chains";
import { setIndexer } from "../../redux/reducers/indexerSlice";
import LensHubProxy from "./../../abis/LensHubProxy.json";
import broadcast from "../../graphql/lens/mutations/broadcast";
import { setInsufficientBalance } from "../../redux/reducers/insufficientBalanceSlice";

const actPost = async (
  pubId: string,
  actOn: ActOnOpenActionInput,
  dispatch: Dispatch<AnyAction>,
  address: `0x${string}`,
  clientWallet: WalletClient,
  publicClient: PublicClient
): Promise<boolean | void> => {
  try {
    const { data } = await collectPost({
      for: pubId,
      actOn,
    });

    const typedData = data?.createActOnOpenActionTypedData.typedData;

    const signature = await clientWallet.signTypedData({
      domain: omit(typedData?.domain, ["__typename"]),
      types: omit(typedData?.types, ["__typename"]),
      primaryType: "Act",
      message: omit(typedData?.value, ["__typename"]),
      account: address as `0x${string}`,
    });

    const broadcastResult = await broadcast({
      id: data?.createActOnOpenActionTypedData?.id,
      signature,
    });

    if (
      broadcastResult?.data?.broadcastOnchain?.__typename === "RelaySuccess"
    ) {
      await handleIndexCheck(
        {
          forTxId: broadcastResult?.data?.broadcastOnchain.txId,
        },
        dispatch
      );
    } else {
      const { request } = await publicClient.simulateContract({
        address: LENS_HUB_PROXY_ADDRESS_MATIC,
        abi: LensHubProxy,
        functionName: "act",
        chain: polygon,
        args: [
          {
            publicationActedProfileId: parseInt(
              typedData?.value.publicationActedProfileId,
              16
            ),
            publicationActedId: parseInt(
              typedData?.value.publicationActedId,
              16
            ),
            actorProfileId: parseInt(typedData?.value.actorProfileId, 16),
            referrerProfileIds: typedData?.value.referrerProfileIds,
            referrerPubIds: typedData?.value.referrerPubIds,
            actionModuleAddress: typedData?.value.actionModuleAddress,
            actionModuleData: typedData?.value.actionModuleData,
          },
        ],
        account: address,
      });

      const res = await clientWallet.writeContract(request);
      const tx = await publicClient.waitForTransactionReceipt({ hash: res });

      dispatch(
        setIndexer({
          actionOpen: true,
          actionMessage: "Indexing Collect",
        })
      );

      await handleIndexCheck(
        {
          forTxHash: tx.transactionHash,
        },
        dispatch
      );

      dispatch(
        setIndexer({
          actionOpen: false,
          actionMessage: undefined,
        })
      );
    }
    return true;
  } catch (err: any) {
    dispatch(
      setInsufficientBalance({
        actionMessage:
          "There was an issue estimating the tx gas. Try reducing the number of tokens you collect at once!",
        actionValue: true,
      })
    );
    console.error(err.message);
  }
};

export default actPost;
