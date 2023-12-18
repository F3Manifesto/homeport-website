import { omit } from "lodash";
import { Action, Dispatch } from "redux";
import { FollowModuleRedeemInput } from "../../graphql/generated";
import { PublicClient, WalletClient } from "viem";
import follow from "../../graphql/lens/mutations/follow";
import broadcast from "../../graphql/lens/mutations/broadcast";
import { setIndexer } from "../../redux/reducers/indexerSlice";
import handleIndexCheck from "./handleIndexCheck";
import { LENS_HUB_PROXY_ADDRESS_MATIC } from "../constants";
import { polygon } from "viem/chains";
import LensHubProxy from "./../../abis/LensHubProxy.json"

const lensFollow = async (
  id: string,
  dispatch: Dispatch<Action>,
  module: FollowModuleRedeemInput | undefined,
  address: `0x${string}`,
  clientWallet: WalletClient,
  publicClient: PublicClient
): Promise<void> => {
  const { data } = await follow({
    follow: [
      {
        profileId: id,
        followModule: module,
      },
    ],
  });
  
  const typedData = data?.createFollowTypedData?.typedData;

  const signature = await clientWallet.signTypedData({
    domain: omit(typedData?.domain, ["__typename"]),
    types: omit(typedData?.types, ["__typename"]),
    primaryType: "Follow",
    message: omit(typedData?.value, ["__typename"]),
    account: address as `0x${string}`,
  });

  const broadcastResult = await broadcast({
    id: data?.createFollowTypedData?.id,
    signature,
  });

  if (broadcastResult?.data?.broadcastOnchain?.__typename === "RelaySuccess") {
    dispatch(
      setIndexer({
        actionOpen: true,
        actionMessage: "Indexing Interaction",
      })
    );

    await handleIndexCheck(
      {
        forTxId: broadcastResult?.data?.broadcastOnchain?.txId,
      },
      dispatch
    );
  } else {
    const { request } = await publicClient.simulateContract({
      address: LENS_HUB_PROXY_ADDRESS_MATIC,
      abi: LensHubProxy,
      functionName: "follow",
      chain: polygon,
      args: [
        typedData?.value?.followerProfileId,
        typedData?.value?.idsOfProfilesToFollow,
        typedData?.value?.followTokenIds,
        typedData?.value?.datas,
      ],
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

export default lensFollow;
