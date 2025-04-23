import { ModalContext } from "@/app/providers";
import { Post } from "@lens-protocol/client";
import {
  addReaction,
  executePostAction,
  repost,
} from "@lens-protocol/client/actions";
import { useContext, useEffect, useState } from "react";

const useBar = (dict: any, post: Post) => {
  const context = useContext(ModalContext);
  const [stats, setStats] = useState<{
    upvotes: number;
    hasUpvoted: boolean;
    reposts: number;
    hasReposted: boolean;
    collects: number;
    hasSimpleCollected: boolean;
  }>({
    upvotes: 0,
    hasUpvoted: false,
    reposts: 0,
    hasReposted: false,
    collects: 0,
    hasSimpleCollected: false,
  });
  const [interactionLoading, setInteractionLoading] = useState<{
    mirror: boolean;
    like: boolean;
    collect: boolean;
  }>({
    mirror: false,
    like: false,
    collect: true,
  });

  const reactPost = async () => {
    if (!context?.lensConectado?.sessionClient) return;
    setInteractionLoading((prev) => ({
      ...prev,
      like: true,
    }));
    try {
      const res = await addReaction(context?.lensConectado?.sessionClient!, {
        post: post?.id,
        reaction: stats?.hasUpvoted ? "DOWNVOTE" : "UPVOTE",
      });

      if (res.isOk()) {
        if ((res.value as any)?.reason?.includes("Signless")) {
          context?.setSignless?.(true);
        } else if ((res.value as any)?.success) {
          context?.setIndexar?.(dict?.common?.success);
          setStats((prev) => ({
            ...prev,
            hasUpvoted: !prev.hasUpvoted,
            upvotes: prev.upvotes + 1,
          }));
          setTimeout(() => {
            context?.setIndexar?.(undefined);
          }, 3000);
        } else {
          context?.setNotification?.(dict?.common?.error);
        }
      } else {
        context?.setNotification?.(dict?.common?.error);
      }
    } catch (err: any) {
      context?.setNotification?.(dict?.common?.error);
      console.error(err.message);
    }
    setInteractionLoading((prev) => ({
      ...prev,
      like: false,
    }));
  };

  const simpleCollect = async () => {
    if (!context?.lensConectado?.sessionClient) return;
    setInteractionLoading((prev) => ({
      ...prev,
      collect: true,
    }));
    try {
      const res = await executePostAction(
        context?.lensConectado?.sessionClient!,
        {
          post: post?.id,
          action: {
            simpleCollect: {
              selected: true,
            },
          },
        }
      );

      if (res.isOk()) {
        if ((res.value as any)?.reason?.includes("Signless")) {
          context?.setSignless?.(true);
        } else if ((res.value as any)?.hash) {
          context?.setIndexar?.(dict?.common?.success);
          setStats((prev) => ({
            ...prev,
            hasSimpleCollected: true,
            collects: prev.collects + 1,
          }));
          setTimeout(() => {
            context?.setIndexar?.(undefined);
          }, 3000);
        } else {
          context?.setNotification?.(dict?.common?.error);
        }
      } else {
        context?.setNotification?.(dict?.common?.error);
      }
    } catch (err: any) {
      context?.setNotification?.(dict?.common?.error);
      console.error(err.message);
    }
    setInteractionLoading((prev) => ({
      ...prev,
      collect: false,
    }));
  };

  const mirrorPost = async () => {
    if (!context?.lensConectado?.sessionClient) return;
    setInteractionLoading((prev) => ({
      ...prev,
      mirror: true,
    }));
    try {
      const res = await repost(context?.lensConectado?.sessionClient!, {
        post: post?.id,
      });

      if (res.isOk()) {
        if ((res.value as any)?.reason?.includes("Signless")) {
          context?.setSignless?.(true);
        } else if ((res.value as any)?.hash) {
          context?.setIndexar?.(dict?.common?.success);
          setStats((prev) => ({
            ...prev,
            hasReposted: true,
            reposts: prev.reposts + 1,
          }));
          setTimeout(() => {
            context?.setIndexar?.(undefined);
          }, 3000);
        } else {
          context?.setNotification?.(dict?.common?.error);
        }
      } else {
        context?.setNotification?.(dict?.common?.error);
      }
    } catch (err: any) {
      context?.setNotification?.(dict?.common?.error);
      console.error(err.message);
    }
    setInteractionLoading((prev) => ({
      ...prev,
      mirror: false,
    }));
  };

  useEffect(() => {
    if (post) {
      setStats({
        upvotes: post?.stats?.upvotes,
        hasUpvoted: post?.operations?.hasUpvoted!,
        reposts: post?.stats?.reposts,
        hasReposted: post?.operations?.hasReposted?.optimistic!,
        hasSimpleCollected: post?.operations?.hasSimpleCollected!,
        collects: post?.stats?.collects,
      });
    }
  }, [post]);

  return {
    interactionLoading,
    reactPost,
    mirrorPost,
    stats,
    simpleCollect,
  };
};

export default useBar;
