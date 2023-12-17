import { omit } from "lodash";
import LensHubProxy from "./../../abis/LensHubProxy.json";
import { AnyAction, Dispatch } from "redux";
import { WalletClient, PublicClient } from "viem";
import { polygon } from "viem/chains";
import { FetchResult } from "@apollo/client";
import {
  collectPost,
  legacyCollectPost,
} from "../../graphql/lens/mutations/collect";
import { BroadcastOnchainMutation } from "../../graphql/generated";
import broadcast from "../../graphql/lens/mutations/broadcast";
import handleIndexCheck from "./handleIndexCheck";
import { setIndexer } from "../../redux/reducers/indexerSlice";
import { LENS_HUB_PROXY_ADDRESS_MATIC } from "../constants";

const lensCollect = async (
  id: string,
  type: string,
  dispatch: Dispatch<AnyAction>,
  address: `0x${string}`,
  clientWallet: WalletClient,
  publicClient: PublicClient
): Promise<void> => {
  let broadcastResult: FetchResult<BroadcastOnchainMutation>,
    functionName: string,
    args: any[];

  if (
    type === "SimpleCollectOpenActionSettings" ||
    type === "MultirecipientFeeCollectOpenActionSettings"
  ) {
    const { data } = await collectPost({
      for: id,
      actOn: {
        simpleCollectOpenAction:
          type === "SimpleCollectOpenActionSettings" ? true : undefined,
        multirecipientCollectOpenAction:
          type === "MultirecipientFeeCollectOpenActionSettings"
            ? true
            : undefined,
      },
    });

    const typedData = data?.createActOnOpenActionTypedData.typedData;

    const signature = await clientWallet.signTypedData({
      domain: omit(typedData?.domain, ["__typename"]),
      types: omit(typedData?.types, ["__typename"]),
      primaryType: "Act",
      message: omit(typedData?.value, ["__typename"]),
      account: address as `0x${string}`,
    });

    broadcastResult = await broadcast({
      id: data?.createActOnOpenActionTypedData?.id,
      signature,
    });
    functionName = "act";
    args = [
      {
        publicationActedProfileId: typedData?.value.publicationActedProfileId,
        publicationActedId: typedData?.value.publicationActedId,
        actorProfileId: typedData?.value.actorProfileId,
        referrerProfileIds: typedData?.value.referrerProfileIds,
        referrerPubIds: typedData?.value.referrerPubIds,
        actionModuleAddress: typedData?.value.actionModuleAddress,
        actionModuleData: typedData?.value.actionModuleData,
      },
    ];
  } else {
    const { data } = await legacyCollectPost({
      on: id,
    });

    const typedData = data?.createLegacyCollectTypedData.typedData;

    const signature = await clientWallet.signTypedData({
      domain: omit(typedData?.domain, ["__typename"]),
      types: omit(typedData?.types, ["__typename"]),
      primaryType: "CollectLegacy",
      message: omit(typedData?.value, ["__typename"]),
      account: address as `0x${string}`,
    });

    broadcastResult = await broadcast({
      id: data?.createLegacyCollectTypedData?.id,
      signature,
    });

    functionName = "collectLegacy";
    args = [
      {
        publicationCollectedProfileId:
          typedData?.value.publicationCollectedProfileId,
        publicationCollectedId: typedData?.value.publicationCollectedId,
        collectorProfileId: typedData?.value.collectorProfileId,
        referrerProfileId: typedData?.value.referrerProfileId,
        referrerPubId: typedData?.value.referrerPubId,
        collectModuleData: typedData?.value.collectModuleData,
      },
    ];
  }

  if (broadcastResult?.data?.broadcastOnchain?.__typename === "RelaySuccess") {
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
      functionName,
      chain: polygon,
      args,
      account: address,
    });
    const res = await clientWallet.writeContract(request);
    const tx = await publicClient.waitForTransactionReceipt({ hash: res });
    dispatch(
      setIndexer({
        actionOpen: true,
        actionMessage: "Indexing Interaction",
      })
    );

    await handleIndexCheck(
      {
        forTxHash: tx.transactionHash,
      },
      dispatch
    );
  }

  setTimeout(() => {
    dispatch(
      setIndexer({
        actionOpen: false,
        actionMessage: undefined,
      })
    );
  }, 3000);
};

export default lensCollect;
