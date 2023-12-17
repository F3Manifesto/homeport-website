import { FunctionComponent } from "react";
import { ImageMetadataV3 } from "../../../graphql/generated";
import { F3M_ADDRESS } from "../../../lib/constants";
import createProfilePicture from "../../../lib/helpers/createProfilePicture";
import Image from "next/image";
import moment from "moment";
import Publication from "./Publication";
import { PostQuoteProps } from "../../../types/general.types";

const PostQuote: FunctionComponent<PostQuoteProps> = ({
  quote,
  router,
}): JSX.Element => {
  const profilePicture = createProfilePicture(quote?.by?.metadata?.picture);
  return (
    <div
      className="relative w-full h-60 overflow-y-hidden sm:px-5 py-1 flex items-start justify-center"
      id="fadedQuote"
    >
      <div
        className={`relative w-full h-full p-2 flex items-center justify-start flex-col ${
          quote?.openActionModules?.[0]?.contract?.address
            ?.toLowerCase()
            ?.includes(F3M_ADDRESS?.toLowerCase()) && "cursor-empireS"
        } to-black bg-gradient-to-r rounded-md gap-5`}
        onClick={(e) => {
          e.stopPropagation();
          quote?.openActionModules?.[0]?.contract?.address
            ?.toLowerCase()
            ?.includes(F3M_ADDRESS?.toLowerCase()) &&
            router.push(
              `/item/listener/${(
                quote?.metadata as ImageMetadataV3
              )?.title?.replaceAll(" ", "_")}`
            );
        }}
      >
        <div className="relative w-full h-fit flex flex-row items-center justify-center gap-2 px-1">
          <div className="relative w-fit h-fit flex items-center justify-center gap-1 mr-auto">
            <div className="relative w-fit h-fit flex items-center justify-center">
              <div
                className="relative flex items-center justify-center rounded-full w-5 h-5"
                id="pfp"
              >
                {profilePicture && (
                  <Image
                    layout="fill"
                    src={profilePicture}
                    draggable={false}
                    className="rounded-full"
                    objectFit="cover"
                  />
                )}
              </div>
            </div>
            <div
              className={`relative w-fit h-fit text-xs flex items-center justify-center text-white font-bit top-px`}
            >
              {quote?.by?.handle?.suggestedFormatted?.localName
                ? quote?.by?.handle?.suggestedFormatted?.localName.length > 25
                  ? quote?.by?.handle?.suggestedFormatted?.localName.substring(
                      0,
                      20
                    ) + "..."
                  : quote?.by?.handle?.suggestedFormatted?.localName
                : ""}
            </div>
          </div>
          <div className="relative w-fit h-fit flex items-center justify-center">
            <div
              className={`relative w-fit h-fit text-white font-bit items-center justify-center flex text-xs ml-auto top-px`}
            >
              {quote?.createdAt && moment(`${quote?.createdAt}`).fromNow()}
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit flex items-start justify-center">
          <Publication />
        </div>
      </div>
    </div>
  );
};

export default PostQuote;
