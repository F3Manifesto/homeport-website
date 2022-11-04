import { useEffect, useMemo, useState } from "react";
import {
  Gallery,
  useCollectionsResult,
} from "./../../../../types/general.types";
import tokens from "./../../../../pages/api/tokens.json";
import { useRouter } from "next/router";

const useCollections = (): useCollectionsResult => {
  const router = useRouter();
  const [gallery, setGallery] = useState<Gallery[]>(tokens.slice(0, 9));
  const [collectionFilter, setCollectionFilter] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>();
  const [styleFilter, setStyleFilter] = useState<string>(" ");
  const [clickedCollection, setClickedCollection] = useState<boolean>(false);
  const [clickedStyle, setClickedStyle] = useState<boolean>(false);
  const [collectionSelect, setCollectionSelect] = useState<string[]>([]);
  const [styleSelect, setStyleSelect] = useState<string[]>([]);

  const filterCollections = (e: any): void => {
    setCollectionFilter(e.target.name);
    let clickedArray: string[] = [];
    if (collectionSelect.includes(e.target.name)) {
      clickedArray = collectionSelect.filter(
        (collection: string) => collection !== e.target.name
      );
    } else {
      clickedArray = [...collectionSelect, e.target.name];
    }
    setCollectionSelect(clickedArray);
    setClickedCollection(!clickedCollection);
    router.replace(
      router.asPath,
      router.asPath.includes("collection")
        ? router.asPath.replaceAll(
            router.asPath.split("?collection=")[1]?.includes("=")
              ? `${router.asPath.split("?collection=")[1]?.split("?=style")[0]}`
              : `${router.asPath.split("?collection=")[1]}`,
            `${clickedArray.join("-").replaceAll(" ", "")}`
          )
        : router.asPath.includes("style")
        ? router.asPath +
          `?collection=${clickedArray.join("-").replaceAll(" ", "")}`
        : `/#shopping?collection=${clickedArray.join("-").replaceAll(" ", "")}`,
      {
        shallow: true,
        scroll: false,
      }
    );
    console.log(router.asPath.split("?collection=")[1]?.split("=")[0]);
  };

  const filterStyle = (e: any): void => {
    setStyleFilter(e.target.name);
    let clickedArray: string[] = [];
    if (styleSelect.includes(e.target.name)) {
      clickedArray = styleSelect.filter(
        (collection: string) => collection !== e.target.name
      );
    } else {
      clickedArray = [...styleSelect, e.target.name];
    }
    setStyleSelect(clickedArray);
    setClickedStyle(!clickedStyle);
    router.replace(
      router.asPath,
      router.asPath.includes("style")
        ? router.asPath.replaceAll(
            router.asPath.split("?style=")[1]?.includes("=")
              ? `${router.asPath.split("?style=")[1]?.split("?=collection")[0]}`
              : `${router.asPath.split("?style=")[1]}`,
            `${clickedArray.join("-").replaceAll(" ", "")}`
          )
        : router.asPath.includes("style")
        ? router.asPath +
          `?style=${clickedArray.join("-").replaceAll(" ", "")}`
        : `/#shopping?style=${clickedArray.join("-").replaceAll(" ", "")}`,
      {
        shallow: true,
        scroll: false,
      }
    );
  };

  const filterName = (e: any): void => {
    setNameInput(e.target.value);
  };

  const filterGallery = (): void => {
    let filteredGallery: Gallery[] = [];

    if (nameInput) {
      tokens.forEach((token) => {
        if (nameInput.toLowerCase() === token.name.toLowerCase()) {
          filteredGallery.push(token);
        }
      });
    } else {
      tokens.forEach((token) => {
        if (collectionSelect.length === 0 && styleSelect.length !== 0) {
          if (styleSelect.includes(token.style)) {
            filteredGallery.push(token);
          }
        } else if (collectionSelect.length !== 0 && styleSelect.length === 0) {
          if (collectionSelect.includes(token.collection)) {
            filteredGallery.push(token);
          }
        } else if (collectionSelect.length !== 0 && styleSelect.length !== 0) {
          if (
            collectionSelect.includes(token.collection) &&
            styleSelect.includes(token.style)
          ) {
            filteredGallery.push(token);
          }
        } else if (nameInput) {
          if (nameInput?.toLowerCase() === token.name.toLowerCase()) {
            filteredGallery.push(token);
          }
        } else if (
          collectionSelect.length === 0 &&
          styleSelect.length === 0 &&
          !nameInput
        ) {
          filteredGallery = tokens.slice(0, 9);
        }
      });
    }
    setGallery(filteredGallery);
  };

  useMemo(() => {
    filterGallery();
  }, [collectionSelect, styleSelect, nameInput]);

  useEffect(() => {
    console.log(
      router.asPath.split("?collection=")[1]?.includes("=")
        ? router.asPath.split("?collection=")[1]?.split("=", 0)
        : router.asPath.split("?collection=")[1]
    );
  }, [router.asPath]);

  return {
    gallery,
    filterCollections,
    filterName,
    filterStyle,
    clickedStyle,
    clickedCollection,
    collectionSelect,
    collectionFilter,
    styleSelect,
    styleFilter,
  };
};

export default useCollections;
