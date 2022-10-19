import { useMemo, useState } from "react";
import {
  Gallery,
  useCollectionsResult,
} from "./../../../../types/general.types";
import tokens from "./../../../../pages/api/tokens.json";

const useCollections = (): useCollectionsResult => {
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
  };

  const filterName = (e: any): void => {
    setNameInput(e.target.value);
  };

  const handleSetOrderIRL = (e: any): void => {
    const order: string = e.target.name;
    sessionStorage.setItem("orderIRL", order);
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
    handleSetOrderIRL,
  };
};

export default useCollections;
