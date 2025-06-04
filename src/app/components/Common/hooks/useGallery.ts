import { useContext, useEffect, useRef, useState } from "react";
import { Gallery } from "../types/common.types";
import { ModalContext } from "@/app/providers";
import { useSearchParams } from "next/navigation";
import { fetchPost } from "@lens-protocol/client/actions";
import { getAllCollections } from "../../../../../graphql/queries/getCollections";
import { INFURA_GATEWAY } from "@/app/lib/constants";

const useGallery = () => {
  const context = useContext(ModalContext);
  const search = useSearchParams();
  const [filteredGallery, setFilteredGallery] = useState<Gallery[]>([]);
  const [filteredIsekaiGallery, setFilteredIsekaiGallery] = useState<Gallery[]>(
    []
  );
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
      const portalsMap = new Map<string, { title: string; image: string }>();
      const colls = (await Promise.all(
        returned?.data?.collectionCreateds?.map(async (col: Gallery) => {
          let post = undefined;

          if (col?.postId) {
            const res = await fetchPost(context?.lensClient!, {
              post: col?.postId,
            });
            if (res?.isOk()) {
              post = res?.value;
            }
          }

          if (!col?.metadata) {
            const data = await fetch(
              `${INFURA_GATEWAY}/ipfs/${col?.uri?.split("ipfs://")?.[1]}`
            );

            col.metadata = await data.json();
          }

          return {
            ...col,
            post,
          };
        })
      )) as Gallery[];

      const todo = colls?.filter(
        (col) => !col.drop?.metadata?.title?.toLowerCase()?.includes("isekai -")
      );
      const isekai = colls?.filter((col) =>
        col.drop?.metadata?.title?.toLowerCase()?.includes("isekai -")
      );

      context?.setGallery(todo?.sort(() => 0.5 - Math.random()) as Gallery[]);

      context?.setIsekaiGallery(
        isekai?.sort(() => 0.5 - Math.random()) as Gallery[]
      );

      todo?.forEach((item: any) => {
        if (item.metadata?.sex) {
          sexesSet.add(item.metadata.sex);
        }
        if (item.metadata?.style) {
          stylesSet.add(item.metadata.style);
        }
        if (item.drop?.metadata?.title) {
          dropsSet.add(item.drop?.metadata.title);
        }
      });

      isekai?.forEach((item: any) => {
        if (item.drop?.metadata?.title) {
          portalsMap.set(item.drop?.metadata.title, {
            title: item.drop?.metadata.title,
            image: item.drop?.metadata.cover,
          });
        }
      });

      context?.setFilters({
        sexes: Array.from(sexesSet),
        styles: Array.from(stylesSet),
        drops: Array.from(dropsSet),
        portals: Array.from(new Set(portalsMap.values())),
      });
    } catch (err: any) {
      console.error(err.message);
    }
    setGalleryLoading(false);
  };

  const handleURL = async (type: string, newValue: string): Promise<void> => {
    let baseUrl = (window.location.search + window.location.hash)
      ?.split("?")[0]
      ?.split("#")[0];
    let queryParams = new URLSearchParams(
      (window.location.search + window.location.hash)?.split("?")[1]
    );
    let newUrl: string = "";
    if (type !== "name") {
      newValue = newValue.trim().replace(/\s+/g, "")?.replaceAll("’", "");

      let queryArray =
        queryParams
          .get(type)
          ?.replaceAll("/#shopping", "")
          ?.split("-")
          ?.filter((item) => item) || [];
      if (queryArray.includes(newValue)) {
        queryArray = queryArray.filter((item) => item !== newValue);
      } else if (newValue !== "") {
        if (type == "portal") {
          queryArray[0] = newValue;
        } else {
          queryArray.push(newValue);
        }
      }

      if (queryArray.length === 0) {
        queryParams.delete(type);
      } else {
        queryParams.set(type, queryArray.join("-"));
      }
    } else {
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

    window.history.replaceState(
      null,
      "",
      newUrl?.includes("?/#shopping") ? newUrl?.replaceAll("?", "") : newUrl
    );

    context?.setPrevURL(
      newUrl?.includes("?/#shopping") ? newUrl?.replaceAll("?", "") : newUrl
    );

    // await router.replace(
    //   (window.location.search + window.location.hash)?,
    //   newUrl?.includes("?/#shopping") ? newUrl?.replaceAll("?", "") : newUrl,
    //   {
    //     shallow: true,
    //     scroll: false,
    //   }
    // );
  };

  const filterGallery = () => {
    let galleryFiltered: Gallery[] = [];
    if (
      (context?.prevURL?.trim() !== ""
        ? context?.prevURL
        : window.location.search + window.location.hash
      )?.includes("sex=")
    ) {
      const sexSelected: string[] = (
        context?.prevURL?.trim() !== ""
          ? context?.prevURL!
          : window.location.search + window.location.hash
      )
        ?.split("sex=")[1]
        ?.split("&")[0]
        ?.split("?")[0]
        ?.replaceAll("-", " ")

        ?.split("/#shopping")?.[0]
        ?.trim()
        ?.split(" ");

      if (sexSelected?.length > 0) {
        galleryFiltered = (context?.gallery || [])?.filter((item) =>
          sexSelected?.some(
            (sex) =>
              sex
                ?.replace(/([A-Z])/g, " $1")
                ?.trim()
                ?.toLowerCase() === item?.metadata?.sex?.toLowerCase()
          )
        );
      }
    }

    if (
      (context?.prevURL?.trim() !== ""
        ? context?.prevURL
        : window.location.search + window.location.hash
      )?.includes("style=")
    ) {
      const styleSelected: string[] = (
        context?.prevURL?.trim() !== ""
          ? context?.prevURL!
          : window.location.search + window.location.hash
      )
        ?.split("style=")[1]
        ?.split("&")[0]
        ?.split("?")[0]
        ?.replaceAll("-", " ")
        ?.split("/#shopping")?.[0]
        ?.trim()
        ?.split(" ");

      if (styleSelected?.length > 0) {
        galleryFiltered = (
          galleryFiltered?.length > 0 ? galleryFiltered : context?.gallery || []
        )?.filter((item) =>
          styleSelected?.some(
            (style) =>
              style
                .replace(/(LoFi|DIY|LES|MEV)|([A-Z])/g, (match, p1) =>
                  p1 ? p1 : " " + match
                )
                ?.toLowerCase()
                .trim() === item?.metadata?.style?.toLowerCase()
          )
        );
      }
    }

    if (
      (context?.prevURL?.trim() !== ""
        ? context?.prevURL
        : window.location.search + window.location.hash
      )?.includes("collection=")
    ) {
      const dropSelected: string[] = (
        context?.prevURL?.trim() !== ""
          ? context?.prevURL!
          : window.location.search + window.location.hash
      )
        ?.split("collection=")[1]
        ?.split("&")[0]
        ?.split("?")[0]
        ?.replaceAll("-", " ")
        ?.split("/#shopping")?.[0]
        ?.trim()
        ?.split(" ");

      console.log(
   dropSelected
      );

      if (dropSelected?.length > 0) {
        galleryFiltered = (
          galleryFiltered?.length > 0 ? galleryFiltered : context?.gallery || []
        )?.filter((item) =>
          dropSelected?.some(
            (drop) =>
              (drop == "OutofContext"
                ? "Out of Context"?.toLowerCase()
                : drop == "флоривКиєві"
                ? "флори в Києві"?.toLowerCase()
                : drop == "زن،زندگی،آزادی"
                ? "زن، زندگی، آزادی"
                : drop
                    .replace(/(LoFi|DIY|LES|MEV)|([A-Z])/g, (match, p1) =>
                      p1 ? p1 : " " + match
                    )
                    ?.toLowerCase()
                    .trim()
                    ?.replaceAll("’", "")) ===
              item?.drop?.metadata?.title?.toLowerCase()?.replaceAll("’", "")
          )
        );
      }
    }

    if (
      (context?.prevURL?.trim() !== ""
        ? context?.prevURL
        : window.location.search + window.location.hash
      )?.includes("name=")
    ) {
      const nameSelected: string = (
        context?.prevURL?.trim() !== ""
          ? context?.prevURL!
          : window.location.search + window.location.hash
      )
        ?.split("name=")[1]
        ?.split("&")[0]
        ?.split("?")[0]
        ?.split("/#shopping")?.[0];

      if (nameSelected !== "" && nameSelected) {
        galleryFiltered = (
          galleryFiltered?.length > 0 ? galleryFiltered : context?.gallery || []
        )?.filter((item) =>
          item?.metadata?.title
            ?.toLowerCase()
            ?.includes(nameSelected?.toLowerCase())
        );
      }
    }
    setFilteredGallery(galleryFiltered);
  };

  const filterIsekaiGallery = () => {
    let galleryFiltered: Gallery[] = [];

    if (
      (context?.prevURL?.trim() !== ""
        ? context?.prevURL
        : window.location.search + window.location.hash
      )?.includes("portal=")
    ) {
      const portalSelected: string[] = (
        context?.prevURL?.trim() !== ""
          ? context?.prevURL!
          : window.location.search + window.location.hash
      )
        ?.split("portal=")[1]
        ?.split("&")[0]
        ?.split("?")[0]
        ?.replaceAll("-", " ")
        ?.split("/#shopping")?.[0]
        ?.trim()
        ?.split(" ");
      if (portalSelected?.length > 0) {
        galleryFiltered = (
          galleryFiltered?.length > 0
            ? galleryFiltered
            : context?.isekaiGallery || []
        )?.filter((item) =>
          portalSelected?.some((portal) =>
            item?.drop?.metadata?.title
              ?.toLowerCase()
              ?.split("- ")?.[1]
              ?.includes(portal?.toLowerCase().trim())
          )
        );
      }
    }

    setFilteredIsekaiGallery(galleryFiltered);
  };

  useEffect(() => {
    if (!context?.filters && context?.lensClient && !galleryLoading) {
      getAllGallery();
    }
  }, [context?.gallery, context?.lensClient]);

  useEffect(() => {
    if (Number(context?.gallery?.length) > 0) {
      filterGallery();
    }
  }, [search?.toString(), context?.prevURL, context?.gallery]);

  useEffect(() => {
    if (Number(context?.isekaiGallery?.length) > 0) {
      filterIsekaiGallery();
    }
  }, [search?.toString(), context?.prevURL, context?.isekaiGallery]);

  return {
    shopping,
    goShopping,
    filteredGallery,
    galleryLoading,
    handleURL,
    filteredIsekaiGallery,
  };
};

export default useGallery;
