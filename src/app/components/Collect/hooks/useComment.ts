import { useContext, useState } from "react";
import { Account, Post } from "@lens-protocol/client";
import { ModalContext } from "@/app/providers";
import { immutable } from "@lens-chain/storage-client";
import { chains } from "@lens-chain/sdk/viem";
import { image, textOnly, MediaImageMimeType } from "@lens-protocol/metadata";
import convertirArchivo from "@/app/lib/helpers/convertirArchivo";
import { post } from "@lens-protocol/client/actions";

const useComment = (
  pub: Post | undefined,
  dict: any,
  getReferences: () => Promise<void>
) => {
  const context = useContext(ModalContext);
  const [contentLoading, setContentLoading] = useState<boolean>(false);
  const [mentionProfiles, setMentionProfiles] = useState<Account[]>([]);
  const [profilesOpen, setProfilesOpen] = useState<boolean>(false);
  const [caretCoord, setCaretCoord] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [commentLoading, setCommentLoading] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState<{
    content: string;
    images: string[];
  }>({
    content: "",
    images: [],
  });

  const makeComment = async () => {
    if (!context?.lensConectado?.sessionClient) return;
    setCommentLoading(true);
    try {
      const acl = immutable(chains.mainnet.id);
      let schema;
      if (commentContent?.images?.length < 1) {
        schema = textOnly({
          content: commentContent.content!,
          tags: ["f3manifesto"],
        });
      } else {
        const images = await Promise.all(
          (commentContent?.images || [])?.map(async (image) => {
            const res = await fetch("/api/ipfs", {
              method: "POST",
              body: convertirArchivo(image, MediaImageMimeType.PNG),
            });
            const json = await res.json();

            return {
              type: MediaImageMimeType.PNG,
              item: "ipfs://" + json?.cid,
            };
          })
        );

        schema = image({
          content: commentContent?.content!,
          tags: ["f3manifesto"],
          image: images?.[0]!,
          attachments:
            (images || [])?.filter((_, i) => i !== 0)?.length > 0
              ? (images || [])?.filter((_, i) => i !== 0)
              : undefined,
        });
      }

      const { uri } = await context?.storageClient?.uploadAsJson(schema, {
        acl,
      })!;
      const res = await post(context?.lensConectado?.sessionClient!, {
        commentOn: {
          post: pub?.id,
        },
        contentUri: uri,
      });

      if (res.isOk()) {
        if ((res.value as any)?.reason?.includes("Signless")) {
          context?.setSignless?.(true);
        } else if ((res.value as any)?.hash) {
          context?.setIndexar?.(dict?.common?.success);
          setCommentContent({
            content: "",
            images: [],
          });

          setTimeout(async () => {
            await getReferences();
            context?.setIndexar?.(undefined);
          }, 6000);
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

    setCommentLoading(false);
  };

  return {
    makeComment,
    profilesOpen,
    mentionProfiles,
    setMentionProfiles,
    setProfilesOpen,
    caretCoord,
    setCaretCoord,
    commentContent,
    setCommentContent,
    contentLoading,
    commentLoading,
    setContentLoading,
  };
};

export default useComment;
