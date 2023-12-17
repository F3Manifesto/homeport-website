import { useEffect, useRef, useState } from "react";
import { Gallery } from "./../../../../types/general.types";
import { NextRouter } from "next/router";
import lodash from "lodash";
import { Dispatch } from "redux";
import { getAllCollections } from "../../../../graphql/subgraph/queries/getCollections";
import { setAllGallery } from "../../../../redux/reducers/allGallerySlice";
import { setFilterConstants } from "../../../../redux/reducers/filterConstantsSlice";
import handleCollectionProfilesAndPublications from "../../../../lib/helpers/handleCollectionProfilesAndPublications";
import { Profile } from "../../../../graphql/generated";

const useCollections = (
  dispatch: Dispatch,
  router: NextRouter,
  gallery: Gallery[],
  lensConnected: Profile | undefined
) => {
  const [filteredGallery, setFilteredGallery] = useState<Gallery[]>([]);
  const [galleryLoading, setGalleryLoading] = useState<boolean>(false);
  const shopping = useRef<null | HTMLDivElement>(null);
  const goShopping = (): void => {
    shopping.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getAllGallery = async () => {
    setGalleryLoading(true);
    try {
      const data = await getAllCollections();

      const sexesSet = new Set<string>();
      const stylesSet = new Set<string>();
      const dropsSet = new Set<string>();

      const colls = await handleCollectionProfilesAndPublications(
        (data as any)?.data?.collectionCreateds,
        lensConnected
      );

      dispatch(setAllGallery(colls as Gallery[]));

      colls?.forEach((item: any) => {
        if (item.collectionMetadata?.sex) {
          sexesSet.add(item.collectionMetadata.sex);
        }
        if (item.collectionMetadata?.style) {
          stylesSet.add(item.collectionMetadata.style);
        }
        if (item.dropMetadata?.dropTitle) {
          dropsSet.add(item.dropMetadata.dropTitle);
        }
      });
      dispatch(
        setFilterConstants({
          sexes: Array.from(sexesSet),
          styles: Array.from(stylesSet),
          drops: Array.from(dropsSet),
        })
      );
    } catch (err: any) {
      console.error(err.message);
    }
    setGalleryLoading(false);
  };

  const handleURL = async (type: string, newValue: string): Promise<void> => {
    const currentSex = router.asPath
      ?.split("sex=")?.[1]
      ?.split("?")?.[0]
      ?.split("-")
      .map((sex) => sex?.trim())
      .filter((sex) => sex.length > 0);
    const currentStyle = router.asPath
      ?.split("style=")?.[1]
      ?.split("?")?.[0]
      ?.split("-")
      .map((style) => style?.trim())
      .filter((style) => style.length > 0);
    const currentDrop = router.asPath
      ?.split("style=")?.[1]
      ?.split("?")?.[0]
      ?.split("-")
      .map((drop) => drop?.trim())
      .filter((drop) => drop.length > 0);

    if (type === "name") {
      if (router.asPath?.includes("name=")) {
        await router.replace(
          router.asPath,
          newValue?.trim() === ""
            ? router.asPath.replace(/(\?|&)name=[^?#]*(\?|\/#shopping)?/, "")
            : router.asPath.replace(
                /(name=)[^?#]*(\?|\/#shopping)/,
                `$1${newValue}$2`
              ),
          {
            shallow: true,
            scroll: false,
          }
        );
      } else {
        if (newValue?.trim() !== "") {
          await router.replace(
            router.asPath,
            router.asPath + "?name=" + newValue + "/#shopping",
            {
              shallow: true,
              scroll: false,
            }
          );
        }
      }
    }

    if (
      type === "sex" &&
      newValue?.trim() !== "" &&
      !currentSex?.includes(newValue)
    ) {
      if (router.asPath?.includes("sex=")) {
        await router.replace(
          router.asPath,
          router.asPath.replace(
            /(sex=)[^?#]*(\?|\/#shopping)/,
            `$1${[
              ...currentSex.filter((val) => val !== newValue),
              ...(currentSex.includes(newValue) ? [] : [newValue]),
            ]
              .join("-")
              .replaceAll(" ", "")}$2`
          ),
          {
            shallow: true,
            scroll: false,
          }
        );
      } else {
        router.replace(
          router.asPath,
          router.asPath + "?sex=" + newValue + "/#shopping",
          {
            shallow: true,
            scroll: false,
          }
        );
      }
    }

    if (
      type === "style" &&
      newValue?.trim() !== "" &&
      !currentStyle?.includes(newValue)
    ) {
      if (router.asPath?.includes("style=")) {
        await router.replace(
          router.asPath,
          router.asPath.replace(
            /(style=)[^?#]*(\?|\/#shopping)/,
            `$1${[
              ...currentStyle.filter((val) => val !== newValue),
              ...(currentStyle.includes(newValue) ? [] : [newValue]),
            ]
              .join("-")
              .replaceAll(" ", "")}$2`
          ),
          {
            shallow: true,
            scroll: false,
          }
        );
      } else {
        await router.replace(
          router.asPath,
          router.asPath + "?style=" + newValue + "/#shopping",
          {
            shallow: true,
            scroll: false,
          }
        );
      }
    }

    if (
      type === "drop" &&
      newValue?.trim() !== "" &&
      !currentDrop?.includes(newValue)
    ) {
      if (router.asPath?.includes("drop=")) {
        await router.replace(
          router.asPath,
          router.asPath.replace(
            /(drop=)[^?#]*(\?|\/#shopping)/,
            `$1${[
              ...currentDrop.filter((val) => val !== newValue),
              ...(currentDrop.includes(newValue) ? [] : [newValue]),
            ]
              .join("-")
              .replaceAll(" ", "")}$2`
          ),
          {
            shallow: true,
            scroll: false,
          }
        );
      } else {
        await router.replace(
          router.asPath,
          router.asPath + "?drop=" + newValue + "/#shopping",
          {
            shallow: true,
            scroll: false,
          }
        );
      }
    }
  };

  const filterGallery = () => {
    let galleryFiltered: Gallery[] = [];

    if (router.asPath.includes("?sex=")) {
      const sexSelected: string[] = router.asPath
        .split("?sex=")[1]
        .split("?")[0]
        ?.split("/#shopping")?.[0]
        .replaceAll("-", " ")
        .trim()
        .split(" ");

      galleryFiltered = gallery?.filter((item) =>
        sexSelected?.includes(item?.collectionMetadata?.sex)
      );
    }

    if (router.asPath.includes("?style=")) {
      const styleSelected: string[] = router.asPath
        .split("?style=")[1]
        .split("?")[0]
        ?.split("/#shopping")?.[0]
        .replaceAll("-", " ")
        .trim()
        .split(" ");

      galleryFiltered = gallery?.filter((item) =>
        styleSelected?.includes(item?.collectionMetadata?.style)
      );
    }

    if (router.asPath.includes("?drop=")) {
      const dropSelected: string[] = router.asPath
        .split("?drop=")[1]
        .split("?")[0]
        ?.split("/#shopping")?.[0]
        .replaceAll("-", " ")
        .trim()
        .split(" ");

      galleryFiltered = gallery?.filter((item) =>
        dropSelected?.includes(item?.dropMetadata?.dropTitle)
      );
    }

    if (router.asPath.includes("?name=")) {
      const nameSelected: string = router.asPath
        .split("?name=")[1]
        .split("?")[0]
        ?.split("/#shopping")?.[0];

      galleryFiltered = gallery?.filter((item) =>
        nameSelected?.includes(item?.collectionMetadata?.title)
      );
    }

    setFilteredGallery(galleryFiltered);
  };

  useEffect(() => {
    if (gallery?.length < 1) {
      getAllGallery();
    }
  }, [gallery]);

  useEffect(() => {
    if (gallery?.length > 0) {
      filterGallery();
    }
  }, [gallery?.length, router.asPath]);

  return {
    shopping,
    goShopping,
    filteredGallery,
    galleryLoading,
    handleURL,
  };
};

export default useCollections;
