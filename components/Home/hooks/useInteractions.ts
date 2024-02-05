import { SetStateAction, useEffect, useState } from "react";
import { Dispatch } from "redux";
import { Profile, PublicationStats } from "../../../graphql/generated";
import { PublicClient, createWalletClient, custom } from "viem";
import { polygon } from "viem/chains";
import lensMirror from "../../../lib/helpers/lensMirror";
import errorChoice from "../../../lib/helpers/errorChoice";
import lensLike from "../../../lib/helpers/lensLike";
import { setAllGallery } from "../../../redux/reducers/allGallerySlice";
import { Gallery } from "../types/home.types";

const useInteractions = (
  gallery: Gallery[],
  filteredGallery: Gallery[] | undefined,
  dispatch: Dispatch,
  setFilteredGallery: (e: SetStateAction<Gallery[]>) => void,
  lensConnected: Profile | undefined,
  publicClient: PublicClient,
  address: `0x${string}` | undefined
) => {
  const [interactionLoaders, setInteractionLoaders] = useState<
    {
      mirror: boolean;
      like: boolean;
    }[]
  >([]);

  const mirror = async (id: string) => {
    if (!lensConnected?.id) return;

    const index = (
      filteredGallery && filteredGallery?.length > 0 ? filteredGallery : gallery
    )?.findIndex((item) => item?.publication?.id == id);

    if (index == -1) return;

    setInteractionLoaders((prev) => {
      const updatedArray = [...prev];
      updatedArray[index!] = { ...updatedArray[index!], mirror: true };
      return updatedArray;
    });

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
        true
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
            true
          ),
        dispatch
      );
    }

    setInteractionLoaders((prev) => {
      const updatedArray = [...prev];
      updatedArray[index!] = { ...updatedArray[index!], mirror: false };
      return updatedArray;
    });
  };

  const like = async (id: string, hasReacted: boolean) => {
    if (!lensConnected?.id) return;

    const index = (
      filteredGallery && filteredGallery?.length > 0 ? filteredGallery : gallery
    )?.findIndex((item) => item?.publication?.id == id);

    if (index == -1) return;

    setInteractionLoaders((prev) => {
      const updatedArray = [...prev];
      updatedArray[index!] = { ...updatedArray[index!], like: true };
      return updatedArray;
    });
    try {
      await lensLike(id, dispatch, hasReacted);
      updateInteractions(
        index!,
        {
          hasReacted: hasReacted ? false : true,
        },
        "reactions",
        hasReacted ? false : true
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
            hasReacted ? false : true
          ),
        dispatch
      );
    }

    setInteractionLoaders((prev) => {
      const updatedArray = [...prev];
      updatedArray[index!] = { ...updatedArray[index!], like: false };
      return updatedArray;
    });
  };

  const updateInteractions = (
    index: number,
    valueToUpdate: Object,
    statToUpdate: string,
    increase: boolean
  ) => {
    const newItems = (
      filteredGallery && filteredGallery?.length > 0 ? filteredGallery : gallery
    ).map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          publication: {
            ...item.publication,
            operations: {
              ...item.publication?.operations,
              ...valueToUpdate,
            },
            stats: {
              ...item.publication?.stats,
              [statToUpdate]:
                item?.publication?.stats?.[
                  statToUpdate as keyof PublicationStats
                ] + (increase ? 1 : -1),
            },
          },
        };
      }
      return item;
    });

    filteredGallery && filteredGallery?.length > 0
      ? setFilteredGallery(newItems as Gallery[])
      : dispatch(setAllGallery(newItems as Gallery[]));
  };

  useEffect(() => {
    if (gallery?.length > 0) {
      setInteractionLoaders(
        Array.from({ length: gallery?.length }, () => ({
          like: false,
          mirror: false,
        }))
      );
    }
  }, [gallery]);

  return {
    interactionLoaders,
    mirror,
    like,
  };
};

export default useInteractions;
