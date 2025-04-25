import { FunctionComponent, JSX, useContext } from "react";
import descriptionRegex from "../../../lib/helpers/descriptionRegex";
import { ModalContext } from "@/app/providers";
import MediaSwitch from "./MediaSwitch";
import { metadataMedios } from "@/app/lib/helpers/metadataMedios";
import { MediaProps } from "../types/collect.types";
import { MediaAudio, MediaImage, MediaVideo } from "@lens-protocol/client";

const Media: FunctionComponent<MediaProps> = ({ metadata }): JSX.Element => {
  const context = useContext(ModalContext);
  const count = [
    metadata?.__typename == "ImageMetadata"
      ? metadata?.image
      : metadata?.__typename == "VideoMetadata"
      ? metadata?.video
      : metadata?.audio,
    ...(metadata?.attachments || []),
  ].filter(Boolean);
  return (
    <div className="relative w-full h-fit flex flex-col justify-start items-center gap-3 break-words max-w-full">
      {((metadata?.content && metadata?.content?.trim() !== "") ||
        (metadata?.title && metadata?.title?.trim() !== "")) && (
        <div
          className={`relative w-full h-fit max-h-[12rem] font-din  text-left items-start justify-start break-words flex overflow-y-scroll p-3 border border-black text-sm whitespace-preline ${
            metadata?.__typename === "ImageMetadata"
              ? "bg-lightPurple text-black"
              : metadata?.__typename === "VideoMetadata"
              ? "bg-brightGreen text-white"
              : "bg-lightYellow text-black"
          }`}
          dangerouslySetInnerHTML={{
            __html: descriptionRegex(
              metadata?.content,
              metadata?.__typename === "VideoMetadata" ? true : false
            ),
          }}
        ></div>
      )}
      <div
        className={`relative w-full h-fit overflow-x-scroll gap-2 items-center justify-start flex`}
      >
        <div className="relative w-fit h-fit gap-2 flex flex-row items-center justify-start">
          {count?.length > 0 &&
            [
              metadata?.__typename == "ImageMetadata"
                ? metadata?.image
                : metadata?.__typename == "VideoMetadata"
                ? metadata?.video
                : metadata?.audio,
              ...(metadata?.attachments || []),
            ]
              ?.filter(Boolean)
              ?.map(
                (item: MediaAudio | MediaVideo | MediaImage, index: number) => {
                  const media = metadataMedios(item);

                  return (
                    <div
                      key={index}
                      className={`w-60 border border-black rounded-sm h-60 flex items-center justify-center bg-lightWhite ${
                        media?.url && "cursor-empireS"
                      }`}
                      onClick={() =>
                        media?.type === "Image" &&
                        context?.setImageViewer(media?.url)
                      }
                    >
                      <div className="relative w-full h-full flex rounded-sm items-center justify-center">
                        {media?.url && (
                          <MediaSwitch
                            type={media?.type}
                            srcUrl={media?.url}
                            srcCover={media?.cover}
                            classNameVideo={
                              "rounded-sm absolute w-full h-full object-cover"
                            }
                            classNameImage={"rounded-sm"}
                            classNameAudio={"rounded-md"}
                          />
                        )}
                      </div>
                    </div>
                  );
                }
              )}
        </div>
      </div>
    </div>
  );
};

export default Media;
