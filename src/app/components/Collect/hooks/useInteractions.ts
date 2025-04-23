import { useContext, useEffect, useState } from "react";
import { PageSize, Post, PostReferenceType } from "@lens-protocol/client";
import { fetchPostReferences } from "@lens-protocol/client/actions";
import { ModalContext } from "@/app/providers";

const useInteractions = (post: Post | undefined) => {
  const context = useContext(ModalContext);
  const [referencesLoading, setReferencesLoading] = useState<boolean>(false);
  const [referencesInfo, setReferencesInfo] = useState<{
    hasMore: boolean;
    cursor: string | undefined;
  }>({
    hasMore: true,
    cursor: undefined,
  });
  const [references, setReferences] = useState<Post[]>([]);

  const getReferences = async () => {
    setReferencesLoading(true);
    try {
      const res = await fetchPostReferences(
        context?.lensConectado?.sessionClient ?? context?.lensClient!,
        {
          referencedPost: post?.id,
          pageSize: PageSize.Ten,
          referenceTypes: [PostReferenceType.CommentOn],
        }
      );

      if (res?.isOk()) {
        setReferences((res?.value?.items || []) as Post[]);
        setReferencesInfo({
          hasMore: res?.value?.items?.length != 10 ? false : true,
          cursor: res?.value?.pageInfo?.next!,
        });
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setReferencesLoading(false);
  };

  const getMoreReferences = async () => {
    if (!referencesInfo?.hasMore) return;

    try {
      const res = await fetchPostReferences(
        context?.lensConectado?.sessionClient ?? context?.lensClient!,
        {
          cursor: referencesInfo?.cursor,
          referencedPost: post?.id,
          pageSize: PageSize.Ten,
          referenceTypes: [PostReferenceType.CommentOn],
        }
      );

      if (res?.isOk()) {
        setReferences((res?.value?.items || []) as Post[]);
        setReferencesInfo({
          hasMore: res?.value?.items?.length != 10 ? false : true,
          cursor: res?.value?.pageInfo?.next!,
        });
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (post && references?.length < 1 && context?.lensClient) {
      getReferences();
    }
  }, [post, context?.lensClient]);

  return {
    references,
    referencesInfo,
    referencesLoading,
    getMoreReferences,
    getReferences,
  };
};

export default useInteractions;
