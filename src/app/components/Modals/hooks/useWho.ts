import { F3M_OPEN_ACTION } from "@/app/lib/constants";
import { ModalContext } from "@/app/providers";
import {
  Account,
  PageSize,
  Post,
  PostReactionType,
  PostReferenceType,
} from "@lens-protocol/client";
import {
  fetchPostReactions,
  fetchPostReferences,
  fetchWhoExecutedActionOnPost,
} from "@lens-protocol/client/actions";
import { useContext, useEffect, useState } from "react";

const useWho = () => {
  const context = useContext(ModalContext);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [reactors, setReactors] = useState<Account[]>([]);
  const [quoters, setQuoters] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [hasMoreQuote, setHasMoreQuote] = useState<boolean>(true);
  const [pageInfo, setPageInfo] = useState<string>();
  const [pageInfoQuote, setPageInfoQuote] = useState<string>();
  const [mirrorQuote, setMirrorQuote] = useState<boolean>(false);
  const [interactionsLoading, setInteractionsLoading] = useState<
    {
      mirror: boolean;
      like: boolean;
      collect: boolean;
    }[]
  >([]);

  const showLikes = async () => {
    if (!context?.reactBox?.post) return;
    setDataLoading(true);
    try {
      const data = await fetchPostReactions(
        context?.lensConectado?.sessionClient ?? context?.lensClient!,
        {
          post: context?.reactBox?.post?.id,
          pageSize: PageSize.Ten,
          filter: {
            anyOf: [PostReactionType.Upvote],
          },
        }
      );

      if (!data?.isOk()) {
        setDataLoading(false);
        return;
      }

      setReactors(
        (data?.value?.items?.map((item) => item?.account) as Account[]) || []
      );
      setPageInfo(data?.value?.pageInfo?.next!);

      if (!data?.value?.items || data?.value?.items?.length < 10) {
        setHasMore(false);
        setDataLoading(false);
        return;
      } else if (data?.value?.items?.length === 10) {
        setHasMore(true);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setDataLoading(false);
  };

  const showMirrorQuotes = async () => {
    if (!context?.reactBox?.post) return;

    setDataLoading(true);

    try {
      const mirrorData = await fetchPostReferences(
        context?.lensConectado?.sessionClient ?? context?.lensClient!,
        {
          pageSize: PageSize.Ten,
          referencedPost: context?.reactBox?.post?.id,
          referenceTypes: [PostReferenceType.RepostOf],
        }
      );

      if (!mirrorData?.isOk()) {
        setDataLoading(false);
        return;
      }

      setReactors(
        (mirrorData?.value?.items?.map((item) => item?.author) || []) as any[]
      );
      setPageInfo(mirrorData?.value?.pageInfo?.next!);
      if (!mirrorData?.value?.items || mirrorData?.value?.items?.length < 10) {
        setHasMore(false);
      } else if (mirrorData?.value?.items?.length === 10) {
        setHasMore(true);
      }

      const quoteData = await fetchPostReferences(
        context?.lensConectado?.sessionClient ?? context?.lensClient!,
        {
          pageSize: PageSize.Ten,
          referencedPost: context?.reactBox?.post?.id,
          referenceTypes: [PostReferenceType.QuoteOf],
        }
      );

      if (!quoteData?.isOk()) {
        setDataLoading(false);
        return;
      }

      setQuoters((quoteData?.value?.items || []) as Post[]);
      setPageInfoQuote(quoteData?.value.pageInfo.next!);

      if (!quoteData?.value?.items || quoteData?.value?.items?.length < 10) {
        setHasMoreQuote(false);
        setDataLoading(false);
      } else if (quoteData?.value?.items?.length === 10) {
        setHasMoreQuote(true);
      }

      if (
        (mirrorData?.value?.items || [])?.length < 1 &&
        (quoteData?.value?.items || [])?.length > 0
      ) {
        setMirrorQuote(true);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setDataLoading(false);
  };

  const showActors = async () => {
    if (!context?.reactBox?.post) return;
    setDataLoading(true);
    try {
      const data = await fetchWhoExecutedActionOnPost(
        context?.lensConectado?.sessionClient ?? context?.lensClient!,
        {
          pageSize: PageSize.Ten,
          post: context?.reactBox?.post?.id,
          filter: {
            anyOf: [
              {
                address: F3M_OPEN_ACTION,
                simpleCollect: true,
              },
            ],
          },
        }
      );

      if (!data?.isOk()) {
        setDataLoading(false);
        return;
      }

      setReactors(
        (data?.value?.items?.map((item) => item?.account) || []) as any
      );
      setPageInfo(data?.value.pageInfo.next!);

      if (!data?.value?.items || data?.value?.items?.length < 10) {
        setHasMore(false);
        setDataLoading(false);
      } else if (data?.value?.items?.length === 10) {
        setHasMore(true);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setDataLoading(false);
  };

  const showMoreLikes = async () => {
    if (!pageInfo || !hasMore) return;
    try {
      const data = await fetchPostReactions(
        context?.lensConectado?.sessionClient ?? context?.lensClient!,
        {
          cursor: pageInfo,
          post: context?.reactBox?.post?.id,
          pageSize: PageSize.Ten,
          filter: {
            anyOf: [PostReactionType.Upvote],
          },
        }
      );

      if (!data?.isOk()) {
        setDataLoading(false);
        return;
      }
      setReactors([
        ...reactors,
        ...((data?.value?.items?.map((item) => item?.account) as Account[]) ||
          [] ||
          []),
      ]);
      setPageInfo(data?.value.pageInfo.next!);

      if (!data?.value?.items || data?.value?.items?.length < 10) {
        setHasMore(false);
        return;
      } else if (data?.value?.items?.length === 10) {
        setHasMore(true);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const showMoreActors = async () => {
    if (!pageInfo || !hasMore) return;

    try {
      const data = await fetchWhoExecutedActionOnPost(
        context?.lensConectado?.sessionClient ?? context?.lensClient!,
        {
          pageSize: PageSize.Ten,
          post: context?.reactBox?.post?.id,
          cursor: pageInfo,
          filter: {
            anyOf: [
              {
                address: F3M_OPEN_ACTION,
                simpleCollect: true,
              },
            ],
          },
        }
      );

      if (!data.isOk()) {
        return;
      }

      setReactors([
        ...reactors,
        ...((data?.value?.items?.map((item) => item?.account) as Account[]) ||
          [] ||
          []),
      ]);
      setPageInfo(data?.value?.pageInfo.next!);

      if (!data?.value?.items || data?.value?.items?.length < 10) {
        setHasMore(false);
        return;
      } else if (data?.value?.items?.length === 10) {
        setHasMore(true);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const showMoreQuoteMirrors = async () => {
    if ((!pageInfo || !hasMore) && (!pageInfoQuote || !hasMoreQuote)) return;

    try {
      if (hasMore && pageInfo) {
        const mirrorData = await fetchPostReferences(
          context?.lensConectado?.sessionClient ?? context?.lensClient!,
          {
            cursor: pageInfo,
            pageSize: PageSize.Ten,
            referencedPost: context?.reactBox?.post?.id,
            referenceTypes: [PostReferenceType.RepostOf],
          }
        );

        if (!mirrorData.isOk()) {
          return;
        }

        setReactors([
          ...reactors,
          ...(mirrorData?.value?.items?.map((item) => item?.author) || []),
        ]);
        setPageInfo(mirrorData?.value.pageInfo.next!);

        if (
          !mirrorData?.value?.items ||
          mirrorData?.value?.items?.length < 10
        ) {
          setHasMore(false);
          return;
        } else if (mirrorData?.value?.items?.length === 10) {
          setHasMore(true);
        }
      }

      if (pageInfoQuote && hasMoreQuote) {
        const quoteData = await fetchPostReferences(
          context?.lensConectado?.sessionClient ?? context?.lensClient!,
          {
            cursor: pageInfo,
            pageSize: PageSize.Ten,
            referencedPost: context?.reactBox?.post?.id,
            referenceTypes: [PostReferenceType.QuoteOf],
          }
        );

        if (!quoteData.isOk()) {
          return;
        }

        setQuoters([
          ...quoters,
          ...((quoteData?.value?.items || []) as Post[]),
        ]);
        setPageInfoQuote(quoteData?.value.pageInfo.next!);

        if (!quoteData?.value?.items || quoteData?.value?.items?.length < 10) {
          setHasMoreQuote(false);
          return;
        } else if (quoteData?.value?.items?.length === 10) {
          setHasMoreQuote(true);
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const showMore = () => {
    switch (context?.reactBox?.type) {
      case "Likes":
        showMoreLikes();
        break;

      case "Collects":
        showMoreActors();
        break;

      case "Mirrors":
        showMoreQuoteMirrors();
        break;
    }
  };

  useEffect(() => {
    if (context?.reactBox) {
      switch (context?.reactBox?.type) {
        case "Likes":
          reactors?.length < 1 && showLikes();
          break;

        case "Collects":
          reactors?.length < 1 && showActors();
          break;

        case "Mirrors":
          quoters?.length < 1 && reactors?.length < 1 && showMirrorQuotes();
          break;
      }
    } else {
      setPageInfo(undefined);
      setPageInfoQuote(undefined);
      setReactors([]);
      setQuoters([]);
      setHasMore(true);
      setHasMoreQuote(true);
    }
  }, [context?.reactBox]);

  return {
    dataLoading,
    reactors,
    quoters,
    hasMore,
    hasMoreQuote,
    showMore,
    mirrorQuote,
    setMirrorQuote,
    interactionsLoading,
  };
};

export default useWho;
