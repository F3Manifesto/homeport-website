import { v4 as uuidv4 } from "uuid";
import { PublicationMetadataMainFocusType } from "../../graphql/generated";
import convertToFile from "./convertToFile";

const uploadPostContent = async (
  contentText: string | undefined,
  images: string[],
  videos: string[]
): Promise<{ string: string; object: Object } | undefined> => {
  let $schema: string,
    mainContentFocus: PublicationMetadataMainFocusType,
    value: object = {};

  if (images?.length < 1 && videos?.length < 1) {
    $schema = "https://json-schemas.lens.dev/publications/text-only/3.0.0.json";
    mainContentFocus = PublicationMetadataMainFocusType.TextOnly;
  } else {
    const mediaWithKeys = [
      ...(videos || []).map((video) => ({
        type: "video/mp4",
        item: video?.includes("ipfs://")
          ? video
          : convertToFile(video, "video/mp4"),
      })),
      ...(images || []).map((image) => ({
        type: "image/png",
        item:
          image &&
          (image?.includes("ipfs://")
            ? image
            : convertToFile(image, "image/png")),
      })),
    ]
      ?.filter(Boolean)
      ?.filter((item) => item.item);

    const uploads = await Promise.all(
      mediaWithKeys.map(async (media) => {
        if (
          typeof media?.item == "string" &&
          (media?.item as String)?.includes("ipfs://")
        ) {
          return { type: media?.type, item: media?.item };
        } else {
          const response = await fetch("/api/ipfs", {
            method: "POST",
            body: media.item,
          });
          const responseJSON = await response.json();
          return { type: media?.type, item: "ipfs://" + responseJSON.cid };
        }
      })
    );

    const primaryMedia = uploads[0];
    if (primaryMedia?.type === "video/mp4") {
      $schema = "https://json-schemas.lens.dev/publications/video/3.0.0.json";
      mainContentFocus = PublicationMetadataMainFocusType.Video;
      value = {
        video: primaryMedia,
      };
    } else {
      $schema = "https://json-schemas.lens.dev/publications/image/3.0.0.json";
      mainContentFocus = PublicationMetadataMainFocusType.Image;
      value = { image: primaryMedia };
    }

    const attachments = uploads.filter(
      (media) => media.item !== primaryMedia.item
    );

    if (attachments?.length > 0) {
      value = {
        ...value,
        attachments: attachments,
      };
    }
  }

  try {
    const object = {
      $schema,
      lens: {
        mainContentFocus,
        title: contentText ? contentText.slice(0, 20) : "",
        content: contentText ? contentText : "",
        appId: "f3manifesto",
        ...value,
        id: uuidv4(),
        hideFromFeed: false,
        locale: "en",
      },
    };

    const response = await fetch("/api/ipfs", {
      method: "POST",
      body: JSON.stringify(object),
    });
    let responseJSON = await response.json();

    return {
      string: "ipfs://" + responseJSON?.cid,
      object,
    };
  } catch (err: any) {
    console.error(err.message);
  }
};

export default uploadPostContent;
