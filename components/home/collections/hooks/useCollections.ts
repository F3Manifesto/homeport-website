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
  const [sexSelect, setSexSelect] = useState<string[]>([]);
  const [clickedSex, setClickedSex] = useState<boolean>(false);
  const [sexFilter, setSexFilter] = useState<boolean>(false);

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

  const filterSex = (e: any): void => {
    setSexFilter(e.target.name);
    let clickedArray: string[] = [];
    if (sexSelect.includes(e.target.name)) {
      clickedArray = sexSelect.filter((sex: string) => sex !== e.target.name);
    } else {
      clickedArray = [...sexSelect, e.target.name];
    }

    setSexSelect(clickedArray);
    setClickedSex(!clickedSex);
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
    console.log(clickedArray);
    setClickedStyle(!clickedStyle);
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
        if (
          collectionSelect.length === 0 &&
          styleSelect.length !== 0 &&
          sexSelect.length === 0
        ) {
          if (styleSelect.includes(token.style)) {
            filteredGallery.push(token);
          }
        } else if (
          collectionSelect.length !== 0 &&
          styleSelect.length === 0 &&
          sexSelect.length === 0
        ) {
          if (collectionSelect.includes(token.collection)) {
            filteredGallery.push(token);
          }
        } else if (
          collectionSelect.length === 0 &&
          styleSelect.length === 0 &&
          sexSelect.length !== 0
        ) {
          if (sexSelect.includes(token.sex)) {
            filteredGallery.push(token);
          }
        } else if (
          collectionSelect.length !== 0 &&
          styleSelect.length !== 0 &&
          sexSelect.length !== 0
        ) {
          if (
            collectionSelect.includes(token.collection) &&
            styleSelect.includes(token.style) &&
            sexSelect.includes(token.sex)
          ) {
            filteredGallery.push(token);
          }
        } else if (
          collectionSelect.length !== 0 &&
          styleSelect.length === 0 &&
          sexSelect.length !== 0
        ) {
          if (
            collectionSelect.includes(token.collection) &&
            sexSelect.includes(token.sex)
          ) {
            filteredGallery.push(token);
          }
        } else if (
          collectionSelect.length === 0 &&
          styleSelect.length !== 0 &&
          sexSelect.length !== 0
        ) {
          if (
            styleSelect.includes(token.style) &&
            sexSelect.includes(token.sex)
          ) {
            filteredGallery.push(token);
          }
        } else if (
          collectionSelect.length !== 0 &&
          styleSelect.length !== 0 &&
          sexSelect.length === 0
        ) {
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
          sexSelect.length === 0 &&
          !nameInput
        ) {
          filteredGallery = tokens.slice(0, 9);
        }
      });
    }
    setGallery(filteredGallery);
  };

  // const filterURL = (): void => {
  //   if (router.asPath.includes("?sex=") && sexSelect.length !== 0) {
  //     router.replace(
  //       router.asPath,
  //       `?sex=${sexSelect.join("-").replaceAll(" ", "")}/#shopping`,
  //       {
  //         shallow: true,
  //         scroll: false,
  //       }
  //     );
  //   } else if (router.asPath.includes("?sex=") && sexSelect.length === 0) {
  //     // can only do this if its not the first click / first render
  //     router.replace(router.asPath, `?sex=none/#shopping`, {
  //       shallow: true,
  //       scroll: false,
  //     });
  //   }
  // };

  useMemo(() => {
    filterGallery();
    // filterURL();
  }, [collectionSelect, styleSelect, nameInput, sexSelect]);


  // useEffect(() => {
  //   if (router.asPath.includes("?sex=")) {
  //     if (
  //       !router.asPath.includes("?collection=") &&
  //       !router.asPath.includes("?style=")
  //     ) {
  //       const sexSelected: string[] = router.asPath
  //         .split("?sex=")[1]
  //         .split("/#shopping")[0]
  //         .replaceAll("-", " ")
  //         .trim()
  //         .split(" ");

  //       if (sexSelected[0] !== "none") {
  //         setSexSelect(sexSelected);
  //       }
  //     }
  //   }

  //   if (router.asPath.includes("?collection=")) {
  //     if (
  //       !router.asPath.includes("?sex=") &&
  //       !router.asPath.includes("?style=")
  //     ) {
  //       const collectionsSelected: string[] = router.asPath
  //         .split("?collection=")[1]
  //         .split("/#shopping")[0]
  //         .replaceAll("-", " ")
  //         .trim()
  //         .split(" ");

  //       let formattedCollection: string[] = [];
  //       for (let i: number = 0; i < collectionsSelected.length; i++) {
  //         if (collectionsSelected[i] !== "MEVOverride") {
  //           formattedCollection?.push(
  //             collectionsSelected[i]
  //               ?.match(/[A-Z][a-z]+|[0-9]+/g)
  //               ?.join(" ") as string
  //           );
  //         } else {
  //           formattedCollection?.push("MEV Override");
  //         }
  //       }
  //       if (collectionsSelected[0] !== "none") {
  //         setCollectionSelect(formattedCollection);
  //       }
  //     } else if (
  //       router.asPath.includes("?sex=") &&
  //       !router.asPath.includes("?style=")
  //     ) {
  //     } else if (
  //       !router.asPath.includes("?sex=") &&
  //       router.asPath.includes("?style=")
  //     ) {
  //     } else if (
  //       router.asPath.includes("?sex=") &&
  //       router.asPath.includes("?style=")
  //     ) {
  //     }
  //   }

  //   if (router.asPath.includes("?style=")) {
  //     if (
  //       !router.asPath.includes("?collection=") &&
  //       !router.asPath.includes("?sex=")
  //     ) {
  //       const stylesSelected: string[] = router.asPath
  //         .split("?style=")[1]
  //         .split("/#shopping")[0]
  //         .replaceAll("-", " ")
  //         .trim()
  //         .split(" ");

  //       let formattedStyle: string[] = [];
  //       for (let i: number = 0; i < stylesSelected.length; i++) {
  //         if (stylesSelected[i] !== "DIYBrutalism") {
  //           formattedStyle?.push(
  //             stylesSelected[i]
  //               ?.match(/[A-Z][a-z]+|[0-9]+/g)
  //               ?.join(" ") as string
  //           );
  //         } else {
  //           formattedStyle?.push("DIY Brutalism");
  //         }
  //       }

  //       if (stylesSelected[0] !== "none") {
  //         setStyleSelect(formattedStyle);
  //       }
  //     } else if (
  //       !router.asPath.includes("?collection=") &&
  //       router.asPath.includes("?sex=")
  //     ) {
  //     } else if (
  //       router.asPath.includes("?collection=") &&
  //       !router.asPath.includes("?sex=")
  //     ) {
  //     } else if (
  //       router.asPath.includes("?collection=") &&
  //       router.asPath.includes("?sex=")
  //     ) {
  //     }
  //   }
  // }, []);

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
    sexSelect,
    filterSex,
  };
};

export default useCollections;
