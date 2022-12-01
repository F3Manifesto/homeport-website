import { useState } from "react";
import { UseF3ManifestoResults } from "../../../../types/general.types";
import shuffle from "shuffle-array";

const useF3Manifesto = (): UseF3ManifestoResults => {
  const [newImagesURI, setNewImagesURI] = useState<string[]>([
    "QmToXdYPDtkWEsgmhHKef5yXPuuXKpvmSwGKdfE8u5z5LR",
    "QmWPRaKEPK8pexCPkdPg5viome8x5RQx8xjRehXkxMY4BH",
    "QmahxsFpuw13Yr33BYaouvf3uhUHq14dec5HPgShoLrbu6",
    "QmavRQgQJ7DpiBEx6TA9iMqM6eswW72bHN4iRfHbymg3tA",
    "QmebQ98BepuhihKMKgH6qv1XztAW2WoVxeaj13aNUh6dCw",
  ]);
  const [mainImage, setMainImage] = useState<string>(
    "QmWPRaKEPK8pexCPkdPg5viome8x5RQx8xjRehXkxMY4BH"
  );

  const imagesURI: string[] = [
    "QmU8xZxDhes5c6QVzieRjdTCwQDn8CQZNpLvxSziwV1RLT",
    "QmToXdYPDtkWEsgmhHKef5yXPuuXKpvmSwGKdfE8u5z5LR",
    "QmY1w74Fp9sJ3sRrUBwELJUFJsnpQroNKbYemU3pdUU8QQ",
    "QmaqTRqYrhKvQeWDEHX9NFZS1w8ZxGPDLC1hYmuCmojDnA",
    "QmdHxY7hbqwwUQHaUUhaGGspCa4JZXtm6SEmz5Q2XietQf",
    "QmavRQgQJ7DpiBEx6TA9iMqM6eswW72bHN4iRfHbymg3tA",
    "QmahxsFpuw13Yr33BYaouvf3uhUHq14dec5HPgShoLrbu6",
    "QmXBi2ex9QJYUzGZaWvuD1y44xYmDnSNXNfxfvbKhAppD5",
    "QmacyphkA9JZKd7TvhCmmQj5rLiU1T1uhbx6A7WbdTjrwM",
    "QmVmL7MELU5o4DUWhrLs5fW6H9cvBhdt4GwWNqpn9iBnpP",
    "QmcDB1a5aqFppPfZvh16rTsXP7dvjdFwUkRqXte69zaHgY",
    "QmYkWVXHDbNSxBSfUbTUX5nzPgpXD3fmVPz8NjV2C3moHx",
    "QmRMG3apByYx2qwLfqMNnLKLaEia87a5qghpG6agpiy2Tr",
    "QmX54Rdf5hqjX4pbsUDESYpXqz4zp2n9PDAJyEGQk6brzk",
    "QmUVL7BRGpbZUMKsmKxshwzS88d6FgssLpvoiUda7NqPwr",
    "QmX6Ep6TFPWdfq2RiRYxXKJiVUGcDuQ3YxM2GchoFR71bd",
    "QmVcxMp3zainDc87jSZWxL6LZz4H8zcz733CDFWkoA5kGC",
    "QmfVLPL7WG3QrgJ63bK33uzG5RCAntB734vo8J2JBGSYyr",
    "QmfW7kcX3jv9uD3kfhZDidxuPSrRDgfVmdAtHRhbQtSizE",
    "QmebQ98BepuhihKMKgH6qv1XztAW2WoVxeaj13aNUh6dCw",
    "QmRpdtjbpGGPtqma8U4Bmz8k2sXp3vj3sphQbZdS2WFBaP",
    "QmWPRaKEPK8pexCPkdPg5viome8x5RQx8xjRehXkxMY4BH",
    "QmexdPsD4NLMccKny1dciqwiMopJKG2MmLibojozJ6RK2r",
    "QmctyzRkHN2LJ8hrFaMrwqDBgHHUF18WdrcLgMF4BqtBUe",
  ];

  const refreshImages = (): void => {
    let newImages: string[] = [];
    let newImagesURI: string[] = [];
    const AllNumbers: number[] = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ];
    shuffle<number>(AllNumbers);
    for (let i = 0; i < 5; i++) {
      newImagesURI.push(imagesURI[AllNumbers[i]]);
    }
    setNewImagesURI(newImagesURI);
  };

  const viewMainImage = (e: any): void => {
    let src: string = e.target.src;
    // if (src.split("/ipfs/")[1].charAt(1) === ".") {
    //   src = src.split("/ipfs/")[1].charAt(0);
    // } else {
    //   src = src.split("ipfs/")[1].charAt(0) + src.split("ipfs/")[1].charAt(1);
    // }
    setMainImage(src.split("/ipfs/")[1]);
  };

  return {
    refreshImages,
    viewMainImage,
    mainImage,
    imagesURI,
    newImagesURI,
  };
};

export default useF3Manifesto;
