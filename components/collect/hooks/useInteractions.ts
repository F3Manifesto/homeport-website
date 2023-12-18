import { SetStateAction, useEffect, useState } from "react";
import {
  Comment,
  LimitType,
  Post,
  Profile,
  PublicationStats,
} from "../../../graphql/generated";
import { PublicClient, createWalletClient, custom } from "viem";
import errorChoice from "../../../lib/helpers/errorChoice";
import { Dispatch } from "redux";
import { polygon } from "viem/chains";
import { Gallery, MakePostComment } from "../../../types/general.types";
import lensCollect from "../../../lib/helpers/lensCollect";
import lensLike from "../../../lib/helpers/lensLike";
import getPublications from "../../../graphql/lens/queries/publications";
import lensComment from "../../../lib/helpers/lensComment";
import uploadPostContent from "../../../lib/helpers/uploadPostContent";
import lensMirror from "../../../lib/helpers/lensMirror";
import { PostCollectState } from "../../../redux/reducers/postCollectSlice";

const useInteractions = (
  lensConnected: Profile | undefined,
  dispatch: Dispatch,
  address: `0x${string}` | undefined,
  publicClient: PublicClient,
  collection: Gallery | undefined,
  setCollection: (e: SetStateAction<Gallery | undefined>) => void,
  postCollect: PostCollectState
) => {
  const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInfo, setCommentInfo] = useState<{
    hasMore: boolean;
    cursor: string | undefined;
  }>({
    hasMore: true,
    cursor: undefined,
  });
  const [commentsOpen, setCommentsOpen] = useState<boolean[]>([]);
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
  const [makeComment, setMakeComment] = useState<MakePostComment[]>([]);
  const [mainMakeComment, setMainMakeComment] = useState<MakePostComment[]>([
    {
      content: "",
      images: [],
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

  const simpleCollect = async (id: string, type: string, main: boolean) => {
    if (!lensConnected?.id) return;
    const index = main
      ? undefined
      : comments?.findIndex((pub) => pub.id === id);

    if (main) {
      setMainInteractionsLoading((prev) => {
        const updatedArray = [...prev];
        updatedArray[0] = { ...updatedArray[0], simpleCollect: true };
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
        publicClient
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
        main
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
            main
          ),
        dispatch
      );
    }

    if (main) {
      setMainInteractionsLoading((prev) => {
        const updatedArray = [...prev];
        updatedArray[0] = { ...updatedArray[0], simpleCollect: false };
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

  const comment = async (id: string, main?: boolean, mirror?: string) => {
    if (!lensConnected?.id) return;
    let content: string | undefined, images: string[] | undefined;

    const index = main
      ? undefined
      : comments?.findIndex((pub) => pub.id === id);

    if (!main) {
      if (
        (!makeComment[index!]?.content && !makeComment[index!]?.images) ||
        index == -1
      )
        return;
      content = makeComment[index!]?.content;
      images = makeComment[index!]?.images!;
    } else {
      if (!mainMakeComment[0]?.content && !mainMakeComment[0]?.images) return;
      content = mainMakeComment[0]?.content;
      images = mainMakeComment[0]?.images!;
    }

    handleLoaders(true, main!, index, "comment");

    try {
      const contentURI = await uploadPostContent(
        content?.trim() == "" ? " " : content,
        images || []
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
        () => clearComment(index, main!)
      );
      updateInteractions(index!, {}, "comments", true, main!);
      await getComments();
    } catch (err: any) {
      errorChoice(
        err,
        () => updateInteractions(index!, {}, "comments", true, main!),
        dispatch
      );
    }

    handleLoaders(false, main!, index, "comment");
  };

  const handleLoaders = (
    start: boolean,
    main: boolean,
    index: number | undefined,
    type: string
  ) => {
    if (start) {
      if (!main) {
        if (index === -1) {
          return;
        }

        setInteractionsItemsLoading((prev) => {
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
      if (!main) {
        setInteractionsItemsLoading((prev) => {
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

  const clearComment = async (index: number | undefined, main: boolean) => {
    if (!main) {
      setMakeComment((prev) => {
        const updatedArray = [...prev];
        updatedArray[index!] = {
          content: "",
          images: [],
        };
        return updatedArray;
      });
      setCommentsOpen((prev) => {
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
        };
        return updatedArr;
      });
    }
  };

  const mirror = async (id: string, main?: boolean, mirror?: string) => {
    if (!lensConnected?.id) return;
    const index = main
      ? undefined
      : comments?.findIndex((pub) => pub.id === id);

    if (!main && index == -1) return;
    handleLoaders(true, main!, index, "mirror");

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
        publicClient
      );
      updateInteractions(
        index!,
        {
          hasMirrored: true,
        },
        "mirrors",
        true,
        main!
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
            main!
          ),
        dispatch
      );
    }

    handleLoaders(false, main!, index, "mirror");
  };

  const like = async (
    id: string,
    hasReacted: boolean,
    main?: boolean,
    mirror?: string
  ) => {
    if (!lensConnected?.id) return;
    const index = main
      ? undefined
      : comments?.findIndex((pub) => pub.id === id);

    if (!main && index == -1) return;
    handleLoaders(false, main!, index, "like");
    try {
      await lensLike(id, dispatch, hasReacted);
      updateInteractions(
        index!,
        {
          hasReacted: hasReacted ? false : true,
        },
        "reactions",
        hasReacted ? false : true,
        main!
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
            main!
          ),
        dispatch
      );
    }

    handleLoaders(false, main!, index, "like");
  };

  const updateInteractions = (
    index: number,
    valueToUpdate: Object,
    statToUpdate: string,
    increase: boolean,
    main: boolean
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
    } else if (comments?.length > 0) {
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
    }
  }, [comments]);

  useEffect(() => {
    if (collection) {
      getComments();
    }
  }, [collection]);

  return {
    mainInteractionsLoading,
    interactionsItemsLoading,
    mirror,
    like,
    simpleCollect,
    commentsLoading,
    getMoreComments,
    commentInfo,
    comments,
    comment,
  };
};

export default useInteractions;
