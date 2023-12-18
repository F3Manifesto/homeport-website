import { FunctionComponent } from "react";
import { F3M_ADDRESS, F3M_OPEN_ACTION } from "../../../lib/constants";
import createProfilePicture from "../../../lib/helpers/createProfilePicture";
import Image from "next/image";
import moment from "moment";
import { PostQuoteProps } from "../../../types/general.types";
import PostSwitch from "./PostSwitch";
import { ImageMetadataV3 } from "../../../graphql/generated";

const PostQuote: FunctionComponent<PostQuoteProps> = ({
  quote,
  dispatch,
  disabled,
}): JSX.Element => {
  const profilePicture = createProfilePicture(quote?.by?.metadata?.picture);
  return (
    <div
      className="relative w-full h-60 overflow-y-hidden sm:px-5 py-1 flex items-start justify-center bg-grad2"
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
            ?.includes(F3M_OPEN_ACTION?.toLowerCase())
            ? window.open(
                `https://cypher.digitalax.xyz/item/f3m/${(
                  quote?.metadata as ImageMetadataV3
                )?.title?.replaceAll(" ", "_")}`
              )
            : window.open(`https://cypher.digitalax.xyz/item/pub/${quote?.id}`);
        }}
      >
        <div className="relative w-full h-fit flex flex-row items-center justify-center gap-2 px-1">
          <div className="relative w-fit h-fit flex items-center justify-center gap-1 mr-auto">
            <div className="relative w-fit h-fit flex items-center justify-center">
              <div
                className="relative flex items-center justify-center rounded-full w-5 h-5"
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
              className={`relative w-fit h-fit text-xs flex items-center justify-center text-black font-din top-px`}
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
              className={`relative w-fit h-fit text-black font-din items-center justify-center flex text-xs ml-auto top-px`}
            >
              {quote?.createdAt && moment(`${quote?.createdAt}`).fromNow()}
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit flex items-start justify-center">
          <PostSwitch item={quote} dispatch={dispatch} disabled={disabled} />
        </div>
      </div>
    </div>
  );
};

export default PostQuote;
