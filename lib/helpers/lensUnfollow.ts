import { omit } from "lodash";
import LensHubProxy from "./../../abis/LensHubProxy.json";
import { AnyAction, Dispatch } from "redux";
import unfollow from "../../graphql/lens/mutations/unfollow";
import { WalletClient, PublicClient } from "viem";
import broadcast from "../../graphql/lens/mutations/broadcast";
import { setIndexer } from "../../redux/reducers/indexerSlice";
import { LENS_HUB_PROXY_ADDRESS_MATIC } from "../constants";
import { polygon } from "viem/chains";
import handleIndexCheck from "../../graphql/lens/queries/indexed";
import { TFunction } from "i18next";

const lensUnfollow = async (
  id: string,
  dispatch: Dispatch<AnyAction>,
  address: `0x${string}`,
  clientWallet: WalletClient,
  publicClient: PublicClient,
  t: TFunction<"collect", undefined>
): Promise<void> => {
  const { data } = await unfollow({
    unfollow: [id],
  });

  const typedData = data?.createUnfollowTypedData.typedData;

  const signature = await clientWallet.signTypedData({
    domain: omit(typedData?.domain, ["__typename"]),
    types: omit(typedData?.types, ["__typename"]),
    primaryType: "Unfollow",
    message: omit(typedData?.value, ["__typename"]),
    account: address as `0x${string}`,
  });

  const broadcastResult = await broadcast({
    id: data?.createUnfollowTypedData?.id,
    signature,
  });

  if (broadcastResult?.data?.broadcastOnchain?.__typename === "RelaySuccess") {
    dispatch(
      setIndexer({
        actionOpen: true,
        actionMessage: t("indexInt"),
      })
    );

    await handleIndexCheck(
      {
        forTxId: broadcastResult?.data?.broadcastOnchain?.txId,
      },
      dispatch,
      t
    );
  } else {
    const { request } = await publicClient.simulateContract({
      address: LENS_HUB_PROXY_ADDRESS_MATIC,
      abi: LensHubProxy,
      functionName: "unfollow",
      chain: polygon,
      args: [
        typedData?.value?.unfollowerProfileId,
        typedData?.value?.idsOfProfilesToUnfollow,
      ],
      account: address,
    });
    const res = await clientWallet.writeContract(request);
    const tx = await publicClient.waitForTransactionReceipt({ hash: res });

    await handleIndexCheck(
      {
        forTxHash: tx.transactionHash,
      },
      dispatch,
      t
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

export default lensUnfollow;
