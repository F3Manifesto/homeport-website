import { useEffect, useRef, useState } from "react";
import { Gallery } from "./../../../../types/general.types";
import { NextRouter } from "next/router";
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
      const returned = await getAllCollections(1000, 0);

      const sexesSet = new Set<string>();
      const stylesSet = new Set<string>();
      const dropsSet = new Set<string>();

      const colls = await handleCollectionProfilesAndPublications(
        returned?.data?.collectionCreateds,
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
    let baseUrl = router.asPath.split("?")[0].split("#")[0];
    let queryParams = new URLSearchParams(router.asPath.split("?")[1]);
    let newUrl: string = "";

    if (type !== "name") {
      newValue = newValue.trim().replace(/\s+/g, "");

      let queryArray =
        queryParams
          .get(type)
          ?.replaceAll("/#shopping", "")
          ?.split("-")
          ?.filter((item) => item) || [];

      if (queryArray.includes(newValue)) {
        queryArray = queryArray.filter((item) => item !== newValue);
      } else if (newValue !== "") {
        queryArray.push(newValue);
      }

      if (queryArray.length === 0) {
        queryParams.delete(type);
      } else {
        queryParams.set(type, queryArray.join("-"));
      }
    } else {
      // Manejo específico para 'name'
      if (newValue !== "") {
        queryParams.set("name", newValue);
      } else {
        queryParams.delete("name");
      }
    }
    let queryString = Array.from(queryParams.entries())
      .map((entry, index) => {
        return `${index === 0 ? "" : "&"}${entry[0]}=${entry[1]}`;
      })
      .join("");

    newUrl = `${baseUrl}?${queryString?.replaceAll(
      "/#shopping",
      ""
    )}${"/#shopping"}`;

    await router.replace(
      router.asPath,
      newUrl?.includes("?/#shopping") ? newUrl?.replaceAll("?", "") : newUrl,
      {
        shallow: true,
        scroll: false,
      }
    );
  };

  const filterGallery = () => {
    let galleryFiltered: Gallery[] = [];

    if (router.asPath.includes("sex=")) {
      const sexSelected: string[] = router.asPath
        .split("sex=")[1]
        .split("&")[0]
        .split("?")[0]
        .replaceAll("-", " ")
        ?.split("/#shopping")?.[0]
        .trim()
        .split(" ");

      if (sexSelected?.length > 0) {
        galleryFiltered = gallery?.filter((item) =>
          sexSelected?.some(
            (sex) =>
              sex
                ?.replace(/([A-Z])/g, " $1")
                ?.trim()
                ?.toLowerCase() === item?.collectionMetadata?.sex?.toLowerCase()
          )
        );
      }
    }

    if (router.asPath.includes("style=")) {
      const styleSelected: string[] = router.asPath
        .split("style=")[1]
        .split("&")[0]
        .split("?")[0]
        .replaceAll("-", " ")
        ?.split("/#shopping")?.[0]
        .trim()
        .split(" ");

      if (styleSelected?.length > 0) {
        galleryFiltered = (
          galleryFiltered?.length > 0 ? galleryFiltered : gallery
        )?.filter((item) =>
          styleSelected?.some(
            (style) =>
              style
                .replace(/(LoFi|DIY|LES|MEV)|([A-Z])/g, (match, p1) =>
                  p1 ? p1 : " " + match
                )
                ?.toLowerCase()
                .trim() === item?.collectionMetadata?.style?.toLowerCase()
          )
        );
      }
    }

    if (router.asPath.includes("collection=")) {
      const dropSelected: string[] = router.asPath
        .split("collection=")[1]
        .split("&")[0]
        .split("?")[0]
        .replaceAll("-", " ")
        ?.split("/#shopping")?.[0]
        .trim()
        .split(" ");

      if (dropSelected?.length > 0) {
        galleryFiltered = (
          galleryFiltered?.length > 0 ? galleryFiltered : gallery
        )?.filter((item) =>
          dropSelected?.some(
            (drop) =>
              drop
                .replace(/(LoFi|DIY|LES|MEV)|([A-Z])/g, (match, p1) =>
                  p1 ? p1 : " " + match
                )
                ?.toLowerCase()
                .trim() === item?.dropMetadata?.dropTitle?.toLowerCase()
          )
        );
      }
    }

    if (router.asPath.includes("name=")) {
      const nameSelected: string = router.asPath
        .split("name=")[1]
        .split("&")[0]
        .split("?")[0]
        ?.split("/#shopping")?.[0];

      if (nameSelected !== "" && nameSelected) {
        galleryFiltered = (
          galleryFiltered?.length > 0 ? galleryFiltered : gallery
        )?.filter((item) =>
          item?.collectionMetadata?.title
            ?.toLowerCase()
            ?.includes(nameSelected?.toLowerCase())
        );
      }
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
    setFilteredGallery,
  };
};

export default useCollections;
