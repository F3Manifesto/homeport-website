import { useEffect, useState } from "react";
import {
  Erc20,
  FeeFollowModuleSettings,
  LimitType,
  Profile,
  SimpleCollectOpenActionModuleInput,
} from "../../../graphql/generated";
import {
  PostCollectState,
  setPostCollect,
} from "../../../redux/reducers/postCollectSlice";
import {
  QuoteBoxState,
  setQuoteBox,
} from "../../../redux/reducers/quoteBoxSlice";
import { Dispatch } from "redux";
import { PublicClient, createWalletClient, custom } from "viem";
import uploadPostContent from "../../../lib/helpers/uploadPostContent";
import { polygon } from "viem/chains";
import lensQuote from "../../../lib/helpers/lensQuote";
import { setInteractError } from "../../../redux/reducers/interactErrorSlice";
import { setIndexer } from "../../../redux/reducers/indexerSlice";
import getEnabledCurrencies from "../../../graphql/lens/queries/enabledCurrencies";
import isApprovedData from "../../../graphql/lens/mutations/isApproved";
import approveCurrency from "../../../graphql/lens/mutations/approve";
import lensCollect from "../../../lib/helpers/lensCollect";
import { MakePostComment } from "../../../types/general.types";
import {
  FollowCollectState,
  setFollowCollect,
} from "../../../redux/reducers/followCollectSlice";
import { setAvailableCurrencies } from "../../../redux/reducers/availableCurrenciesSlice";
import refetchProfile from "../../../lib/helpers/refetchProfile";
import lensFollow from "../../../lib/helpers/lensFollow";
import { setInsufficientBalance } from "../../../redux/reducers/insufficientBalanceSlice";
import findBalance from "../../../lib/helpers/findBalance";

const useQuote = (
  availableCurrencies: Erc20[],
  lensConnected: Profile | undefined,
  postCollect: PostCollectState,
  followCollect: FollowCollectState,
  postBox: QuoteBoxState,
  dispatch: Dispatch,
  publicClient: PublicClient,
  address: `0x${string}` | undefined
) => {
  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);
  const [informationLoading, setInformationLoading] = useState<boolean>(false);
  const [mentionProfiles, setMentionProfiles] = useState<Profile[]>([]);
  const [profilesOpen, setProfilesOpen] = useState<boolean[]>([false]);
  const [caretCoord, setCaretCoord] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [approved, setApproved] = useState<boolean>(true);
  const [quoteLoading, setQuoteLoading] = useState<boolean[]>([false]);
  const [makeQuote, setMakeQuote] = useState<MakePostComment[]>([
    {
      content: "",
      images: [],
      videos: [],
    },
  ]);
  const [quoteContentLoading, setQuoteContentLoading] = useState<
    {
      image: boolean;
      video: boolean;
    }[]
  >([
    {
      image: false,
      video: false,
    },
  ]);
  const [collects, setCollects] = useState<
    SimpleCollectOpenActionModuleInput | undefined
  >({
    followerOnly: false,
  });
  const [openMeasure, setOpenMeasure] = useState<{
    collectible: string;
    award: string;
    whoCollectsOpen: boolean;
    creatorAwardOpen: boolean;
    currencyOpen: boolean;
    editionOpen: boolean;
    edition: string;
    timeOpen: boolean;
    time: string;
  }>({
    collectible: "Yes",
    award: "No",
    whoCollectsOpen: false,
    creatorAwardOpen: false,
    currencyOpen: false,
    editionOpen: false,
    edition: "",
    timeOpen: false,
    time: "",
  });

  const quote = async () => {
    if (!makeQuote[0]?.content && !makeQuote[0]?.images) return;
    setQuoteLoading([true]);

    try {
      const contentURI = await uploadPostContent(
        makeQuote[0]?.content?.trim() == "" ? " " : makeQuote[0]?.content,
        makeQuote[0]?.images || [],
        makeQuote[0]?.videos || []
      );

      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      await lensQuote(
        postBox?.quote?.id,
        contentURI?.string!,
        dispatch,
        postCollect.collectTypes?.[postBox?.quote?.id]
          ? [
              {
                collectOpenAction: {
                  simpleCollectOpenAction:
                    postCollect.collectTypes?.[postBox?.quote?.id]!,
                },
              },
            ]
          : undefined,
        address as `0x${string}`,
        clientWallet,
        publicClient,
        () => clearBox()
      );

      const cts = { ...postCollect.collectTypes };
      delete cts[postBox?.quote?.id];
      dispatch(
        setPostCollect({
          actionCollectType: cts,
        })
      );
    } catch (err: any) {
      if (err?.message?.includes("User rejected the request")) return;
      if (
        !err?.messages?.includes("Block at number") &&
        !err?.message?.includes("could not be found")
      ) {
        dispatch(setInteractError(true));
        console.error(err.message);
      } else {
        dispatch(
          setIndexer({
            actionOpen: true,
            actionMessage: "Successfully Indexed",
          })
        );

        setTimeout(() => {
          dispatch(
            setIndexer({
              actionOpen: false,
              actionMessage: undefined,
            })
          );
        }, 3000);
      }
    }

    setQuoteLoading([false]);
  };

  const getCurrencies = async (): Promise<void> => {
    try {
      const response = await getEnabledCurrencies({
        limit: LimitType.TwentyFive,
      });
      if (response && response.data) {
        dispatch(setAvailableCurrencies(response.data.currencies.items));
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const clearBox = () => {
    setMakeQuote([
      {
        content: "",
        images: [],
        videos: [],
      },
    ]);
    dispatch(
      setQuoteBox({
        actionOpen: false,
      })
    );
    setQuoteLoading([false]);
  };

  const checkCurrencyApproved = async () => {
    setInformationLoading(true);
    try {
      const { data } = await isApprovedData({
        currencies:
          followCollect?.type === "collect"
            ? [followCollect?.collect?.item?.amount?.asset.contract.address]
            : [
                (
                  followCollect?.follower
                    ?.followModule as FeeFollowModuleSettings
                )?.amount.asset.contract.address,
              ],
      });

      if (data && data.approvedModuleAllowanceAmount[0]) {
        parseInt(data.approvedModuleAllowanceAmount[0].allowance.value) >
        (followCollect?.type === "collect"
          ? parseInt(followCollect?.collect?.item?.amount?.value || "")
          : parseInt(
              (followCollect?.follower?.followModule as FeeFollowModuleSettings)
                ?.amount.value || ""
            ))
          ? setApproved(true)
          : setApproved(false);
      } else {
        setApproved(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setInformationLoading(false);
  };

  const approveSpend = async () => {
    if (!lensConnected?.id) return;
    setTransactionLoading(true);
    try {
      const { data } = await approveCurrency({
        allowance: {
          currency:
            followCollect?.type === "collect"
              ? followCollect?.collect?.item?.amount?.asset.contract.address!
              : (
                  followCollect?.follower
                    ?.followModule as FeeFollowModuleSettings
                )?.amount.asset.contract.address!,
          value:
            followCollect?.type === "collect"
              ? followCollect?.collect?.item?.amount?.value!
              : (
                  followCollect?.follower
                    ?.followModule as FeeFollowModuleSettings
                )?.amount.value!,
        },
        module: {
          openActionModule:
            (followCollect?.type === "collect" &&
              !followCollect?.collect?.item?.followerOnly) ||
            (followCollect?.type === "collect" &&
              followCollect?.collect?.item?.followerOnly &&
              followCollect?.follower?.operations?.isFollowedByMe?.value)
              ? followCollect?.collect?.item?.type
              : undefined,
          followModule:
            (followCollect?.type === "collect" &&
              followCollect?.collect?.item?.followerOnly &&
              !followCollect?.follower?.operations?.isFollowedByMe?.value) ||
            followCollect?.type === "follow"
              ? followCollect?.follower?.followModule?.type
              : undefined,
        },
      });

      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      const res = await clientWallet.sendTransaction({
        to: data?.generateModuleCurrencyApprovalData?.to as `0x${string}`,
        account: data?.generateModuleCurrencyApprovalData
          ?.from as `0x${string}`,
        data: data?.generateModuleCurrencyApprovalData?.data,
        value: BigInt("0"),
      });
      await publicClient.waitForTransactionReceipt({ hash: res });
      // await handleIndexCheck(
      //   {
      //     forTxHash: tx.transactionHash,
      //   },
      //   dispatch
      // );
      setApproved(true);
    } catch (err: any) {
      console.error(err.message);
    }
    setTransactionLoading(false);
  };

  const handleCollect = async () => {
    if (
      followCollect?.type === "collect" &&
      Number(followCollect?.collect?.item?.collectLimit || 0) > 0 &&
      Number(followCollect?.collect?.item?.collectLimit) ==
        Number(followCollect?.collect?.stats)
    )
      return;
    const balance = await findBalance(
      publicClient,
      followCollect?.type === "collect"
        ? followCollect?.collect?.item?.amount?.asset?.contract?.address
        : (followCollect?.follower?.followModule as FeeFollowModuleSettings)
            ?.amount?.asset?.contract?.address,
      address as `0x${string}`
    );

    if (
      Number(balance) <
      Number(
        followCollect?.type === "collect"
          ? followCollect?.collect?.item?.amount?.value
          : (followCollect?.follower?.followModule as FeeFollowModuleSettings)
              ?.amount?.value
      )
    ) {
      dispatch(
        setInsufficientBalance({
          actionValue: true,
          actionMessage: "Pockets Empty. Need to top up?",
        })
      );
      return;
    }

    setTransactionLoading(true);
    try {
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      await lensCollect(
        followCollect?.type === "collect"
          ? followCollect?.collect?.id
          : followCollect?.follower?.id,
        followCollect?.collect?.item?.__typename!,
        dispatch,
        address as `0x${string}`,
        clientWallet,
        publicClient
      );

      dispatch(
        setFollowCollect({
          actionType: undefined,
        })
      );
    } catch (err: any) {
      console.error(err.message);
    }
    setTransactionLoading(false);
  };

  const handleFollow = async () => {
    setTransactionLoading(true);
    try {
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      await lensFollow(
        (followCollect?.type === "collect" &&
          !followCollect?.collect?.item?.followerOnly) ||
          (followCollect?.type === "collect" &&
            followCollect?.collect?.item?.followerOnly &&
            followCollect?.follower?.operations?.isFollowedByMe?.value)
          ? followCollect?.collect?.id
          : followCollect?.follower?.id,
        dispatch,
        followCollect?.follower?.followModule?.__typename !==
          "FeeFollowModuleSettings"
          ? undefined
          : (followCollect?.follower?.followModule as FeeFollowModuleSettings)
              ?.amount
          ? {
              feeFollowModule: {
                amount: {
                  currency: (
                    followCollect?.follower
                      ?.followModule as FeeFollowModuleSettings
                  )?.amount.asset.contract.address,
                  value: (
                    followCollect?.follower
                      ?.followModule as FeeFollowModuleSettings
                  )?.amount.value,
                },
              },
            }
          : undefined,
        address as `0x${string}`,
        clientWallet,
        publicClient
      );
      await refetchProfile(dispatch, lensConnected?.id, lensConnected?.id);
      if (
        followCollect?.type === "collect" &&
        followCollect?.collect?.item?.followerOnly
      ) {
        dispatch(
          setFollowCollect({
            actionType: "collect",
            actionCollect: {
              id: followCollect?.collect?.id,
              stats: followCollect?.collect?.stats,
              item: followCollect?.collect?.item,
            },
            actionFollower: {
              ...followCollect?.follower,
              operations: {
                ...followCollect?.follower?.operations,
                isFollowedByMe: {
                  ...followCollect?.follower?.operations?.isFollowedByMe,
                  value: true,
                },
              },
            },
          })
        );
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setTransactionLoading(false);
  };

  useEffect(() => {
    if (availableCurrencies?.length < 1) {
      getCurrencies();
    }
  }, []);

  useEffect(() => {
    if (
      (followCollect.type === "collect" &&
        followCollect?.follower?.followModule?.__typename ==
          "FeeFollowModuleSettings") ||
      (followCollect.type === "follow" &&
        followCollect?.follower?.followModule?.__typename ==
          "FeeFollowModuleSettings") ||
      (followCollect?.type === "collect" &&
        Number(followCollect?.collect?.item?.amount?.value) > 0)
    ) {
      checkCurrencyApproved();
    }
  }, [followCollect.type]);

  useEffect(() => {
    if (postCollect.collectTypes?.[postCollect?.id!]) {
      setOpenMeasure((prev) => ({
        ...prev,
        collectible:
          postCollect.collectTypes?.[postCollect?.id!]?.amount?.value ||
          Number(postCollect.collectTypes?.[postCollect?.id!]?.amount?.value) >
            0
            ? "Yes"
            : "No",
        award:
          postCollect.collectTypes?.[postCollect?.id!]?.amount?.value ||
          Number(postCollect.collectTypes?.[postCollect?.id!]?.amount?.value)
            ? "Yes"
            : "No",
        whoCollectsOpen: false,
        creatorAwardOpen: false,
        currencyOpen: false,
        editionOpen: false,
        edition: postCollect.collectTypes?.[postCollect?.id!]?.collectLimit
          ? "Yes"
          : "No",
        timeOpen: false,
        time: postCollect.collectTypes?.[postCollect?.id!]?.endsAt
          ? "Yes"
          : "No",
      }));
    }
  }, [postCollect.id]);

  return {
    quote,
    quoteLoading,
    setMakeQuote,
    makeQuote,
    quoteContentLoading,
    setQuoteContentLoading,
    collects,
    setCollects,
    openMeasure,
    setOpenMeasure,
    informationLoading,
    transactionLoading,
    handleCollect,
    handleFollow,
    approveSpend,
    approved,
    mentionProfiles,
    setMentionProfiles,
    caretCoord,
    setCaretCoord,
    setProfilesOpen,
    profilesOpen,
  };
};

export default useQuote;
