import { useEffect, useMemo, useState } from "react";
import {
  Gallery,
  useCollectionsResult,
} from "./../../../../types/general.types";
import tokens from "./../../../../pages/api/tokens.json";
import { useRouter } from "next/router";
import lodash from "lodash";

const useCollections = (): useCollectionsResult => {
  const router = useRouter();
  const [gallery, setGallery] = useState<Gallery[]>(tokens.slice(-9));
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
    filterURL(clickedArray, "collection");
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
    filterURL(clickedArray, "sex");
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
    filterURL(clickedArray, "style");
  };

  const filterName = (e: any): void => {
    setNameInput(e.target.value);
    filterURL(e.target.value, "name");
  };

  const filterGallery = (): void => {
    let filteredGallery: Gallery[] = [];

    if (nameInput) {
      tokens.forEach((token) => {
        if (
          nameInput.toLowerCase() === token.name.toLowerCase() ||
          token.name.toLowerCase().startsWith(nameInput.toLowerCase())
        ) {
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
          filteredGallery = tokens.slice(-9);
        }
      });
    }
    setGallery(filteredGallery);
  };

  const filterURL = (clickedArray: string[], type: string): void => {
    if (type === "sex") {
      if (clickedArray.length !== 0) {
        router.replace(
          router.asPath,
          (styleSelect.length && collectionSelect.length) !== 0
            ? `?sex=${clickedArray
                .join("-")
                .replaceAll(" ", "")}?collection=${collectionSelect
                .join("-")
                .replaceAll(" ", "")}?style=${styleSelect
                .join("-")
                .replaceAll(" ", "")}/#shopping`
            : styleSelect.length !== 0 && collectionSelect.length == 0
            ? `?sex=${clickedArray
                .join("-")
                .replaceAll(" ", "")}?style=${styleSelect
                .join("-")
                .replaceAll(" ", "")}/#shopping`
            : styleSelect.length === 0 && collectionSelect.length != 0
            ? `?sex=${clickedArray
                .join("-")
                .replaceAll(" ", "")}?collection=${collectionSelect
                .join("-")
                .replaceAll(" ", "")}/#shopping`
            : `?sex=${clickedArray.join("-").replaceAll(" ", "")}/#shopping`,
          {
            shallow: true,
            scroll: false,
          }
        );
      } else {
        router.replace(
          router.asPath,
          (styleSelect.length && collectionSelect.length) !== 0
            ? `?sex=none?collection=${collectionSelect
                .join("-")
                .replaceAll(" ", "")}?style=${styleSelect
                .join("-")
                .replaceAll(" ", "")}/#shopping`
            : styleSelect.length !== 0 && collectionSelect.length == 0
            ? `?sex=none?style=${styleSelect
                .join("-")
                .replaceAll(" ", "")}/#shopping`
            : styleSelect.length === 0 && collectionSelect.length != 0
            ? `?sex=none?collection=${collectionSelect
                .join("-")
                .replaceAll(" ", "")}/#shopping`
            : `?sex=none/#shopping`,
          {
            shallow: true,
            scroll: false,
          }
        );
      }
    }

    if (type === "style") {
      if (clickedArray.length !== 0) {
        router.replace(
          router.asPath,
          (sexSelect.length && collectionSelect.length) !== 0
            ? `?style=${clickedArray
                .join("-")
                .replaceAll(" ", "")}?collection=${collectionSelect
                .join("-")
                .replaceAll(" ", "")}?sex=${sexSelect
                .join("-")
                .replaceAll(" ", "")}/#shopping`
            : sexSelect.length !== 0 && collectionSelect.length == 0
            ? `?style=${clickedArray
                .join("-")
                .replaceAll(" ", "")}?sex=${sexSelect
                .join("-")
                .replaceAll(" ", "")}/#shopping`
            : sexSelect.length === 0 && collectionSelect.length != 0
            ? `?style=${clickedArray
                .join("-")
                .replaceAll(" ", "")}?collection=${collectionSelect
                .join("-")
                .replaceAll(" ", "")}/#shopping`
            : `?style=${clickedArray.join("-").replaceAll(" ", "")}/#shopping`,
          {
            shallow: true,
            scroll: false,
          }
        );
      } else {
        router.replace(
          router.asPath,
          (sexSelect.length && collectionSelect.length) !== 0
            ? `?style=none?collection=${collectionSelect
                .join("-")
                .replaceAll(" ", "")}?sex=${sexSelect
                .join("-")
                .replaceAll(" ", "")}/#shopping`
            : sexSelect.length !== 0 && collectionSelect.length == 0
            ? `?style=none?sex=${sexSelect
                .join("-")
                .replaceAll(" ", "")}/#shopping`
            : sexSelect.length === 0 && collectionSelect.length != 0
            ? `?style=none?collection=${collectionSelect
                .join("-")
                .replaceAll(" ", "")}/#shopping`
            : `?style=none/#shopping`,
          {
            shallow: true,
            scroll: false,
          }
        );
      }
    }

    if (type === "collection") {
      if (clickedArray.length !== 0) {
        router.replace(
          router.asPath,
          (sexSelect.length && styleSelect.length) !== 0
            ? `?collection=${clickedArray
                .join("-")
                .replaceAll(" ", "")}?style=${styleSelect
                .join("-")
                .replaceAll(" ", "")}?sex=${sexSelect
                .join("-")
                .replaceAll(" ", "")}/#shopping`
            : sexSelect.length !== 0 && styleSelect.length == 0
            ? `?collection=${clickedArray
                .join("-")
                .replaceAll(" ", "")}?sex=${sexSelect
                .join("-")
                .replaceAll(" ", "")}/#shopping`
            : sexSelect.length === 0 && styleSelect.length != 0
            ? `?collection=${clickedArray
                .join("-")
                .replaceAll(" ", "")}?style=${styleSelect
                .join("-")
                .replaceAll(" ", "")}/#shopping`
            : `?collection=${clickedArray
                .join("-")
                .replaceAll(" ", "")}/#shopping`,
          {
            shallow: true,
            scroll: false,
          }
        );
      } else {
        router.replace(
          router.asPath,
          (sexSelect.length && styleSelect.length) !== 0
            ? `?collection=none?style=${styleSelect
                .join("-")
                .replaceAll(" ", "")}?sex=${sexSelect
                .join("-")
                .replaceAll(" ", "")}/#shopping`
            : sexSelect.length !== 0 && styleSelect.length == 0
            ? `?collection=none?sex=${sexSelect
                .join("-")
                .replaceAll(" ", "")}/#shopping`
            : sexSelect.length === 0 && styleSelect.length != 0
            ? `?collection=none?style=${styleSelect
                .join("-")
                .replaceAll(" ", "")}/#shopping`
            : `?collection=none/#shopping`,
          {
            shallow: true,
            scroll: false,
          }
        );
      }
    }
  };

  useMemo(() => {
    filterGallery();
  }, [collectionSelect, styleSelect, nameInput, sexSelect]);

  useEffect(() => {
    if (router.asPath.includes("?sex=")) {
      if (
        !router.asPath.includes("?collection=") &&
        !router.asPath.includes("?style=")
      ) {
        // only sex exists
        const sexSelected: string[] = router.asPath
          .split("?sex=")[1]
          .split("/#shopping")[0]
          .replaceAll("-", " ")
          .trim()
          .split(" ");

        if (sexSelected[0] !== "none") {
          setSexSelect(sexSelected);
        }
      } else if (
        router.asPath.includes("?collection=") &&
        !router.asPath.includes("?style=")
      ) {
        // check if collection is after sex
        if (router.asPath.split("?sex=")[1].includes("?collection=")) {
          const sexSelected: string[] = router.asPath
            .split("?sex=")[1]
            .split("?collection")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const collectionSelected: string[] = router.asPath
            .split("?collection")[1]
            .split("/#shopping")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");
          if (router.asPath.includes("Jid%C5%8DkaImprint")) {
            const index: number = lodash.findIndex(
              router.asPath
                .split("?collection=")[1]
                .split("/#shopping")[0]
                .replaceAll("-", " ")
                .trim()
                .split(" "),
              (item) => item === "Jid%C5%8DkaImprint"
            );
            collectionSelected[index] = "Jidōka Imprint";
          }

          let formattedCollection: string[] = [];
          for (let i: number = 0; i < collectionSelected.length; i++) {
            if (
              collectionSelected[i] !== "MEVOverride" &&
              collectionSelected[i] !== "LoFiSynthwear" &&
              collectionSelected[i] !== "Jidōka Imprint" &&
              collectionSelected[i] !== "LESExchange"
            ) {
              formattedCollection?.push(
                collectionSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (collectionSelected[i] === "MEVOverride") {
              formattedCollection?.push("MEV Override");
            } else if (collectionSelected[i] === "LoFiSynthwear") {
              formattedCollection?.push("LoFi Synthwear");
            } else if (collectionSelected[i] === "Jidōka Imprint") {
              formattedCollection?.push("Jidōka Imprint");
            } else if (collectionSelected[i] === "LESExchange") {
              formattedCollection?.push("LES Exchange");
            }
          }
          if (collectionSelected[0] !== "none") {
            setCollectionSelect(formattedCollection);
          }
          if (sexSelected[0] !== "none") {
            setSexSelect(sexSelected);
          }
        }
        // check if collection is before sex
        else {
          const sexSelected: string[] = router.asPath
            .split("?sex=")[1]
            .split("/#shopping")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const collectionSelected: string[] = router.asPath
            .split("?collection=")[1]
            .split("?sex=")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");
          if (router.asPath.includes("Jid%C5%8DkaImprint")) {
            const index: number = lodash.findIndex(
              router.asPath
                .split("?collection=")[1]
                .split("/#shopping")[0]
                .replaceAll("-", " ")
                .trim()
                .split(" "),
              (item) => item === "Jid%C5%8DkaImprint"
            );
            collectionSelected[index] = "Jidōka Imprint";
          }

          let formattedCollection: string[] = [];
          for (let i: number = 0; i < collectionSelected.length; i++) {
            if (
              collectionSelected[i] !== "MEVOverride" &&
              collectionSelected[i] !== "LoFiSynthwear" &&
              collectionSelected[i] !== "Jidōka Imprint" &&
              collectionSelected[i] !== "LESExchange"
            ) {
              formattedCollection?.push(
                collectionSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (collectionSelected[i] === "MEVOverride") {
              formattedCollection?.push("MEV Override");
            } else if (collectionSelected[i] === "LoFiSynthwear") {
              formattedCollection?.push("LoFi Synthwear");
            } else if (collectionSelected[i] === "Jidōka Imprint") {
              formattedCollection?.push("Jidōka Imprint");
            } else if (collectionSelected[i] === "LESExchange") {
              formattedCollection?.push("LES Exchange");
            }
          }
          if (collectionSelected[0] !== "none") {
            setCollectionSelect(formattedCollection);
          }
          if (sexSelected[0] !== "none") {
            setSexSelect(sexSelected);
          }
        }
      } else if (
        !router.asPath.includes("?collection=") &&
        router.asPath.includes("?style=")
      ) {
        // check if style is after sex
        if (router.asPath.split("?sex=")[1].includes("?style=")) {
          const sexSelected: string[] = router.asPath
            .split("?sex=")[1]
            .split("?style")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const styleSelected: string[] = router.asPath
            .split("?style")[1]
            .split("/#shopping")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          let formattedStyle: string[] = [];
          for (let i: number = 0; i < styleSelected.length; i++) {
            if (
              styleSelected[i] !== "DIYBrutalism" &&
              styleSelected[i] !== "LoFiTechWear"
            ) {
              formattedStyle?.push(
                styleSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (styleSelected[i] === "DIYBrutalism") {
              formattedStyle?.push("DIY Brutalism");
            } else if (styleSelected[i] === "LoFiTechWear") {
              formattedStyle?.push("LoFi Tech Wear");
            }
          }

          if (styleSelected[0] !== "none") {
            setStyleSelect(formattedStyle);
          }
          if (sexSelected[0] !== "none") {
            setSexSelect(sexSelected);
          }
        }
        // check if style is before sex
        else {
          const sexSelected: string[] = router.asPath
            .split("?sex=")[1]
            .split("/#shopping")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const styleSelected: string[] = router.asPath
            .split("?style=")[1]
            .split("?sex=")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          let formattedStyle: string[] = [];
          for (let i: number = 0; i < styleSelected.length; i++) {
            if (
              styleSelected[i] !== "DIYBrutalism" &&
              styleSelected[i] !== "LoFiTechWear"
            ) {
              formattedStyle?.push(
                styleSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (styleSelected[i] === "DIYBrutalism") {
              formattedStyle?.push("DIY Brutalism");
            } else if (styleSelected[i] === "LoFiTechWear") {
              formattedStyle?.push("LoFi Tech Wear");
            }
          }

          if (styleSelected[0] !== "none") {
            setStyleSelect(formattedStyle);
          }
          if (sexSelected[0] !== "none") {
            setSexSelect(sexSelected);
          }
        }
      } else if (
        router.asPath.includes("?collection=") &&
        router.asPath.includes("?style=")
      ) {
        // check if style and collection are after sex
        if (
          router.asPath.split("?sex=")[1].includes("?style=") &&
          router.asPath.split("?sex=")[1].includes("?collection=")
        ) {
          // check if collection is at the very end
          if (
            router.asPath
              .split("?sex=")[1]
              .split("?style=")[1]
              .includes("?collection=")
          ) {
            const sexSelected: string[] = router.asPath
              .split("?sex=")[1]
              .split("?style=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const styleSelected: string[] = router.asPath
              .split("?style=")[1]
              .split("?collection=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const collectionSelected: string[] = router.asPath
              .split("?collection=")[1]
              .split("/#shopping")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");
            if (router.asPath.includes("Jid%C5%8DkaImprint")) {
              const index: number = lodash.findIndex(
                router.asPath
                  .split("?collection=")[1]
                  .split("/#shopping")[0]
                  .replaceAll("-", " ")
                  .trim()
                  .split(" "),
                (item) => item === "Jid%C5%8DkaImprint"
              );
              collectionSelected[index] = "Jidōka Imprint";
            }

            let formattedStyle: string[] = [];
            for (let i: number = 0; i < styleSelected.length; i++) {
              if (
                styleSelected[i] !== "DIYBrutalism" &&
                styleSelected[i] !== "LoFiTechWear"
              ) {
                formattedStyle?.push(
                  styleSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (styleSelected[i] === "DIYBrutalism") {
                formattedStyle?.push("DIY Brutalism");
              } else if (styleSelected[i] === "LoFiTechWear") {
                formattedStyle?.push("LoFi Tech Wear");
              }
            }

            if (styleSelected[0] !== "none") {
              setStyleSelect(formattedStyle);
            }
            if (sexSelected[0] !== "none") {
              setSexSelect(sexSelected);
            }

            let formattedCollection: string[] = [];
            for (let i: number = 0; i < collectionSelected.length; i++) {
              if (
                collectionSelected[i] !== "MEVOverride" &&
                collectionSelected[i] !== "LoFiSynthwear" &&
                collectionSelected[i] !== "Jidōka Imprint" &&
                collectionSelected[i] !== "LESExchange"
              ) {
                formattedCollection?.push(
                  collectionSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (collectionSelected[i] === "MEVOverride") {
                formattedCollection?.push("MEV Override");
              } else if (collectionSelected[i] === "LoFiSynthwear") {
                formattedCollection?.push("LoFi Synthwear");
              } else if (collectionSelected[i] === "Jidōka Imprint") {
                formattedCollection?.push("Jidōka Imprint");
              } else if (collectionSelected[i] === "LESExchange") {
                formattedCollection?.push("LES Exchange");
              }
            }
            if (collectionSelected[0] !== "none") {
              setCollectionSelect(formattedCollection);
            }
          }
          // check style at the very end
          else {
            const sexSelected: string[] = router.asPath
              .split("?sex=")[1]
              .split("?collection=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const collectionSelected: string[] = router.asPath
              .split("?collection=")[1]
              .split("?style=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");
            if (router.asPath.includes("Jid%C5%8DkaImprint")) {
              const index: number = lodash.findIndex(
                router.asPath
                  .split("?collection=")[1]
                  .split("/#shopping")[0]
                  .replaceAll("-", " ")
                  .trim()
                  .split(" "),
                (item) => item === "Jid%C5%8DkaImprint"
              );
              collectionSelected[index] = "Jidōka Imprint";
            }

            const styleSelected: string[] = router.asPath
              .split("?style=")[1]
              .split("/#shopping")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            let formattedStyle: string[] = [];
            for (let i: number = 0; i < styleSelected.length; i++) {
              if (
                styleSelected[i] !== "DIYBrutalism" &&
                styleSelected[i] !== "LoFiTechWear"
              ) {
                formattedStyle?.push(
                  styleSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (styleSelected[i] === "DIYBrutalism") {
                formattedStyle?.push("DIY Brutalism");
              } else if (styleSelected[i] === "LoFiTechWear") {
                formattedStyle?.push("LoFi Tech Wear");
              }
            }

            if (styleSelected[0] !== "none") {
              setStyleSelect(formattedStyle);
            }
            if (sexSelected[0] !== "none") {
              setSexSelect(sexSelected);
            }

            let formattedCollection: string[] = [];
            for (let i: number = 0; i < collectionSelected.length; i++) {
              if (
                collectionSelected[i] !== "MEVOverride" &&
                collectionSelected[i] !== "LoFiSynthwear" &&
                collectionSelected[i] !== "Jidōka Imprint" &&
                collectionSelected[i] !== "LESExchange"
              ) {
                formattedCollection?.push(
                  collectionSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (collectionSelected[i] === "MEVOverride") {
                formattedCollection?.push("MEV Override");
              } else if (collectionSelected[i] === "LoFiSynthwear") {
                formattedCollection?.push("LoFi Synthwear");
              } else if (collectionSelected[i] === "Jidōka Imprint") {
                formattedCollection?.push("Jidōka Imprint");
              } else if (collectionSelected[i] === "LESExchange") {
                formattedCollection?.push("LES Exchange");
              }
            }
            if (collectionSelected[0] !== "none") {
              setCollectionSelect(formattedCollection);
            }
          }
        }
        // check if style and collection are before sex
        else if (
          router.asPath.split("?sex=")[0].includes("?style=") &&
          router.asPath.split("?sex=")[0].includes("?collection=")
        ) {
          // check if collection is at the very start
          if (router.asPath.split("?collection=")[1].includes("?style=")) {
            const sexSelected: string[] = router.asPath
              .split("?sex=")[1]
              .split("/#shopping")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const styleSelected: string[] = router.asPath
              .split("?style=")[1]
              .split("?sex=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const collectionSelected: string[] = router.asPath
              .split("?style=")[0]
              .split("?collection=")[1]
              .replaceAll("-", " ")
              .trim()
              .split(" ");
            if (router.asPath.includes("Jid%C5%8DkaImprint")) {
              const index: number = lodash.findIndex(
                router.asPath
                  .split("?collection=")[1]
                  .split("/#shopping")[0]
                  .replaceAll("-", " ")
                  .trim()
                  .split(" "),
                (item) => item === "Jid%C5%8DkaImprint"
              );
              collectionSelected[index] = "Jidōka Imprint";
            }

            let formattedStyle: string[] = [];
            for (let i: number = 0; i < styleSelected.length; i++) {
              if (
                styleSelected[i] !== "DIYBrutalism" &&
                styleSelected[i] !== "LoFiTechWear"
              ) {
                formattedStyle?.push(
                  styleSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (styleSelected[i] === "DIYBrutalism") {
                formattedStyle?.push("DIY Brutalism");
              } else if (styleSelected[i] === "LoFiTechWear") {
                formattedStyle?.push("LoFi Tech Wear");
              }
            }

            if (styleSelected[0] !== "none") {
              setStyleSelect(formattedStyle);
            }
            if (sexSelected[0] !== "none") {
              setSexSelect(sexSelected);
            }

            let formattedCollection: string[] = [];
            for (let i: number = 0; i < collectionSelected.length; i++) {
              if (
                collectionSelected[i] !== "MEVOverride" &&
                collectionSelected[i] !== "LoFiSynthwear" &&
                collectionSelected[i] !== "Jidōka Imprint" &&
                collectionSelected[i] !== "LESExchange"
              ) {
                formattedCollection?.push(
                  collectionSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (collectionSelected[i] === "MEVOverride") {
                formattedCollection?.push("MEV Override");
              } else if (collectionSelected[i] === "LoFiSynthwear") {
                formattedCollection?.push("LoFi Synthwear");
              } else if (collectionSelected[i] === "Jidōka Imprint") {
                formattedCollection?.push("Jidōka Imprint");
              } else if (collectionSelected[i] === "LESExchange") {
                formattedCollection?.push("LES Exchange");
              }
            }
            if (collectionSelected[0] !== "none") {
              setCollectionSelect(formattedCollection);
            }
          }
          // check style at the very start
          else {
            const sexSelected: string[] = router.asPath
              .split("?sex=")[1]
              .split("/#shopping")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const styleSelected: string[] = router.asPath
              .split("?collection=")[0]
              .split("?style=")[1]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const collectionSelected: string[] = router.asPath
              .split("?collection=")[1]
              .split("?sex=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");
            if (router.asPath.includes("Jid%C5%8DkaImprint")) {
              const index: number = lodash.findIndex(
                router.asPath
                  .split("?collection=")[1]
                  .split("/#shopping")[0]
                  .replaceAll("-", " ")
                  .trim()
                  .split(" "),
                (item) => item === "Jid%C5%8DkaImprint"
              );
              collectionSelected[index] = "Jidōka Imprint";
            }

            let formattedStyle: string[] = [];
            for (let i: number = 0; i < styleSelected.length; i++) {
              if (
                styleSelected[i] !== "DIYBrutalism" &&
                styleSelected[i] !== "LoFiTechWear"
              ) {
                formattedStyle?.push(
                  styleSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (styleSelected[i] === "DIYBrutalism") {
                formattedStyle?.push("DIY Brutalism");
              } else if (styleSelected[i] === "LoFiTechWear") {
                formattedStyle?.push("LoFi Tech Wear");
              }
            }

            if (styleSelected[0] !== "none") {
              setStyleSelect(formattedStyle);
            }
            if (sexSelected[0] !== "none") {
              setSexSelect(sexSelected);
            }

            let formattedCollection: string[] = [];
            for (let i: number = 0; i < collectionSelected.length; i++) {
              if (
                collectionSelected[i] !== "MEVOverride" &&
                collectionSelected[i] !== "LoFiSynthwear" &&
                collectionSelected[i] !== "Jidōka Imprint" &&
                collectionSelected[i] !== "LESExchange"
              ) {
                formattedCollection?.push(
                  collectionSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (collectionSelected[i] === "MEVOverride") {
                formattedCollection?.push("MEV Override");
              } else if (collectionSelected[i] === "LoFiSynthwear") {
                formattedCollection?.push("LoFi Synthwear");
              } else if (collectionSelected[i] === "Jidōka Imprint") {
                formattedCollection?.push("Jidōka Imprint");
              } else if (collectionSelected[i] === "LESExchange") {
                formattedCollection?.push("LES Exchange");
              }
            }
            if (collectionSelected[0] !== "none") {
              setCollectionSelect(formattedCollection);
            }
          }
          // check if style is before sex and collection is after sex
        } else if (
          router.asPath.split("?sex=")[0].includes("?style=") &&
          router.asPath.split("?sex=")[1].includes("?collection=")
        ) {
          const sexSelected: string[] = router.asPath
            .split("?sex=")[1]
            .split("?collection")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const styleSelected: string[] = router.asPath
            .split("?style=")[1]
            .split("?sex=")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const collectionSelected: string[] = router.asPath
            .split("?collection=")[1]
            .split("/#shopping")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");
          if (router.asPath.includes("Jid%C5%8DkaImprint")) {
            const index: number = lodash.findIndex(
              router.asPath
                .split("?collection=")[1]
                .split("/#shopping")[0]
                .replaceAll("-", " ")
                .trim()
                .split(" "),
              (item) => item === "Jid%C5%8DkaImprint"
            );
            collectionSelected[index] = "Jidōka Imprint";
          }

          let formattedStyle: string[] = [];
          for (let i: number = 0; i < styleSelected.length; i++) {
            if (
              styleSelected[i] !== "DIYBrutalism" &&
              styleSelected[i] !== "LoFiTechWear"
            ) {
              formattedStyle?.push(
                styleSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (styleSelected[i] === "DIYBrutalism") {
              formattedStyle?.push("DIY Brutalism");
            } else if (styleSelected[i] === "LoFiTechWear") {
              formattedStyle?.push("LoFi Tech Wear");
            }
          }

          if (styleSelected[0] !== "none") {
            setStyleSelect(formattedStyle);
          }
          if (sexSelected[0] !== "none") {
            setSexSelect(sexSelected);
          }

          let formattedCollection: string[] = [];
          for (let i: number = 0; i < collectionSelected.length; i++) {
            if (
              collectionSelected[i] !== "MEVOverride" &&
              collectionSelected[i] !== "LoFiSynthwear" &&
              collectionSelected[i] !== "Jidōka Imprint" &&
              collectionSelected[i] !== "LESExchange"
            ) {
              formattedCollection?.push(
                collectionSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (collectionSelected[i] === "MEVOverride") {
              formattedCollection?.push("MEV Override");
            } else if (collectionSelected[i] === "LoFiSynthwear") {
              formattedCollection?.push("LoFi Synthwear");
            } else if (collectionSelected[i] === "Jidōka Imprint") {
              formattedCollection?.push("Jidōka Imprint");
            } else if (collectionSelected[i] === "LESExchange") {
              formattedCollection?.push("LES Exchange");
            }
          }
          if (collectionSelected[0] !== "none") {
            setCollectionSelect(formattedCollection);
          }
        }
        // check if collection is before sex and style is after sex
        else if (
          router.asPath.split("?sex=")[1].includes("?style=") &&
          router.asPath.split("?sex=")[0].includes("?collection=")
        ) {
          const sexSelected: string[] = router.asPath
            .split("?sex=")[1]
            .split("?style")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const styleSelected: string[] = router.asPath
            .split("?style=")[1]
            .split("/#shopping")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const collectionSelected: string[] = router.asPath
            .split("?collection=")[1]
            .split("?sex=")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");
          if (router.asPath.includes("Jid%C5%8DkaImprint")) {
            const index: number = lodash.findIndex(
              router.asPath
                .split("?collection=")[1]
                .split("/#shopping")[0]
                .replaceAll("-", " ")
                .trim()
                .split(" "),
              (item) => item === "Jid%C5%8DkaImprint"
            );
            collectionSelected[index] = "Jidōka Imprint";
          }

          let formattedStyle: string[] = [];
          for (let i: number = 0; i < styleSelected.length; i++) {
            if (
              styleSelected[i] !== "DIYBrutalism" &&
              styleSelected[i] !== "LoFiTechWear"
            ) {
              formattedStyle?.push(
                styleSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (styleSelected[i] === "DIYBrutalism") {
              formattedStyle?.push("DIY Brutalism");
            } else if (styleSelected[i] === "LoFiTechWear") {
              formattedStyle?.push("LoFi Tech Wear");
            }
          }

          if (styleSelected[0] !== "none") {
            setStyleSelect(formattedStyle);
          }
          if (sexSelected[0] !== "none") {
            setSexSelect(sexSelected);
          }

          let formattedCollection: string[] = [];
          for (let i: number = 0; i < collectionSelected.length; i++) {
            if (
              collectionSelected[i] !== "MEVOverride" &&
              collectionSelected[i] !== "LoFiSynthwear" &&
              collectionSelected[i] !== "Jidōka Imprint" &&
              collectionSelected[i] !== "LESExchange"
            ) {
              formattedCollection?.push(
                collectionSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (collectionSelected[i] === "MEVOverride") {
              formattedCollection?.push("MEV Override");
            } else if (collectionSelected[i] === "LoFiSynthwear") {
              formattedCollection?.push("LoFi Synthwear");
            } else if (collectionSelected[i] === "Jidōka Imprint") {
              formattedCollection?.push("Jidōka Imprint");
            } else if (collectionSelected[i] === "LESExchange") {
              formattedCollection?.push("LES Exchange");
            }
          }
          if (collectionSelected[0] !== "none") {
            setCollectionSelect(formattedCollection);
          }
        }
      }
    }

    if (router.asPath.includes("?collection=")) {
      // only collection exists
      if (
        !router.asPath.includes("?sex=") &&
        !router.asPath.includes("?style=")
      ) {
        const collectionsSelected = router.asPath
          .split("?collection=")[1]
          .split("/#shopping")[0]
          .replaceAll("-", " ")
          .trim()
          .split(" ");
        if (router.asPath.includes("Jid%C5%8DkaImprint")) {
          const index: number = lodash.findIndex(
            router.asPath
              .split("?collection=")[1]
              .split("/#shopping")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" "),
            (item) => item === "Jid%C5%8DkaImprint"
          );
          collectionsSelected[index] = "Jidōka Imprint";
        }

        let formattedCollection: string[] = [];
        for (let i: number = 0; i < collectionsSelected.length; i++) {
          if (
            collectionsSelected[i] !== "MEVOverride" &&
            collectionsSelected[i] !== "LoFiSynthwear" &&
            collectionsSelected[i] !== "Jidōka Imprint" &&
            collectionsSelected[i] !== "LESExchange"
          ) {
            formattedCollection?.push(
              collectionsSelected[i]
                ?.match(/[A-Z][a-z]+|[0-9]+/g)
                ?.join(" ") as string
            );
          } else if (collectionsSelected[i] === "MEVOverride") {
            formattedCollection?.push("MEV Override");
          } else if (collectionsSelected[i] === "LoFiSynthwear") {
            formattedCollection?.push("LoFi Synthwear");
          } else if (collectionsSelected[i] === "Jidōka Imprint") {
            formattedCollection?.push("Jidōka Imprint");
          } else if (collectionsSelected[i] === "LESExchange") {
            formattedCollection?.push("LES Exchange");
          }
        }
        if (collectionsSelected[0] !== "none") {
          setCollectionSelect(formattedCollection);
        }
      } else if (
        router.asPath.includes("?style=") &&
        !router.asPath.includes("?sex=")
      ) {
        // check if style is after collection
        if (router.asPath.split("?collection=")[1].includes("?style=")) {
          const collectionSelected: string[] = router.asPath
            .split("?collection=")[1]
            .split("?style")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");
          if (router.asPath.includes("Jid%C5%8DkaImprint")) {
            const index: number = lodash.findIndex(
              router.asPath
                .split("?collection=")[1]
                .split("/#shopping")[0]
                .replaceAll("-", " ")
                .trim()
                .split(" "),
              (item) => item === "Jid%C5%8DkaImprint"
            );
            collectionSelected[index] = "Jidōka Imprint";
          }

          const styleSelected: string[] = router.asPath
            .split("?collection=")[1]
            .split("?style")[1]
            .split("/#shopping")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          let formattedCollection: string[] = [];
          for (let i: number = 0; i < collectionSelected.length; i++) {
            if (
              collectionSelected[i] !== "MEVOverride" &&
              collectionSelected[i] !== "LoFiSynthwear" &&
              collectionSelected[i] !== "Jidōka Imprint" &&
              collectionSelected[i] !== "LESExchange"
            ) {
              formattedCollection?.push(
                collectionSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (collectionSelected[i] === "MEVOverride") {
              formattedCollection?.push("MEV Override");
            } else if (collectionSelected[i] === "LoFiSynthwear") {
              formattedCollection?.push("LoFi Synthwear");
            } else if (collectionSelected[i] === "Jidōka Imprint") {
              formattedCollection?.push("Jidōka Imprint");
            } else if (collectionSelected[i] === "LESExchange") {
              formattedCollection?.push("LES Exchange");
            }
          }
          if (collectionSelected[0] !== "none") {
            setCollectionSelect(formattedCollection);
          }
          let formattedStyle: string[] = [];
          for (let i: number = 0; i < styleSelected.length; i++) {
            if (
              styleSelected[i] !== "DIYBrutalism" &&
              styleSelected[i] !== "LoFiTechWear"
            ) {
              formattedStyle?.push(
                styleSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (styleSelected[i] === "DIYBrutalism") {
              formattedStyle?.push("DIY Brutalism");
            } else if (styleSelected[i] === "LoFiTechWear") {
              formattedStyle?.push("LoFi Tech Wear");
            }
          }

          if (styleSelected[0] !== "none") {
            setStyleSelect(formattedStyle);
          }
        }
        // check if style is before collection
        else {
          const collectionSelected: string[] = router.asPath
            .split("?collection=")[1]
            .split("/#shopping")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          if (router.asPath.includes("Jid%C5%8DkaImprint")) {
            const index: number = lodash.findIndex(
              router.asPath
                .split("?collection=")[1]
                .split("/#shopping")[0]
                .replaceAll("-", " ")
                .trim()
                .split(" "),
              (item) => item === "Jid%C5%8DkaImprint"
            );
            collectionSelected[index] = "Jidōka Imprint";
          }

          const styleSelected: string[] = router.asPath
            .split("?style=")[1]
            .split("?collection")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          let formattedCollection: string[] = [];
          for (let i: number = 0; i < collectionSelected.length; i++) {
            if (
              collectionSelected[i] !== "MEVOverride" &&
              collectionSelected[i] !== "LoFiSynthwear" &&
              collectionSelected[i] !== "Jidōka Imprint" &&
              collectionSelected[i] !== "LESExchange"
            ) {
              formattedCollection?.push(
                collectionSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (collectionSelected[i] === "MEVOverride") {
              formattedCollection?.push("MEV Override");
            } else if (collectionSelected[i] === "LoFiSynthwear") {
              formattedCollection?.push("LoFi Synthwear");
            } else if (collectionSelected[i] === "Jidōka Imprint") {
              formattedCollection?.push("Jidōka Imprint");
            } else if (collectionSelected[i] === "LESExchange") {
              formattedCollection?.push("LES Exchange");
            }
          }
          if (collectionSelected[0] !== "none") {
            setCollectionSelect(formattedCollection);
          }
          let formattedStyle: string[] = [];
          for (let i: number = 0; i < styleSelected.length; i++) {
            if (
              styleSelected[i] !== "DIYBrutalism" &&
              styleSelected[i] !== "LoFiTechWear"
            ) {
              formattedStyle?.push(
                styleSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (styleSelected[i] === "DIYBrutalism") {
              formattedStyle?.push("DIY Brutalism");
            } else if (styleSelected[i] === "LoFiTechWear") {
              formattedStyle?.push("LoFi Tech Wear");
            }
          }

          if (styleSelected[0] !== "none") {
            setStyleSelect(formattedStyle);
          }
        }
      } else if (
        !router.asPath.includes("?style=") &&
        router.asPath.includes("?sex=")
      ) {
        // check if sex is after collection
        if (router.asPath.split("?collection=")[1].includes("?sex=")) {
          const sexSelected: string[] = router.asPath
            .split("?sex=")[1]
            .split("/#shopping")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const collectionSelected: string[] = router.asPath
            .split("?collection=")[1]
            .split("?sex=")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          if (router.asPath.includes("Jid%C5%8DkaImprint")) {
            const index: number = lodash.findIndex(
              router.asPath
                .split("?collection=")[1]
                .split("/#shopping")[0]
                .replaceAll("-", " ")
                .trim()
                .split(" "),
              (item) => item === "Jid%C5%8DkaImprint"
            );
            collectionSelected[index] = "Jidōka Imprint";
          }

          let formattedCollection: string[] = [];
          for (let i: number = 0; i < collectionSelected.length; i++) {
            if (
              collectionSelected[i] !== "MEVOverride" &&
              collectionSelected[i] !== "LoFiSynthwear" &&
              collectionSelected[i] !== "Jidōka Imprint" &&
              collectionSelected[i] !== "LESExchange"
            ) {
              formattedCollection?.push(
                collectionSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (collectionSelected[i] === "MEVOverride") {
              formattedCollection?.push("MEV Override");
            } else if (collectionSelected[i] === "LoFiSynthwear") {
              formattedCollection?.push("LoFi Synthwear");
            } else if (collectionSelected[i] === "Jidōka Imprint") {
              formattedCollection?.push("Jidōka Imprint");
            } else if (collectionSelected[i] === "LESExchange") {
              formattedCollection?.push("LES Exchange");
            }
          }
          if (collectionSelected[0] !== "none") {
            setCollectionSelect(formattedCollection);
          }
          if (sexSelected[0] !== "none") {
            setSexSelect(sexSelected);
          }
        }
        // check if sex is before collection
        else {
          const collectionSelected: string[] = router.asPath
            .split("?collection=")[1]
            .split("/#shopping")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");
          if (router.asPath.includes("Jid%C5%8DkaImprint")) {
            const index: number = lodash.findIndex(
              router.asPath
                .split("?collection=")[1]
                .split("/#shopping")[0]
                .replaceAll("-", " ")
                .trim()
                .split(" "),
              (item) => item === "Jid%C5%8DkaImprint"
            );
            collectionSelected[index] = "Jidōka Imprint";
          }

          const sexSelected: string[] = router.asPath
            .split("?collection=")[0]
            .split("?sex=")[1]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          let formattedCollection: string[] = [];
          for (let i: number = 0; i < collectionSelected.length; i++) {
            if (
              collectionSelected[i] !== "MEVOverride" &&
              collectionSelected[i] !== "LoFiSynthwear" &&
              collectionSelected[i] !== "Jidōka Imprint" &&
              collectionSelected[i] !== "LESExchange"
            ) {
              formattedCollection?.push(
                collectionSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (collectionSelected[i] === "MEVOverride") {
              formattedCollection?.push("MEV Override");
            } else if (collectionSelected[i] === "LoFiSynthwear") {
              formattedCollection?.push("LoFi Synthwear");
            } else if (collectionSelected[i] === "Jidōka Imprint") {
              formattedCollection?.push("Jidōka Imprint");
            } else if (collectionSelected[i] === "LESExchange") {
              formattedCollection?.push("LES Exchange");
            }
          }
          if (collectionSelected[0] !== "none") {
            setCollectionSelect(formattedCollection);
          }
          if (sexSelected[0] !== "none") {
            setSexSelect(sexSelected);
          }
        }
      } else if (
        router.asPath.includes("?sex=") &&
        router.asPath.includes("?style=")
      ) {
        // check if style and sex are after collection
        if (
          router.asPath.split("?collection=")[1].includes("?style=") &&
          router.asPath.split("?collection=")[1].includes("?sex=")
        ) {
          // check if sex is at the very end
          if (
            router.asPath
              .split("?collection=")[1]
              .split("?style=")[1]
              .includes("?sex=")
          ) {
            const sexSelected: string[] = router.asPath
              .split("?sex=")[1]
              .split("/#shopping")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const styleSelected: string[] = router.asPath
              .split("?style=")[1]
              .split("?sex=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const collectionSelected: string[] = router.asPath
              .split("?collection=")[1]
              .split("?style=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");
            if (router.asPath.includes("Jid%C5%8DkaImprint")) {
              const index: number = lodash.findIndex(
                router.asPath
                  .split("?collection=")[1]
                  .split("/#shopping")[0]
                  .replaceAll("-", " ")
                  .trim()
                  .split(" "),
                (item) => item === "Jid%C5%8DkaImprint"
              );
              collectionSelected[index] = "Jidōka Imprint";
            }

            let formattedStyle: string[] = [];
            for (let i: number = 0; i < styleSelected.length; i++) {
              if (
                styleSelected[i] !== "DIYBrutalism" &&
                styleSelected[i] !== "LoFiTechWear"
              ) {
                formattedStyle?.push(
                  styleSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (styleSelected[i] === "DIYBrutalism") {
                formattedStyle?.push("DIY Brutalism");
              } else if (styleSelected[i] === "LoFiTechWear") {
                formattedStyle?.push("LoFi Tech Wear");
              }
            }

            if (styleSelected[0] !== "none") {
              setStyleSelect(formattedStyle);
            }
            if (sexSelected[0] !== "none") {
              setSexSelect(sexSelected);
            }

            let formattedCollection: string[] = [];
            for (let i: number = 0; i < collectionSelected.length; i++) {
              if (
                collectionSelected[i] !== "MEVOverride" &&
                collectionSelected[i] !== "LoFiSynthwear" &&
                collectionSelected[i] !== "Jidōka Imprint" &&
                collectionSelect[i] !== "LESExchange"
              ) {
                formattedCollection?.push(
                  collectionSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (collectionSelected[i] === "MEVOverride") {
                formattedCollection?.push("MEV Override");
              } else if (collectionSelected[i] === "LoFiSynthwear") {
                formattedCollection?.push("LoFi Synthwear");
              } else if (collectionSelected[i] === "Jidōka Imprint") {
                formattedCollection?.push("Jidōka Imprint");
              } else if (collectionSelected[i] === "LESExchange") {
                formattedCollection?.push("LES Exchange");
              }
            }
            if (collectionSelected[0] !== "none") {
              setCollectionSelect(formattedCollection);
            }
          }
          // check style at the very end
          else {
            const sexSelected: string[] = router.asPath
              .split("?sex=")[1]
              .split("?style=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const collectionSelected: string[] = router.asPath
              .split("?collection=")[1]
              .split("?sex=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");
            if (router.asPath.includes("Jid%C5%8DkaImprint")) {
              const index: number = lodash.findIndex(
                router.asPath
                  .split("?collection=")[1]
                  .split("/#shopping")[0]
                  .replaceAll("-", " ")
                  .trim()
                  .split(" "),
                (item) => item === "Jid%C5%8DkaImprint"
              );
              collectionSelected[index] = "Jidōka Imprint";
            }

            const styleSelected: string[] = router.asPath
              .split("?style=")[1]
              .split("/#shopping")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            let formattedStyle: string[] = [];
            for (let i: number = 0; i < styleSelected.length; i++) {
              if (
                styleSelected[i] !== "DIYBrutalism" &&
                styleSelected[i] !== "LoFiTechWear"
              ) {
                formattedStyle?.push(
                  styleSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (styleSelected[i] === "DIYBrutalism") {
                formattedStyle?.push("DIY Brutalism");
              } else if (styleSelected[i] === "LoFiTechWear") {
                formattedStyle?.push("LoFi Tech Wear");
              }
            }

            if (styleSelected[0] !== "none") {
              setStyleSelect(formattedStyle);
            }
            if (sexSelected[0] !== "none") {
              setSexSelect(sexSelected);
            }

            let formattedCollection: string[] = [];
            for (let i: number = 0; i < collectionSelected.length; i++) {
              if (
                collectionSelected[i] !== "MEVOverride" &&
                collectionSelected[i] !== "LoFiSynthwear" &&
                collectionSelected[i] !== "Jidōka Imprint" &&
                collectionSelected[i] !== "LESExchange"
              ) {
                formattedCollection?.push(
                  collectionSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (collectionSelected[i] === "MEVOverride") {
                formattedCollection?.push("MEV Override");
              } else if (collectionSelected[i] === "LoFiSynthwear") {
                formattedCollection?.push("LoFi Synthwear");
              } else if (collectionSelected[i] === "Jidōka Imprint") {
                formattedCollection?.push("Jidōka Imprint");
              } else if (collectionSelected[i] === "LESExchange") {
                formattedCollection?.push("LES Exchange");
              }
            }
            if (collectionSelected[0] !== "none") {
              setCollectionSelect(formattedCollection);
            }
          }
        }
        // check if style and sex are before collection
        else if (
          router.asPath.split("?collection=")[0].includes("?style=") &&
          router.asPath.split("?collection=")[0].includes("?sex=")
        ) {
          // check if sex is at the very start
          if (router.asPath.split("?sex=")[1].includes("?style=")) {
            const sexSelected: string[] = router.asPath
              .split("?sex=")[1]
              .split("?style=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const styleSelected: string[] = router.asPath
              .split("?sex=")[1]
              .split("?collection=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const collectionSelected: string[] = router.asPath
              .split("?collection=")[1]
              .split("/#shopping")[1]
              .replaceAll("-", " ")
              .trim()
              .split(" ");
            if (router.asPath.includes("Jid%C5%8DkaImprint")) {
              const index: number = lodash.findIndex(
                router.asPath
                  .split("?collection=")[1]
                  .split("/#shopping")[0]
                  .replaceAll("-", " ")
                  .trim()
                  .split(" "),
                (item) => item === "Jid%C5%8DkaImprint"
              );
              collectionSelected[index] = "Jidōka Imprint";
            }

            let formattedStyle: string[] = [];
            for (let i: number = 0; i < styleSelected.length; i++) {
              if (
                styleSelected[i] !== "DIYBrutalism" &&
                styleSelected[i] !== "LoFiTechWear"
              ) {
                formattedStyle?.push(
                  styleSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (styleSelected[i] === "DIYBrutalism") {
                formattedStyle?.push("DIY Brutalism");
              } else if (styleSelected[i] === "LoFiTechWear") {
                formattedStyle?.push("LoFi Tech Wear");
              }
            }

            if (styleSelected[0] !== "none") {
              setStyleSelect(formattedStyle);
            }
            if (sexSelected[0] !== "none") {
              setSexSelect(sexSelected);
            }

            let formattedCollection: string[] = [];
            for (let i: number = 0; i < collectionSelected.length; i++) {
              if (
                collectionSelected[i] !== "MEVOverride" &&
                collectionSelected[i] !== "LoFiSynthwear" &&
                collectionSelected[i] !== "Jidōka Imprint" &&
                collectionSelected[i] !== "LESExchange"
              ) {
                formattedCollection?.push(
                  collectionSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (collectionSelected[i] === "MEVOverride") {
                formattedCollection?.push("MEV Override");
              } else if (collectionSelected[i] === "LoFiSynthwear") {
                formattedCollection?.push("LoFi Synthwear");
              } else if (collectionSelected[i] === "Jidōka Imprint") {
                formattedCollection?.push("Jidōka Imprint");
              } else if (collectionSelected[i] === "LESExchange") {
                formattedCollection?.push("LES Exchange");
              }
            }
            if (collectionSelected[0] !== "none") {
              setCollectionSelect(formattedCollection);
            }
          }
          // check style at the very start
          else {
            const sexSelected: string[] = router.asPath
              .split("?sex=")[1]
              .split("?collection=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const styleSelected: string[] = router.asPath
              .split("?style=")[1]
              .split("?sex=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const collectionSelected: string[] = router.asPath
              .split("?collection=")[1]
              .split("/#shopping")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");
            if (router.asPath.includes("Jid%C5%8DkaImprint")) {
              const index: number = lodash.findIndex(
                router.asPath
                  .split("?collection=")[1]
                  .split("/#shopping")[0]
                  .replaceAll("-", " ")
                  .trim()
                  .split(" "),
                (item) => item === "Jid%C5%8DkaImprint"
              );
              collectionSelected[index] = "Jidōka Imprint";
            }

            let formattedStyle: string[] = [];
            for (let i: number = 0; i < styleSelected.length; i++) {
              if (
                styleSelected[i] !== "DIYBrutalism" &&
                styleSelected[i] !== "LoFiTechWear"
              ) {
                formattedStyle?.push(
                  styleSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (styleSelected[i] === "DIYBrutalism") {
                formattedStyle?.push("DIY Brutalism");
              } else if (styleSelected[i] === "LoFiTechWear") {
                formattedStyle?.push("LoFi Tech Wear");
              }
            }

            if (styleSelected[0] !== "none") {
              setStyleSelect(formattedStyle);
            }
            if (sexSelected[0] !== "none") {
              setSexSelect(sexSelected);
            }

            let formattedCollection: string[] = [];
            for (let i: number = 0; i < collectionSelected.length; i++) {
              if (
                collectionSelected[i] !== "MEVOverride" &&
                collectionSelected[i] !== "LoFiSynthwear" &&
                collectionSelected[i] !== "Jidōka Imprint" &&
                collectionSelected[i] !== "LESExchange"
              ) {
                formattedCollection?.push(
                  collectionSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (collectionSelected[i] === "MEVOverride") {
                formattedCollection?.push("MEV Override");
              } else if (collectionSelected[i] === "LoFiSynthwear") {
                formattedCollection?.push("LoFi Synthwear");
              } else if (collectionSelected[i] === "Jidōka Imprint") {
                formattedCollection?.push("Jidōka Imprint");
              } else if (collectionSelected[i] === "LESExchange") {
                formattedCollection?.push("LES Exchange");
              }
            }
            if (collectionSelected[0] !== "none") {
              setCollectionSelect(formattedCollection);
            }
          }
          // check if style is before collection and sex is after collection
        } else if (
          router.asPath.split("?collection=")[0].includes("?style=") &&
          router.asPath.split("?collection=")[1].includes("?sex=")
        ) {
          const sexSelected: string[] = router.asPath
            .split("?sex=")[1]
            .split("/#shopping")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const styleSelected: string[] = router.asPath
            .split("?style=")[1]
            .split("?collection=")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const collectionSelected: string[] = router.asPath
            .split("?collection=")[1]
            .split("?sex=")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");
          if (router.asPath.includes("Jid%C5%8DkaImprint")) {
            const index: number = lodash.findIndex(
              router.asPath
                .split("?collection=")[1]
                .split("/#shopping")[0]
                .replaceAll("-", " ")
                .trim()
                .split(" "),
              (item) => item === "Jid%C5%8DkaImprint"
            );
            collectionSelected[index] = "Jidōka Imprint";
          }

          let formattedStyle: string[] = [];
          for (let i: number = 0; i < styleSelected.length; i++) {
            if (
              styleSelected[i] !== "DIYBrutalism" &&
              styleSelected[i] !== "LoFiTechWear"
            ) {
              formattedStyle?.push(
                styleSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (styleSelected[i] === "DIYBrutalism") {
              formattedStyle?.push("DIY Brutalism");
            } else if (styleSelected[i] === "LoFiTechWear") {
              formattedStyle?.push("LoFi Tech Wear");
            }
          }

          if (styleSelected[0] !== "none") {
            setStyleSelect(formattedStyle);
          }
          if (sexSelected[0] !== "none") {
            setSexSelect(sexSelected);
          }

          let formattedCollection: string[] = [];
          for (let i: number = 0; i < collectionSelected.length; i++) {
            if (
              collectionSelected[i] !== "MEVOverride" &&
              collectionSelected[i] !== "LoFiSynthwear" &&
              collectionSelected[i] !== "Jidōka Imprint" &&
              collectionSelected[i] !== "LESExchange"
            ) {
              formattedCollection?.push(
                collectionSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (collectionSelected[i] === "MEVOverride") {
              formattedCollection?.push("MEV Override");
            } else if (collectionSelected[i] === "LoFiSynthwear") {
              formattedCollection?.push("LoFi Synthwear");
            } else if (collectionSelected[i] === "Jidōka Imprint") {
              formattedCollection?.push("Jidōka Imprint");
            } else if (collectionSelected[i] === "LESExchange") {
              formattedCollection?.push("LES Exchange");
            }
          }
          if (collectionSelected[0] !== "none") {
            setCollectionSelect(formattedCollection);
          }
        }
        // check if sex is before collection and style is after collection
        else if (
          router.asPath.split("?collection=")[1].includes("?style=") &&
          router.asPath.split("?collection=")[0].includes("?sex=")
        ) {
          const sexSelected: string[] = router.asPath
            .split("?sex=")[1]
            .split("?collection")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const styleSelected: string[] = router.asPath
            .split("?style=")[1]
            .split("/#shopping")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const collectionSelected: string[] = router.asPath
            .split("?collection=")[1]
            .split("?style=")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");
          if (router.asPath.includes("Jid%C5%8DkaImprint")) {
            const index: number = lodash.findIndex(
              router.asPath
                .split("?collection=")[1]
                .split("/#shopping")[0]
                .replaceAll("-", " ")
                .trim()
                .split(" "),
              (item) => item === "Jid%C5%8DkaImprint"
            );
            collectionSelected[index] = "Jidōka Imprint";
          }

          let formattedStyle: string[] = [];
          for (let i: number = 0; i < styleSelected.length; i++) {
            if (
              styleSelected[i] !== "DIYBrutalism" &&
              styleSelected[i] !== "LoFiTechWear"
            ) {
              formattedStyle?.push(
                styleSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (styleSelected[i] === "DIYBrutalism") {
              formattedStyle?.push("DIY Brutalism");
            } else if (styleSelected[i] === "LoFiTechWear") {
              formattedStyle?.push("LoFi Tech Wear");
            }
          }

          if (styleSelected[0] !== "none") {
            setStyleSelect(formattedStyle);
          }
          if (sexSelected[0] !== "none") {
            setSexSelect(sexSelected);
          }

          let formattedCollection: string[] = [];
          for (let i: number = 0; i < collectionSelected.length; i++) {
            if (
              collectionSelected[i] !== "MEVOverride" &&
              collectionSelected[i] !== "LoFiSynthwear" &&
              collectionSelected[i] !== "Jidōka Imprint" &&
              collectionSelected[i] !== "LESExchange"
            ) {
              formattedCollection?.push(
                collectionSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (collectionSelected[i] === "MEVOverride") {
              formattedCollection?.push("MEV Override");
            } else if (collectionSelected[i] === "LoFiSynthwear") {
              formattedCollection?.push("LoFi Synthwear");
            } else if (collectionSelected[i] === "Jidōka Imprint") {
              formattedCollection?.push("Jidōka Imprint");
            } else if (collectionSelected[i] === "LESExchange") {
              formattedCollection?.push("LES Exchange");
            }
          }
          if (collectionSelected[0] !== "none") {
            setCollectionSelect(formattedCollection);
          }
        }
      }
    }

    if (router.asPath.includes("?style=")) {
      // only style
      if (
        !router.asPath.includes("?collection=") &&
        !router.asPath.includes("?sex=")
      ) {
        const stylesSelected: string[] = router.asPath
          .split("?style=")[1]
          .split("/#shopping")[0]
          .replaceAll("-", " ")
          .trim()
          .split(" ");

        let formattedStyle: string[] = [];
        for (let i: number = 0; i < stylesSelected.length; i++) {
          if (
            stylesSelected[i] !== "DIYBrutalism" &&
            stylesSelected[i] !== "LoFiTechWear"
          ) {
            formattedStyle?.push(
              stylesSelected[i]
                ?.match(/[A-Z][a-z]+|[0-9]+/g)
                ?.join(" ") as string
            );
          } else if (stylesSelected[i] === "DIYBrutalism") {
            formattedStyle?.push("DIY Brutalism");
          } else if (stylesSelected[i] === "LoFiTechWear") {
            formattedStyle?.push("LoFi Tech Wear");
          }
        }

        if (stylesSelected[0] !== "none") {
          setStyleSelect(formattedStyle);
        }
      } else if (
        router.asPath.includes("?collection=") &&
        !router.asPath.includes("?sex=")
      ) {
        // check if collection is after style
        if (router.asPath.split("?style=")[1].includes("?collection=")) {
          const collectionSelected: string[] = router.asPath
            .split("?collection=")[1]
            .split("/#shopping")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");
          if (router.asPath.includes("Jid%C5%8DkaImprint")) {
            const index: number = lodash.findIndex(
              router.asPath
                .split("?collection=")[1]
                .split("/#shopping")[0]
                .replaceAll("-", " ")
                .trim()
                .split(" "),
              (item) => item === "Jid%C5%8DkaImprint"
            );
            collectionSelected[index] = "Jidōka Imprint";
          }

          const styleSelected: string[] = router.asPath
            .split("?style=")[1]
            .split("?collection")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          let formattedCollection: string[] = [];
          for (let i: number = 0; i < collectionSelected.length; i++) {
            if (
              collectionSelected[i] !== "MEVOverride" &&
              collectionSelected[i] !== "LoFiSynthwear" &&
              collectionSelected[i] !== "Jidōka Imprint" &&
              collectionSelected[i] !== "LESExchange"
            ) {
              formattedCollection?.push(
                collectionSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (collectionSelected[i] === "MEVOverride") {
              formattedCollection?.push("MEV Override");
            } else if (collectionSelected[i] === "LoFiSynthwear") {
              formattedCollection?.push("LoFi Synthwear");
            } else if (collectionSelected[i] === "Jidōka Imprint") {
              formattedCollection?.push("Jidōka Imprint");
            } else if (collectionSelected[i] === "LESExchange") {
              formattedCollection?.push("LES Exchange");
            }
          }
          if (collectionSelected[0] !== "none") {
            setCollectionSelect(formattedCollection);
          }
          let formattedStyle: string[] = [];
          for (let i: number = 0; i < styleSelected.length; i++) {
            if (
              styleSelected[i] !== "DIYBrutalism" &&
              styleSelected[i] !== "LoFiTechWear"
            ) {
              formattedStyle?.push(
                styleSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (styleSelected[i] === "DIYBrutalism") {
              formattedStyle?.push("DIY Brutalism");
            } else if (styleSelected[i] === "LoFiTechWear") {
              formattedStyle?.push("LoFi Tech Wear");
            }
          }

          if (styleSelected[0] !== "none") {
            setStyleSelect(formattedStyle);
          }
        }
        // check if collection is before style
        else {
          const collectionSelected: string[] = router.asPath
            .split("?collection=")[1]
            .split("?style=")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");
          if (router.asPath.includes("Jid%C5%8DkaImprint")) {
            const index: number = lodash.findIndex(
              router.asPath
                .split("?collection=")[1]
                .split("/#shopping")[0]
                .replaceAll("-", " ")
                .trim()
                .split(" "),
              (item) => item === "Jid%C5%8DkaImprint"
            );
            collectionSelected[index] = "Jidōka Imprint";
          }

          const styleSelected: string[] = router.asPath
            .split("?style=")[1]
            .split("/#shopping")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          let formattedCollection: string[] = [];
          for (let i: number = 0; i < collectionSelected.length; i++) {
            if (
              collectionSelected[i] !== "MEVOverride" &&
              collectionSelected[i] !== "LoFiSynthwear" &&
              collectionSelected[i] !== "Jidōka Imprint" &&
              collectionSelected[i] !== "LESExchange"
            ) {
              formattedCollection?.push(
                collectionSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (collectionSelected[i] === "MEVOverride") {
              formattedCollection?.push("MEV Override");
            } else if (collectionSelected[i] === "LoFiSynthwear") {
              formattedCollection?.push("LoFi Synthwear");
            } else if (collectionSelected[i] === "Jidōka Imprint") {
              formattedCollection?.push("Jidōka Imprint");
            } else if (collectionSelected[i] === "LESExchange") {
              formattedCollection?.push("LES Exchange");
            }
          }
          if (collectionSelected[0] !== "none") {
            setCollectionSelect(formattedCollection);
          }
          let formattedStyle: string[] = [];
          for (let i: number = 0; i < styleSelected.length; i++) {
            if (
              styleSelected[i] !== "DIYBrutalism" &&
              styleSelected[i] !== "LoFiTechWear"
            ) {
              formattedStyle?.push(
                styleSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (styleSelected[i] === "DIYBrutalism") {
              formattedStyle?.push("DIY Brutalism");
            } else if (styleSelected[i] === "LoFiTechWear") {
              formattedStyle?.push("LoFi Tech Wear");
            }
          }

          if (styleSelected[0] !== "none") {
            setStyleSelect(formattedStyle);
          }
        }
      } else if (
        !router.asPath.includes("?style=") &&
        router.asPath.includes("?sex=")
      ) {
        // check if sex is after style
        if (router.asPath.split("?style=")[1].includes("?sex=")) {
          const sexSelected: string[] = router.asPath
            .split("?sex=")[1]
            .split("/#shopping")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const styleSelected: string[] = router.asPath
            .split("?style=")[1]
            .split("?sex=")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          let formattedStyle: string[] = [];
          for (let i: number = 0; i < styleSelected.length; i++) {
            if (
              styleSelected[i] !== "DIYBrutalism" &&
              styleSelected[i] !== "LoFiTechWear"
            ) {
              formattedStyle?.push(
                styleSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (styleSelected[i] === "DIYBrutalism") {
              formattedStyle?.push("DIY Brutalism");
            } else if (styleSelected[i] === "LoFiTechWear") {
              formattedStyle?.push("LoFi Tech Wear");
            }
          }

          if (styleSelected[0] !== "none") {
            setStyleSelect(formattedStyle);
          }
          if (sexSelected[0] !== "none") {
            setSexSelect(sexSelected);
          }
        }
        // check if sex is before style
        else {
          const styleSelected: string[] = router.asPath
            .split("?style=")[1]
            .split("/#shopping")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const sexSelected: string[] = router.asPath
            .split("?sex=")[1]
            .split("?style")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          let formattedStyle: string[] = [];
          for (let i: number = 0; i < styleSelected.length; i++) {
            if (
              styleSelected[i] !== "DIYBrutalism" &&
              styleSelected[i] !== "LoFiTechWear"
            ) {
              formattedStyle?.push(
                styleSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (styleSelected[i] === "DIYBrutalism") {
              formattedStyle?.push("DIY Brutalism");
            } else if (styleSelected[i] === "LoFiTechWear") {
              formattedStyle?.push("LoFi Tech Wear");
            }
          }
          if (styleSelected[0] !== "none") {
            setCollectionSelect(formattedStyle);
          }
          if (sexSelected[0] !== "none") {
            setSexSelect(sexSelected);
          }
        }
      } else if (
        router.asPath.includes("?sex=") &&
        router.asPath.includes("?collection=")
      ) {
        // check if collection and sex are after style
        if (
          router.asPath.split("?style=")[1].includes("?collection=") &&
          router.asPath.split("?style=")[1].includes("?sex=")
        ) {
          // check if sex is at the very end
          if (
            router.asPath
              .split("?style=")[1]
              .split("?collection=")[1]
              .includes("?sex=")
          ) {
            const sexSelected: string[] = router.asPath
              .split("?sex=")[1]
              .split("/#shopping")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const styleSelected: string[] = router.asPath
              .split("?style=")[1]
              .split("?collection=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const collectionSelected: string[] = router.asPath
              .split("?collection=")[1]
              .split("?sex=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");
            if (router.asPath.includes("Jid%C5%8DkaImprint")) {
              const index: number = lodash.findIndex(
                router.asPath
                  .split("?collection=")[1]
                  .split("/#shopping")[0]
                  .replaceAll("-", " ")
                  .trim()
                  .split(" "),
                (item) => item === "Jid%C5%8DkaImprint"
              );
              collectionSelected[index] = "Jidōka Imprint";
            }

            let formattedStyle: string[] = [];
            for (let i: number = 0; i < styleSelected.length; i++) {
              if (
                styleSelected[i] !== "DIYBrutalism" &&
                styleSelected[i] !== "LoFiTechWear"
              ) {
                formattedStyle?.push(
                  styleSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (styleSelected[i] === "DIYBrutalism") {
                formattedStyle?.push("DIY Brutalism");
              } else if (styleSelected[i] === "LoFiTechWear") {
                formattedStyle?.push("LoFi Tech Wear");
              }
            }

            if (styleSelected[0] !== "none") {
              setStyleSelect(formattedStyle);
            }
            if (sexSelected[0] !== "none") {
              setSexSelect(sexSelected);
            }

            let formattedCollection: string[] = [];
            for (let i: number = 0; i < collectionSelected.length; i++) {
              if (
                collectionSelected[i] !== "MEVOverride" &&
                collectionSelected[i] !== "LoFiSynthwear" &&
                collectionSelected[i] !== "Jidōka Imprint" &&
                collectionSelected[i] !== "LESExchange"
              ) {
                formattedCollection?.push(
                  collectionSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (collectionSelected[i] === "MEVOverride") {
                formattedCollection?.push("MEV Override");
              } else if (collectionSelected[i] === "LoFiSynthwear") {
                formattedCollection?.push("LoFi Synthwear");
              } else if (collectionSelected[i] === "Jidōka Imprint") {
                formattedCollection?.push("Jidōka Imprint");
              } else if (collectionSelected[i] === "LESExchange") {
                formattedCollection?.push("LES Exchange");
              }
            }
            if (collectionSelected[0] !== "none") {
              setCollectionSelect(formattedCollection);
            }
          }
          // check collection at the very end
          else {
            const sexSelected: string[] = router.asPath
              .split("?sex=")[1]
              .split("?collection=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const collectionSelected: string[] = router.asPath
              .split("?collection=")[1]
              .split("/#shopping")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");
            if (router.asPath.includes("Jid%C5%8DkaImprint")) {
              const index: number = lodash.findIndex(
                router.asPath
                  .split("?collection=")[1]
                  .split("/#shopping")[0]
                  .replaceAll("-", " ")
                  .trim()
                  .split(" "),
                (item) => item === "Jid%C5%8DkaImprint"
              );
              collectionSelected[index] = "Jidōka Imprint";
            }

            const styleSelected: string[] = router.asPath
              .split("?style=")[1]
              .split("?sex=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            let formattedStyle: string[] = [];
            for (let i: number = 0; i < styleSelected.length; i++) {
              if (
                styleSelected[i] !== "DIYBrutalism" &&
                styleSelected[i] !== "LoFiTechWear"
              ) {
                formattedStyle?.push(
                  styleSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (styleSelected[i] === "DIYBrutalism") {
                formattedStyle?.push("DIY Brutalism");
              } else if (styleSelected[i] === "LoFiTechWear") {
                formattedStyle?.push("LoFi Tech Wear");
              }
            }

            if (styleSelected[0] !== "none") {
              setStyleSelect(formattedStyle);
            }
            if (sexSelected[0] !== "none") {
              setSexSelect(sexSelected);
            }

            let formattedCollection: string[] = [];
            for (let i: number = 0; i < collectionSelected.length; i++) {
              if (
                collectionSelected[i] !== "MEVOverride" &&
                collectionSelected[i] !== "LoFiSynthwear" &&
                collectionSelected[i] !== "Jidōka Imprint" &&
                collectionSelected[i] !== "LESExchange"
              ) {
                formattedCollection?.push(
                  collectionSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (collectionSelected[i] === "MEVOverride") {
                formattedCollection?.push("MEV Override");
              } else if (collectionSelected[i] === "LoFiSynthwear") {
                formattedCollection?.push("LoFi Synthwear");
              } else if (collectionSelected[i] === "Jidōka Imprint") {
                formattedCollection?.push("Jidōka Imprint");
              } else if (collectionSelected[i] === "LESExchange") {
                formattedCollection?.push("LES Exchange");
              }
            }
            if (collectionSelected[0] !== "none") {
              setCollectionSelect(formattedCollection);
            }
          }
        }
        // check if style and sex are before style
        else if (
          router.asPath.split("?style=")[0].includes("?collection=") &&
          router.asPath.split("?style=")[0].includes("?sex=")
        ) {
          // check if sex is at the very start
          if (router.asPath.split("?sex=")[1].includes("?collection=")) {
            const sexSelected: string[] = router.asPath
              .split("?sex=")[1]
              .split("?collection=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const collectionSelected: string[] = router.asPath
              .split("?collection=")[1]
              .split("?style=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");
            if (router.asPath.includes("Jid%C5%8DkaImprint")) {
              const index: number = lodash.findIndex(
                router.asPath
                  .split("?collection=")[1]
                  .split("/#shopping")[0]
                  .replaceAll("-", " ")
                  .trim()
                  .split(" "),
                (item) => item === "Jid%C5%8DkaImprint"
              );
              collectionSelected[index] = "Jidōka Imprint";
            }

            const styleSelected: string[] = router.asPath
              .split("?style=")[1]
              .split("/#shopping")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            let formattedStyle: string[] = [];
            for (let i: number = 0; i < styleSelected.length; i++) {
              if (
                styleSelected[i] !== "DIYBrutalism" &&
                styleSelected[i] !== "LoFiTechWear"
              ) {
                formattedStyle?.push(
                  styleSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (styleSelected[i] === "DIYBrutalism") {
                formattedStyle?.push("DIY Brutalism");
              } else if (styleSelected[i] === "LoFiTechWear") {
                formattedStyle?.push("LoFi Tech Wear");
              }
            }

            if (styleSelected[0] !== "none") {
              setStyleSelect(formattedStyle);
            }
            if (sexSelected[0] !== "none") {
              setSexSelect(sexSelected);
            }

            let formattedCollection: string[] = [];
            for (let i: number = 0; i < collectionSelected.length; i++) {
              if (
                collectionSelected[i] !== "MEVOverride" &&
                collectionSelected[i] !== "LoFiSynthwear" &&
                collectionSelected[i] !== "Jidōka Imprint" &&
                collectionSelected[i] !== "LESExchange"
              ) {
                formattedCollection?.push(
                  collectionSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (collectionSelected[i] === "MEVOverride") {
                formattedCollection?.push("MEV Override");
              } else if (collectionSelected[i] === "LoFiSynthwear") {
                formattedCollection?.push("LoFi Synthwear");
              } else if (collectionSelected[i] === "Jidōka Imprint") {
                formattedCollection?.push("Jidōka Imprint");
              } else if (collectionSelected[i] === "LESExchange") {
                formattedCollection?.push("LES Exchange");
              }
            }
            if (collectionSelected[0] !== "none") {
              setCollectionSelect(formattedCollection);
            }
          }
          // check collection at the very start
          else {
            const sexSelected: string[] = router.asPath
              .split("?sex=")[1]
              .split("?style=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const styleSelected: string[] = router.asPath
              .split("?style=")[1]
              .split("/#shopping")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");

            const collectionSelected: string[] = router.asPath
              .split("?collection=")[1]
              .split("?sex=")[0]
              .replaceAll("-", " ")
              .trim()
              .split(" ");
            if (router.asPath.includes("Jid%C5%8DkaImprint")) {
              const index: number = lodash.findIndex(
                router.asPath
                  .split("?collection=")[1]
                  .split("/#shopping")[0]
                  .replaceAll("-", " ")
                  .trim()
                  .split(" "),
                (item) => item === "Jid%C5%8DkaImprint"
              );
              collectionSelected[index] = "Jidōka Imprint";
            }

            let formattedStyle: string[] = [];
            for (let i: number = 0; i < styleSelected.length; i++) {
              if (
                styleSelected[i] !== "DIYBrutalism" &&
                styleSelected[i] !== "LoFiTechWear"
              ) {
                formattedStyle?.push(
                  styleSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (styleSelected[i] === "DIYBrutalism") {
                formattedStyle?.push("DIY Brutalism");
              } else if (styleSelected[i] === "LoFiTechWear") {
                formattedStyle?.push("LoFi Tech Wear");
              }
            }

            if (styleSelected[0] !== "none") {
              setStyleSelect(formattedStyle);
            }
            if (sexSelected[0] !== "none") {
              setSexSelect(sexSelected);
            }

            let formattedCollection: string[] = [];
            for (let i: number = 0; i < collectionSelected.length; i++) {
              if (
                collectionSelected[i] !== "MEVOverride" &&
                collectionSelected[i] !== "LoFiSynthwear" &&
                collectionSelected[i] !== "Jidōka Imprint" &&
                collectionSelected[i] !== "LESExchange"
              ) {
                formattedCollection?.push(
                  collectionSelected[i]
                    ?.match(/[A-Z][a-z]+|[0-9]+/g)
                    ?.join(" ") as string
                );
              } else if (collectionSelected[i] === "MEVOverride") {
                formattedCollection?.push("MEV Override");
              } else if (collectionSelected[i] === "LoFiSynthwear") {
                formattedCollection?.push("LoFi Synthwear");
              } else if (collectionSelected[i] === "Jidōka Imprint") {
                formattedCollection?.push("Jidōka Imprint");
              } else if (collectionSelected[i] === "LESExchange") {
                formattedCollection?.push("LES Exchange");
              }
            }
            if (collectionSelected[0] !== "none") {
              setCollectionSelect(formattedCollection);
            }
          }
          // check if collection is before style and sex is after style
        } else if (
          router.asPath.split("?style=")[0].includes("?collection=") &&
          router.asPath.split("?style=")[1].includes("?sex=")
        ) {
          const sexSelected: string[] = router.asPath
            .split("?sex=")[1]
            .split("/#shopping")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const styleSelected: string[] = router.asPath
            .split("?style=")[1]
            .split("?sex=")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const collectionSelected: string[] = router.asPath
            .split("?collection=")[1]
            .split("?style=")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");
          if (router.asPath.includes("Jid%C5%8DkaImprint")) {
            const index: number = lodash.findIndex(
              router.asPath
                .split("?collection=")[1]
                .split("/#shopping")[0]
                .replaceAll("-", " ")
                .trim()
                .split(" "),
              (item) => item === "Jid%C5%8DkaImprint"
            );
            collectionSelected[index] = "Jidōka Imprint";
          }

          let formattedStyle: string[] = [];
          for (let i: number = 0; i < styleSelected.length; i++) {
            if (
              styleSelected[i] !== "DIYBrutalism" &&
              styleSelected[i] !== "LoFiTechWear"
            ) {
              formattedStyle?.push(
                styleSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (styleSelected[i] === "DIYBrutalism") {
              formattedStyle?.push("DIY Brutalism");
            } else if (styleSelected[i] === "LoFiTechWear") {
              formattedStyle?.push("LoFi Tech Wear");
            }
          }

          if (styleSelected[0] !== "none") {
            setStyleSelect(formattedStyle);
          }
          if (sexSelected[0] !== "none") {
            setSexSelect(sexSelected);
          }

          let formattedCollection: string[] = [];
          for (let i: number = 0; i < collectionSelected.length; i++) {
            if (
              collectionSelected[i] !== "MEVOverride" &&
              collectionSelected[i] !== "LoFiSynthwear" &&
              collectionSelected[i] !== "Jidōka Imprint" &&
              collectionSelected[i] !== "LESExchange"
            ) {
              formattedCollection?.push(
                collectionSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (collectionSelected[i] === "MEVOverride") {
              formattedCollection?.push("MEV Override");
            } else if (collectionSelected[i] === "LoFiSynthwear") {
              formattedCollection?.push("LoFi Synthwear");
            } else if (collectionSelected[i] === "Jidōka Imprint") {
              formattedCollection?.push("Jidōka Imprint");
            } else if (collectionSelected[i] === "LESExchange") {
              formattedCollection?.push("LES Exchange");
            }
          }
          if (collectionSelected[0] !== "none") {
            setCollectionSelect(formattedCollection);
          }
        }
        // check if sex is before style and collection is after style
        else if (
          router.asPath.split("?style=")[1].includes("?collection=") &&
          router.asPath.split("?style=")[0].includes("?sex=")
        ) {
          const sexSelected: string[] = router.asPath
            .split("?sex=")[1]
            .split("?style")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const styleSelected: string[] = router.asPath
            .split("?style=")[1]
            .split("?collection=")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");

          const collectionSelected: string[] = router.asPath
            .split("?collection=")[1]
            .split("/#shopping")[0]
            .replaceAll("-", " ")
            .trim()
            .split(" ");
          if (router.asPath.includes("Jid%C5%8DkaImprint")) {
            const index: number = lodash.findIndex(
              router.asPath
                .split("?collection=")[1]
                .split("/#shopping")[0]
                .replaceAll("-", " ")
                .trim()
                .split(" "),
              (item) => item === "Jid%C5%8DkaImprint"
            );
            collectionSelected[index] = "Jidōka Imprint";
          }

          let formattedStyle: string[] = [];
          for (let i: number = 0; i < styleSelected.length; i++) {
            if (
              styleSelected[i] !== "DIYBrutalism" &&
              styleSelected[i] !== "LoFiTechWear"
            ) {
              formattedStyle?.push(
                styleSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (styleSelected[i] === "DIYBrutalism") {
              formattedStyle?.push("DIY Brutalism");
            } else if (styleSelected[i] === "LoFiTechWear") {
              formattedStyle?.push("LoFi Tech Wear");
            }
          }

          if (styleSelected[0] !== "none") {
            setStyleSelect(formattedStyle);
          }
          if (sexSelected[0] !== "none") {
            setSexSelect(sexSelected);
          }

          let formattedCollection: string[] = [];
          for (let i: number = 0; i < collectionSelected.length; i++) {
            if (
              collectionSelected[i] !== "MEVOverride" &&
              collectionSelected[i] !== "LoFiSynthwear" &&
              collectionSelected[i] !== "Jidōka Imprint" &&
              collectionSelected[i] !== "LESExchange"
            ) {
              formattedCollection?.push(
                collectionSelected[i]
                  ?.match(/[A-Z][a-z]+|[0-9]+/g)
                  ?.join(" ") as string
              );
            } else if (collectionSelected[i] === "MEVOverride") {
              formattedCollection?.push("MEV Override");
            } else if (collectionSelected[i] === "LoFiSynthwear") {
              formattedCollection?.push("LoFi Synthwear");
            } else if (collectionSelected[i] === "Jidōka Imprint") {
              formattedCollection?.push("Jidōka Imprint");
            } else if (collectionSelected[i] === "LESExchange") {
              formattedCollection?.push("LES Exchange");
            }
          }
          if (collectionSelected[0] !== "none") {
            setCollectionSelect(formattedCollection);
          }
        }
      }
    }
  }, []);

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
