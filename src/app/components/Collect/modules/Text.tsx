import { FunctionComponent, JSX } from "react";
import descriptionRegex from "../../../lib/helpers/descriptionRegex";
import { TextProps } from "../types/collect.types";

const Text: FunctionComponent<TextProps> = ({ metadata }): JSX.Element => {
  return (
    <div className="relative w-full h-fit flex flex-col justify-start items-center gap-3">
      <div
        className={`relative w-full h-fit max-h-[20rem] font-din text-black text-left items-start justify-start break-words flex overflow-y-scroll p-3 text-sm whitespace-preline ${
          metadata?.__typename !== "TextOnlyMetadata" &&
          metadata?.content?.length > 200
            ? "bg-lightViolet"
            : "bg-lightYellow"
        }`}
        dangerouslySetInnerHTML={{
          __html: descriptionRegex(
            metadata?.content,
            metadata?.__typename !== "TextOnlyMetadata" &&
              metadata?.content?.length > 200
              ? false
              : true
          ),
        }}
      ></div>
    </div>
  );
};

export default Text;
