import { FunctionComponent, JSX } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Publication from "./Publication";
import { Post } from "@lens-protocol/client";
import { ReferencesProps } from "../types/collect.types";
import useInteractions from "../hooks/useInteractions";
import Comment from "./Comment";

const References: FunctionComponent<ReferencesProps> = ({
  dict,
  post
}): JSX.Element => {
  const {getReferences, references, referencesInfo, referencesLoading, getMoreReferences } =
    useInteractions(post);

  return (
    <div
      className="relative w-full h-[25rem] flex border-offBlack border-4 items-start p-2 overflow-y-scroll justify-center bg-lightY"
      id="fadedItem"
    >
      <div className="relative w-full h-fit flex flex-col gap-5 justify-start items-center">
        <Comment post={post} dict={dict} getReferences={getReferences} />
        {referencesLoading ? (
          Array.from({ length: 10 }).map((_, index: number) => {
            return (
              <div
                className={`relative rounded-sm h-40 w-full sm:w-3/5 px-1 py-3 sm:py-2 border border-black sm:px-2 flex flex-col gap-4 sm:gap-2 border-2 items-center justify-between border-black bg-lightYellow animate-pulse`}
                key={index}
              ></div>
            );
          })
        ) : references?.length < 1 ? (
          <div className="relative w-fit h-fit items-center justify-center flex text-black font-din break-words">
            {dict?.common?.comMake}
          </div>
        ) : (
          <>
            <InfiniteScroll
              dataLength={references?.length}
              loader={<></>}
              hasMore={referencesInfo?.hasMore}
              next={getMoreReferences}
              className="w-full h-fit items-center justify-start flex flex-col gap-10"
            >
              {references?.map((item: Post, index: number) => {
                return <Publication post={item} key={index} dict={dict} />;
              })}
            </InfiniteScroll>
          </>
        )}
      </div>
    </div>
  );
};

export default References;
