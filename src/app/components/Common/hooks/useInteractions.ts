import { ModalContext } from "@/app/providers";
import { addReaction, repost } from "@lens-protocol/client/actions";
import { useContext, useState } from "react";

const useInteractions = (dict: any) => {
  const context = useContext(ModalContext);
  const [interactionsLoading, setIntearactionsLoading] = useState<{
    mirror: boolean;
    like: boolean;
  }>({
    mirror: false,
    like: false,
  });
  const [stats, setStats] = useState<{
    upvotes: number;
    hasUpvoted: boolean;
    reposts: number;
    hasReposted: boolean;
  }>({
    upvotes: 0,
    hasUpvoted: false,
    reposts: 0,
    hasReposted: false,
  });

  const handleLike = async (id: string, reaction: boolean) => {
    setIntearactionsLoading((prev) => ({
      ...prev,
      like: true,
    }));

    try {
      const res = await addReaction(context?.lensConectado?.sessionClient!, {
        post: id,
        reaction: reaction ? "DOWNVOTE" : "UPVOTE",
      });

      if (res.isOk()) {
        if ((res.value as any)?.reason?.includes("Signless")) {
          context?.setSignless?.(true);
        } else if ((res.value as any)?.success) {
          context?.setIndexar?.(dict?.common?.success);

          context?.setGallery((prev) => {
            let arr = [...prev];
            let index = arr.findIndex((post) => post?.postId == id);
            arr[index] = {
              ...arr[index],
              post: {
                ...arr[index]?.post!,
                operations: {
                  ...arr[index]?.post?.operations!,
                  hasUpvoted: true,
                },
                stats: {
                  ...arr[index]?.post?.stats!,
                  upvotes: Number(arr[index]?.post?.stats?.upvotes) + 1,
                },
              },
            };

            return arr;
          });

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
      console.error(err.message);
    }
    setIntearactionsLoading((prev) => ({
      ...prev,
      like: false,
    }));
  };

  const handleMirror = async (id: string) => {
    setIntearactionsLoading((prev) => ({
      ...prev,
      mirror: true,
    }));
    try {
      const res = await repost(context?.lensConectado?.sessionClient!, {
        post: id,
      });

      if (res.isOk()) {
        if ((res.value as any)?.reason?.includes("Signless")) {
          context?.setSignless?.(true);
        } else if ((res.value as any)?.hash) {
          context?.setIndexar?.(dict?.common?.success);

          context?.setGallery((prev) => {
            let arr = [...prev];
            let index = arr.findIndex((post) => post?.postId == id);
            arr[index] = {
              ...arr[index],
              post: {
                ...arr[index]?.post!,
                operations: {
                  ...arr[index]?.post?.operations!,
                  hasReposted: {
                    ...arr[index]?.post?.operations?.hasReposted!,
                    optimistic: true,
                  },
                },
                stats: {
                  ...arr[index]?.post?.stats!,
                  reposts: Number(arr[index]?.post?.stats?.reposts) + 1,
                },
              },
            };

            return arr;
          });

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
      console.error(err.message);
    }
    setIntearactionsLoading((prev) => ({
      ...prev,
      mirror: false,
    }));
  };

  return {
    handleLike,
    handleMirror,
    interactionsLoading,
  };
};

export default useInteractions;
