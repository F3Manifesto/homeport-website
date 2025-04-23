import { useContext, useEffect, useState } from "react";
import { Gallery } from "../../Common/types/common.types";
import { fetchPost } from "@lens-protocol/client/actions";
import { ModalContext } from "@/app/providers";
import { getOracleData } from "../../../../../graphql/queries/getOracleData";
import { Post } from "@lens-protocol/client";

const useCollection = (collection: Gallery | undefined) => {
  const context = useContext(ModalContext);
  const [postLoading, setPostLoading] = useState<boolean>(false);
  const [post, setPost] = useState<Post | undefined>();
  const [indice, setIndice] = useState<number>(0);

  const getPost = async () => {
    setPostLoading(true);
    try {
      const res = await fetchPost(
        context?.lensConectado?.sessionClient ?? context?.lensClient!,
        {
          post: collection?.postId,
        }
      );
      if (res?.isOk()) {
        setPost(res?.value as Post);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setPostLoading(false);
  };

  const handleOracles = async (): Promise<void> => {
    try {
      const data = await getOracleData();

      context?.setOracleData((data as any)?.data?.currencyAddeds);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!context?.oracleData || context?.oracleData?.length < 1) {
      handleOracles();
    }
  }, []);

  useEffect(() => {
    if (collection && context?.lensClient) {
      getPost();
    }
  }, [collection, context?.lensClient]);

  return {
    post,
    postLoading,
    indice,
    setIndice,
  };
};

export default useCollection;
