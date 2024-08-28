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
import { TFunction } from "i18next";
import { setIsekaiGallery } from "../../../redux/reducers/isekaiGallerySlice";

const useInteractions = (
  gallery: Gallery[],
  filteredGallery: Gallery[] | undefined,
  isekaiGallery: Gallery[],
  filteredIsekaiGallery: Gallery[] | undefined,
  dispatch: Dispatch,
  setFilteredGallery: (e: SetStateAction<Gallery[]>) => void,
  setFilteredIsekaiGallery: (e: SetStateAction<Gallery[]>) => void,
  lensConnected: Profile | undefined,
  publicClient: PublicClient,
  address: `0x${string}` | undefined,
  t: TFunction<"collect", undefined>
) => {
  const [interactionLoaders, setInteractionLoaders] = useState<
    {
      mirror: boolean;
      like: boolean;
    }[]
  >([]);
  const [isekaiInteractionLoaders, setIsekaiInteractionLoaders] = useState<
    {
      mirror: boolean;
      like: boolean;
    }[]
  >([]);

  const mirror = async (id: string, isekai: boolean) => {
    if (!lensConnected?.id) return;

    const index = (
      isekai
        ? filteredIsekaiGallery && filteredIsekaiGallery?.length > 0
          ? filteredIsekaiGallery
          : isekaiGallery
        : filteredGallery && filteredGallery?.length > 0
        ? filteredGallery
        : gallery
    )?.findIndex((item) => item?.publication?.id == id);

    if (index == -1) return;

    (isekai ? setIsekaiInteractionLoaders : setInteractionLoaders)((prev) => {
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
        isekai
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
            isekai
          ),
        dispatch,
        t
      );
    }

    (isekai ? setIsekaiInteractionLoaders : setInteractionLoaders)((prev) => {
      const updatedArray = [...prev];
      updatedArray[index!] = { ...updatedArray[index!], mirror: false };
      return updatedArray;
    });
  };

  const like = async (id: string, hasReacted: boolean, isekai: boolean) => {
    if (!lensConnected?.id) return;

    const index = (
      isekai
        ? filteredIsekaiGallery && filteredIsekaiGallery?.length > 0
          ? filteredIsekaiGallery
          : isekaiGallery
        : filteredGallery && filteredGallery?.length > 0
        ? filteredGallery
        : gallery
    )?.findIndex((item) => item?.publication?.id == id);

    if (index == -1) return;

    (isekai ? setIsekaiInteractionLoaders : setInteractionLoaders)((prev) => {
      const updatedArray = [...prev];
      updatedArray[index!] = { ...updatedArray[index!], like: true };
      return updatedArray;
    });
    try {
      await lensLike(id, dispatch, hasReacted, t);
      updateInteractions(
        index!,
        {
          hasReacted: hasReacted ? false : true,
        },
        "reactions",
        hasReacted ? false : true,
        isekai
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
            isekai
          ),
        dispatch,
        t
      );
    }

    (isekai ? setIsekaiInteractionLoaders : setInteractionLoaders)((prev) => {
      const updatedArray = [...prev];
      updatedArray[index!] = { ...updatedArray[index!], like: false };
      return updatedArray;
    });
  };

  const updateInteractions = (
    index: number,
    valueToUpdate: Object,
    statToUpdate: string,
    increase: boolean,
    isekai: boolean
  ) => {
    const newItems = (
      isekai
        ? filteredIsekaiGallery && filteredIsekaiGallery?.length > 0
          ? filteredIsekaiGallery
          : isekaiGallery
        : filteredGallery && filteredGallery?.length > 0
        ? filteredGallery
        : gallery
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

    isekai
      ? filteredIsekaiGallery && filteredIsekaiGallery?.length > 0
        ? setFilteredIsekaiGallery(newItems as Gallery[])
        : dispatch(setIsekaiGallery(newItems as Gallery[]))
      : filteredGallery && filteredGallery?.length > 0
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

    if (isekaiGallery?.length > 0) {
      setIsekaiInteractionLoaders(
        Array.from({ length: isekaiGallery?.length }, () => ({
          like: false,
          mirror: false,
        }))
      );
    }
  }, [gallery, isekaiGallery]);

  return {
    interactionLoaders,
    mirror,
    like,
    isekaiInteractionLoaders,
  };
};

export default useInteractions;
