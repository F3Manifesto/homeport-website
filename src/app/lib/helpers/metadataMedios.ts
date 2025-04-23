import { MediaAudio, MediaVideo, MediaImage } from "@lens-protocol/client";
import { INFURA_GATEWAY, IPFS_REGEX } from "../constants";

export const metadataMedios = (
  media: MediaAudio | MediaVideo | MediaImage
):
  | {
      url: string;
      type: "Image" | "Video" | "Audio";
      cover?: string;
    }
  | undefined => {
  switch (media?.__typename) {
    case "MediaImage":
      return {
        url:
          media?.item?.includes("ipfs://") &&
          IPFS_REGEX.test(media?.item?.split("ipfs://")?.[1])
            ? `${INFURA_GATEWAY}/ipfs/${media?.item?.split("ipfs://")[1]}`
            : media?.item?.includes("ar://")
            ? `https://arweave.net/${media?.item
                ?.split("ar://")?.[1]
                ?.replace(/"/g, "")
                ?.trim()}`
            : media?.item,
        type: "Image",
      };

    default:
      return {
        url:
          media?.item?.includes("ipfs://") &&
          IPFS_REGEX.test(media?.item?.split("ipfs://")?.[1])
            ? `${INFURA_GATEWAY}/ipfs/${media?.item?.split("ipfs://")[1]}`
            : media?.item?.includes("ar://")
            ? `https://arweave.net/${media?.item
                ?.split("ar://")?.[1]
                ?.replace(/"/g, "")
                ?.trim()}`
            : media?.item,
        type: media?.__typename == "MediaVideo" ? "Video" : "Audio",
        cover: media?.cover
          ? media?.cover?.includes("ipfs://") &&
            IPFS_REGEX.test(media?.cover?.split("ipfs://")?.[1])
            ? `${INFURA_GATEWAY}/ipfs/${media?.cover?.split("ipfs://")[1]}`
            : media?.cover?.includes("ar://")
            ? `https://arweave.net/${media?.cover
                ?.split("ar://")?.[1]
                ?.replace(/"/g, "")
                ?.trim()}`
            : media?.cover
          : `${INFURA_GATEWAY}/ipfs/QmNW7axzePWYgpqXS31FG93fsYJrHjpC1QTPyGmz3nCMmi`,
      };
  }
};
