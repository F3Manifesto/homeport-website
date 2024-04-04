import { SetStateAction, useEffect, useRef, useState } from "react";
import {
  Comment,
  LimitType,
  Post,
  Profile,
  PublicationStats,
  Quote,
} from "../../../graphql/generated";
import { PublicClient, createWalletClient, custom } from "viem";
import errorChoice from "../../../lib/helpers/errorChoice";
import { Dispatch } from "redux";
import { polygon } from "viem/chains";
import lensCollect from "../../../lib/helpers/lensCollect";
import lensLike from "../../../lib/helpers/lensLike";
import getPublications from "../../../graphql/lens/queries/publications";
import lensComment from "../../../lib/helpers/lensComment";
import uploadPostContent from "../../../lib/helpers/uploadPostContent";
import lensMirror from "../../../lib/helpers/lensMirror";
import { PostCollectState } from "../../../redux/reducers/postCollectSlice";
import lensFollow from "../../../lib/helpers/lensFollow";
import refetchProfile from "../../../lib/helpers/refetchProfile";
import { setInteractError } from "../../../redux/reducers/interactErrorSlice";
import { setIndexer } from "../../../redux/reducers/indexerSlice";
import lensUnfollow from "../../../lib/helpers/lensUnfollow";
import { Gallery } from "../../Home/types/home.types";
import { MakePostComment } from "../../Modals/types/modals.types";
import { TFunction } from "i18next";

const useInteractions = (
  lensConnected: Profile | undefined,
  dispatch: Dispatch,
  address: `0x${string}` | undefined,
  publicClient: PublicClient,
  collection: Gallery | undefined,
  setCollection: (e: SetStateAction<Gallery | undefined>) => void,
  postCollect: PostCollectState,
  t: TFunction<"collect", undefined>
) => {
  const commentRef = useRef<null | HTMLDivElement>(null);
  const collectRef = useRef<null | HTMLDivElement>(null);
  const [profileHovers, setProfileHovers] = useState<boolean[]>([false]);
  const [profileHoversQuote, setProfileHoversQuote] = useState<boolean[]>([
    false,
  ]);
  const [followLoading, setFollowLoading] = useState<boolean[]>([]);
  const [followLoadingQuote, setFollowLoadingQuote] = useState<boolean[]>([]);
  const [quoteContentLoading, setQuoteContentLoading] = useState<
    {
      image: boolean;
      video: boolean;
    }[]
  >([]);
  const [contentLoading, setContentLoading] = useState<
    {
      image: boolean;
      video: boolean;
    }[]
  >([]);
  const [mainContentLoading, setMainContentLoading] = useState<
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
  const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
  const [quotesLoading, setQuotesLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [mentionProfiles, setMentionProfiles] = useState<Profile[]>([]);
  const [mentionProfilesQuote, setMentionProfilesQuote] = useState<Profile[]>(
    []
  );
  const [mentionProfilesMain, setMentionProfilesMain] = useState<Profile[]>([]);
  const [profilesOpen, setProfilesOpen] = useState<boolean[]>([]);
  const [profilesOpenQuote, setProfilesOpenQuote] = useState<boolean[]>([]);
  const [profilesOpenMain, setProfilesOpenMain] = useState<boolean[]>([false]);
  const [caretCoord, setCaretCoord] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [caretCoordQuote, setCaretCoordQuote] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [caretCoordMain, setCaretCoordMain] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [commentInfo, setCommentInfo] = useState<{
    hasMore: boolean;
    cursor: string | undefined;
  }>({
    hasMore: true,
    cursor: undefined,
  });
  const [quoteInfo, setQuoteInfo] = useState<{
    hasMore: boolean;
    cursor: string | undefined;
  }>({
    hasMore: true,
    cursor: undefined,
  });
  const [commentsOpen, setCommentsOpen] = useState<boolean[]>([]);
  const [commentsQuoteOpen, setCommentsQuoteOpen] = useState<boolean[]>([]);
  const [mainInteractionsLoading, setMainInteractionsLoading] = useState<
    {
      like: boolean;
      mirror: boolean;
      comment: boolean;
      simpleCollect: boolean;
    }[]
  >(
    Array.from({ length: 1 }, () => ({
      like: false,
      mirror: false,
      comment: false,
      simpleCollect: false,
    }))
  );
  const [openItemMirrorChoice, setOpenItemMirrorChoice] = useState<boolean[]>(
    []
  );
  const [quoteOpenItemMirrorChoice, setQuoteOpenItemMirrorChoice] = useState<
    boolean[]
  >([]);
  const [makeComment, setMakeComment] = useState<MakePostComment[]>([]);
  const [makeQuoteComment, setMakeQuoteComment] = useState<MakePostComment[]>(
    []
  );
  const [mainMakeComment, setMainMakeComment] = useState<MakePostComment[]>([
    {
      content: "",
      images: [],
      videos: [],
    },
  ]);
  const [interactionsItemsLoading, setInteractionsItemsLoading] = useState<
    {
      like: boolean;
      mirror: boolean;
      comment: boolean;
      simpleCollect: boolean;
    }[]
  >([]);
  const [interactionsQuotesItemsLoading, setInteractionsQuotesItemsLoading] =
    useState<
      {
        like: boolean;
        mirror: boolean;
        comment: boolean;
        simpleCollect: boolean;
      }[]
    >([]);

  const getComments = async () => {
    setCommentsLoading(true);
    try {
      const data = await getPublications(
        {
          where: {
            commentOn: {
              id: collection?.publication?.id,
            },
          },
          limit: LimitType.Ten,
        },
        lensConnected?.id
      );
      setComments((data?.data?.publications?.items || []) as Comment[]);

      setCommentInfo({
        hasMore: data?.data?.publications?.items?.length != 10 ? false : true,
        cursor: data?.data?.publications?.pageInfo?.next,
      });
    } catch (err: any) {
      console.error(err.message);
    }
    setCommentsLoading(false);
  };

  const getMoreComments = async () => {
    if (!commentInfo?.hasMore) return;

    try {
      const data = await getPublications(
        {
          where: {
            commentOn: {
              id: collection?.publication?.id,
            },
          },
          limit: LimitType.Ten,
          cursor: commentInfo?.cursor,
        },
        lensConnected?.id
      );
      setComments([
        ...comments,
        ...((data?.data?.publications?.items || []) as Comment[]),
      ]);
      setCommentInfo({
        cursor: data?.data?.publications?.pageInfo?.next,
        hasMore: data?.data?.publications?.items?.length != 10 ? false : true,
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const getQuotes = async () => {
    setQuotesLoading(true);
    try {
      const data = await getPublications(
        {
          where: {
            quoteOn: collection?.publication?.id,
          },
          limit: LimitType.Ten,
        },
        lensConnected?.id
      );
      setQuotes((data?.data?.publications?.items || []) as Quote[]);

      setQuoteInfo({
        hasMore: data?.data?.publications?.items?.length != 10 ? false : true,
        cursor: data?.data?.publications?.pageInfo?.next,
      });
    } catch (err: any) {
      console.error(err.message);
    }
    setQuotesLoading(false);
  };

  const getMoreQuotes = async () => {
    if (!quoteInfo?.hasMore) return;

    try {
      const data = await getPublications(
        {
          where: {
            quoteOn: collection?.publication?.id,
          },
          limit: LimitType.Ten,
          cursor: quoteInfo?.cursor,
        },
        lensConnected?.id
      );
      setQuotes([
        ...quotes,
        ...((data?.data?.publications?.items || []) as Quote[]),
      ]);
      setQuoteInfo({
        cursor: data?.data?.publications?.pageInfo?.next,
        hasMore: data?.data?.publications?.items?.length != 10 ? false : true,
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const simpleCollect = async (
    id: string,
    type: string,
    main: boolean,
    quote: boolean
  ) => {
    if (!lensConnected?.id) return;
    const index = main
      ? undefined
      : quote
      ? quotes?.findIndex((pub) => pub.id === id)
      : comments?.findIndex((pub) => pub.id === id);

    if (main) {
      setMainInteractionsLoading((prev) => {
        const updatedArray = [...prev];
        updatedArray[0] = { ...updatedArray[0], simpleCollect: true };
        return updatedArray;
      });
    } else if (quote) {
      if (index == -1) {
        return;
      }

      setInteractionsQuotesItemsLoading((prev) => {
        const updatedArray = [...prev];
        updatedArray[index!] = { ...updatedArray[index!], simpleCollect: true };
        return updatedArray;
      });
    } else {
      if (index == -1) {
        return;
      }

      setInteractionsItemsLoading((prev) => {
        const updatedArray = [...prev];
        updatedArray[index!] = { ...updatedArray[index!], simpleCollect: true };
        return updatedArray;
      });
    }

    try {
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      await lensCollect(
        id,
        type,
        dispatch,
        address as `0x${string}`,
        clientWallet,
        publicClient,
        t
      );
      updateInteractions(
        index!,
        {
          hasActed: {
            __typename: "OptimisticStatusResult",
            isFinalisedOnchain: true,
            value: true,
          },
        },
        "countOpenActions",
        true,
        main,
        quote
      );
    } catch (err: any) {
      errorChoice(
        err,
        () =>
          updateInteractions(
            index!,
            {
              hasActed: {
                __typename: "OptimisticStatusResult",
                isFinalisedOnchain: true,
                value: true,
              },
            },
            "countOpenActions",
            true,
            main,
            quote
          ),
        dispatch,
        t
      );
    }

    if (main) {
      setMainInteractionsLoading((prev) => {
        const updatedArray = [...prev];
        updatedArray[0] = { ...updatedArray[0], simpleCollect: false };
        return updatedArray;
      });
    } else if (quote) {
      setInteractionsQuotesItemsLoading((prev) => {
        const updatedArray = [...prev];
        updatedArray[index!] = {
          ...updatedArray[index!],
          simpleCollect: false,
        };
        return updatedArray;
      });
    } else {
      setInteractionsItemsLoading((prev) => {
        const updatedArray = [...prev];
        updatedArray[index!] = {
          ...updatedArray[index!],
          simpleCollect: false,
        };
        return updatedArray;
      });
    }
  };

  const comment = async (id: string, main: boolean, quote: boolean) => {
    if (!lensConnected?.id) return;
    let content: string | undefined,
      images: string[] | undefined,
      videos: string[] | undefined;

    const index = main
      ? undefined
      : quote
      ? quotes?.findIndex((pub) => pub.id === id)
      : comments?.findIndex((pub) => pub.id === id);

    if (!main && !quote) {
      if (
        (!makeComment[index!]?.content &&
          !makeComment[index!]?.images &&
          !makeComment[index!]?.videos) ||
        index == -1
      )
        return;
      content = makeComment[index!]?.content;
      images = makeComment[index!]?.images!;
      videos = makeComment[index!]?.videos!;
    } else if (quote) {
      if (!makeQuoteComment[0]?.content && !makeQuoteComment[0]?.images) return;
      content = makeQuoteComment[0]?.content;
      images = makeQuoteComment[0]?.images!;
      videos = makeQuoteComment[0]?.videos!;
    } else {
      if (!mainMakeComment[0]?.content && !mainMakeComment[0]?.images) return;
      content = mainMakeComment[0]?.content;
      images = mainMakeComment[0]?.images!;
      videos = mainMakeComment[0]?.videos!;
    }

    handleLoaders(true, main, quote, index, "comment");

    try {
      const contentURI = await uploadPostContent(
        content?.trim() == "" ? " " : content,
        images || [],
        videos || []
      );

      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      await lensComment(
        id,
        contentURI?.string!,
        dispatch,
        postCollect?.collectTypes?.[id]
          ? [
              {
                collectOpenAction: {
                  simpleCollectOpenAction: postCollect?.collectTypes?.[id],
                },
              },
            ]
          : undefined,
        address as `0x${string}`,
        clientWallet,
        publicClient,
        () => clearComment(index, main, quote),
        t
      );
      updateInteractions(index!, {}, "comments", true, main, quote);
      await getComments();
    } catch (err: any) {
      errorChoice(
        err,
        () => updateInteractions(index!, {}, "comments", true, main, quote),
        dispatch,
        t
      );
    }

    handleLoaders(false, main, quote, index, "comment");
  };

  const handleLoaders = (
    start: boolean,
    main: boolean,
    quote: boolean,
    index: number | undefined,
    type: string
  ) => {
    if (start) {
      if (!main && !quote) {
        if (index === -1) {
          return;
        }

        setInteractionsItemsLoading((prev) => {
          const updatedArray = [...prev];
          updatedArray[index!] = { ...updatedArray[index!], [type]: true };
          return updatedArray;
        });
      } else if (quote) {
        setInteractionsQuotesItemsLoading((prev) => {
          const updatedArray = [...prev];
          updatedArray[index!] = { ...updatedArray[index!], [type]: true };
          return updatedArray;
        });
      } else {
        setMainInteractionsLoading((prev) => {
          const updatedArray = [...prev];
          updatedArray[0] = { ...updatedArray[0], [type]: true };
          return updatedArray;
        });
      }
    } else {
      if (!main && !quote) {
        setInteractionsItemsLoading((prev) => {
          const updatedArray = [...prev];
          updatedArray[index!] = { ...updatedArray[index!], [type]: false };
          return updatedArray;
        });
      } else if (quote) {
        setInteractionsQuotesItemsLoading((prev) => {
          const updatedArray = [...prev];
          updatedArray[index!] = { ...updatedArray[index!], [type]: false };
          return updatedArray;
        });
      } else {
        setMainInteractionsLoading((prev) => {
          const updatedArray = [...prev];
          updatedArray[0] = { ...updatedArray[0], [type]: false };
          return updatedArray;
        });
      }
    }
  };

  const clearComment = async (
    index: number | undefined,
    main: boolean,
    quote: boolean
  ) => {
    if (!main && !quote) {
      setMakeComment((prev) => {
        const updatedArray = [...prev];
        updatedArray[index!] = {
          content: "",
          images: [],
          videos: [],
        };
        return updatedArray;
      });
      setCommentsOpen((prev) => {
        const updatedArray = [...prev];
        updatedArray[index!] = !updatedArray[index!];
        return updatedArray;
      });
    } else if (quote) {
      setMakeQuoteComment((prev) => {
        const updatedArray = [...prev];
        updatedArray[index!] = {
          content: "",
          images: [],
          videos: [],
        };
        return updatedArray;
      });
      setCommentsQuoteOpen((prev) => {
        const updatedArray = [...prev];
        updatedArray[index!] = !updatedArray[index!];
        return updatedArray;
      });
    } else {
      setMainMakeComment((prev) => {
        const updatedArr = [...prev];
        updatedArr[0] = {
          content: "",
          images: [],
          videos: [],
        };
        return updatedArr;
      });
    }
  };

  const mirror = async (id: string, main: boolean, quote: boolean) => {
    if (!lensConnected?.id) return;
    const index = main
      ? undefined
      : quote
      ? quotes?.findIndex((pub) => pub.id === id)
      : comments?.findIndex((pub) => pub.id === id);

    if (!main && index == -1) return;
    handleLoaders(true, main, quote, index, "mirror");

    try {
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });
      await lensMirror(
        id,
        dispatch,
        address as `0x${string}`,
        clientWallet,
        publicClient,
        t
      );
      updateInteractions(
        index!,
        {
          hasMirrored: true,
        },
        "mirrors",
        true,
        main,
        quote
      );
    } catch (err: any) {
      errorChoice(
        err,
        () =>
          updateInteractions(
            index!,
            {
              hasMirrored: true,
            },
            "mirrors",
            true,
            main,
            quote
          ),
        dispatch,
        t
      );
    }

    handleLoaders(false, main, quote, index, "mirror");
  };

  const like = async (
    id: string,
    hasReacted: boolean,
    main: boolean,
    quote: boolean
  ) => {
    if (!lensConnected?.id) return;
    const index = main
      ? undefined
      : quote
      ? quotes?.findIndex((pub) => pub.id === id)
      : comments?.findIndex((pub) => pub.id === id);

    if (!main && index == -1) return;
    handleLoaders(false, main, quote, index, "like");
    try {
      await lensLike(id, dispatch, hasReacted, t);
      updateInteractions(
        index!,
        {
          hasReacted: hasReacted ? false : true,
        },
        "reactions",
        hasReacted ? false : true,
        main,
        quote
      );
    } catch (err: any) {
      errorChoice(
        err,
        () =>
          updateInteractions(
            index!,
            {
              hasReacted: hasReacted ? false : true,
            },
            "reactions",
            hasReacted ? false : true,
            main,
            quote
          ),
        dispatch,
        t
      );
    }

    handleLoaders(false, main, quote, index, "like");
  };

  const followProfile = async (id: string, index?: number, quote?: boolean) => {
    if (index === -1) {
      return;
    }
    quote
      ? setFollowLoadingQuote((prev) => {
          const updatedArray = [...prev];
          updatedArray[index!] = true;
          return updatedArray;
        })
      : setFollowLoading((prev) => {
          const updatedArray = [...prev];
          updatedArray[index!] = true;
          return updatedArray;
        });

    try {
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      await lensFollow(
        id,
        dispatch,
        undefined,
        address as `0x${string}`,
        clientWallet,
        publicClient,
        t
      );
      await refetchProfile(dispatch, lensConnected?.id, lensConnected?.id);
    } catch (err: any) {
      if (err?.message?.includes("User rejected the request")) {
        quote
          ? setFollowLoadingQuote((prev) => {
              const updatedArray = [...prev];
              updatedArray[index!] = false;
              return updatedArray;
            })
          : setFollowLoading((prev) => {
              const updatedArray = [...prev];
              updatedArray[index!] = false;
              return updatedArray;
            });
        return;
      }
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
            actionMessage: t("index"),
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
    quote
      ? setFollowLoadingQuote((prev) => {
          const updatedArray = [...prev];
          updatedArray[index!] = false;
          return updatedArray;
        })
      : setFollowLoading((prev) => {
          const updatedArray = [...prev];
          updatedArray[index!] = false;
          return updatedArray;
        });
  };

  const unfollowProfile = async (
    id: string,
    index?: number,
    quote?: boolean
  ) => {
    if (index === -1) {
      return;
    }

    quote
      ? setFollowLoadingQuote((prev) => {
          const updatedArray = [...prev];
          updatedArray[index!] = true;
          return updatedArray;
        })
      : setFollowLoading((prev) => {
          const updatedArray = [...prev];
          updatedArray[index!] = true;
          return updatedArray;
        });
    try {
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      await lensUnfollow(
        id,
        dispatch,
        address as `0x${string}`,
        clientWallet,
        publicClient,
        t
      );
      await refetchProfile(dispatch, lensConnected?.id, lensConnected?.id);
    } catch (err: any) {
      if (err?.message?.includes("User rejected the request")) {
        quote
          ? setFollowLoadingQuote((prev) => {
              const updatedArray = [...prev];
              updatedArray[index!] = false;
              return updatedArray;
            })
          : setFollowLoading((prev) => {
              const updatedArray = [...prev];
              updatedArray[index!] = false;
              return updatedArray;
            });
        return;
      }
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
            actionMessage: t("index"),
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
    quote
      ? setFollowLoadingQuote((prev) => {
          const updatedArray = [...prev];
          updatedArray[index!] = false;
          return updatedArray;
        })
      : setFollowLoading((prev) => {
          const updatedArray = [...prev];
          updatedArray[index!] = false;
          return updatedArray;
        });
  };

  const updateInteractions = (
    index: number,
    valueToUpdate: Object,
    statToUpdate: string,
    increase: boolean,
    main: boolean,
    quote: boolean
  ) => {
    if (main) {
      setCollection({
        ...collection,
        publication: {
          ...collection?.publication,
          operations: {
            ...collection?.publication?.operations,
            ...valueToUpdate,
          },
          stats: {
            ...collection?.publication?.stats,
            [statToUpdate]:
              collection?.publication?.stats?.[
                statToUpdate as keyof PublicationStats
              ] + (increase ? 1 : -1),
          },
        },
      } as Gallery);
    } else if (comments?.length > 0 && !quote) {
      const newItems = [...comments];
      newItems[index] = {
        ...newItems[index],
        operations: {
          ...(newItems[index] as Post).operations,
          ...valueToUpdate,
        },
        stats: {
          ...(newItems[index] as Post).stats,
          [statToUpdate]:
            (newItems[index] as Post).stats?.[
              statToUpdate as keyof PublicationStats
            ] + (increase ? 1 : -1),
        },
      };

      setComments(newItems);
    } else if (quotes?.length > 0 && quote) {
      const newItems = [...quotes];
      newItems[index] = {
        ...newItems[index],
        operations: {
          ...(newItems[index] as Post).operations,
          ...valueToUpdate,
        },
        stats: {
          ...(newItems[index] as Post).stats,
          [statToUpdate]:
            (newItems[index] as Post).stats?.[
              statToUpdate as keyof PublicationStats
            ] + (increase ? 1 : -1),
        },
      };

      setQuotes(newItems);
    }
  };

  useEffect(() => {
    if (comments?.length > 0) {
      setInteractionsItemsLoading(
        Array.from({ length: comments?.length }, () => ({
          like: false,
          mirror: false,
          comment: false,
          simpleCollect: false,
        }))
      );
      setMakeComment(
        Array.from({ length: comments?.length }, () => ({
          content: "",
          images: [],
          videos: [],
        }))
      );
      setCommentsOpen(Array.from({ length: comments?.length }, () => false));
      setOpenItemMirrorChoice(
        Array.from({ length: comments?.length }, () => false)
      );
      setProfileHovers(Array.from({ length: comments?.length }, () => false));
      setProfilesOpen(Array.from({ length: comments?.length }, () => false));
      setContentLoading(
        Array.from({ length: comments?.length }, () => ({
          image: false,
          video: false,
        }))
      );
    }

    if (quotes?.length > 0) {
      setInteractionsQuotesItemsLoading(
        Array.from({ length: quotes?.length }, () => ({
          like: false,
          mirror: false,
          comment: false,
          simpleCollect: false,
        }))
      );
      setMakeQuoteComment(
        Array.from({ length: quotes?.length }, () => ({
          content: "",
          images: [],
          videos: [],
        }))
      );
      setCommentsQuoteOpen(Array.from({ length: quotes?.length }, () => false));
      setQuoteOpenItemMirrorChoice(
        Array.from({ length: quotes?.length }, () => false)
      );
      setProfileHoversQuote(
        Array.from({ length: quotes?.length }, () => false)
      );
      setProfilesOpenQuote(Array.from({ length: quotes?.length }, () => false));
      setQuoteContentLoading(
        Array.from({ length: comments?.length }, () => ({
          image: false,
          video: false,
        }))
      );
    }
  }, [comments, quotes]);

  useEffect(() => {
    if (collection && comments?.length < 1 && quotes?.length < 1) {
      getComments();
      getQuotes();
    }
  }, [collection]);

  return {
    mainInteractionsLoading,
    interactionsItemsLoading,
    interactionsQuotesItemsLoading,
    mirror,
    like,
    simpleCollect,
    commentsLoading,
    getMoreComments,
    commentInfo,
    comments,
    comment,
    quotes,
    getMoreQuotes,
    quotesLoading,
    quoteInfo,
    openItemMirrorChoice,
    setOpenItemMirrorChoice,
    commentsOpen,
    commentsQuoteOpen,
    quoteOpenItemMirrorChoice,
    setQuoteOpenItemMirrorChoice,
    makeQuoteComment,
    makeComment,
    profileHovers,
    profileHoversQuote,
    setProfileHovers,
    setProfileHoversQuote,
    quoteContentLoading,
    setQuoteContentLoading,
    contentLoading,
    setContentLoading,
    mainContentLoading,
    setMainContentLoading,
    setCommentsOpen,
    mentionProfiles,
    setMentionProfiles,
    mentionProfilesQuote,
    setMentionProfilesQuote,
    profilesOpen,
    setProfilesOpen,
    caretCoord,
    setCaretCoord,
    followProfile,
    caretCoordMain,
    setCaretCoordMain,
    followLoading,
    followLoadingQuote,
    unfollowProfile,
    mainMakeComment,
    setMainMakeComment,
    profilesOpenMain,
    mentionProfilesMain,
    setMentionProfilesMain,
    setProfilesOpenMain,
    profilesOpenQuote,
    setProfilesOpenQuote,
    setMakeComment,
    setMakeQuoteComment,
    commentRef,
    collectRef,
    caretCoordQuote,
    setCaretCoordQuote,
    setCommentsQuoteOpen,
  };
};

export default useInteractions;
