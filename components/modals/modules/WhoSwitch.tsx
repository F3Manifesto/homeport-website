import { FunctionComponent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Quote } from "../../../graphql/generated";
import createProfilePicture from "../../../lib/helpers/createProfilePicture";
import Image from "next/image";
import { setReactBox } from "../../../redux/reducers/reactBoxSlice";
import Publication from "./Publication";
import { WhoSwitchProps } from "../../../types/general.types";

const WhoSwitch: FunctionComponent<WhoSwitchProps> = ({
  type,
  router,
  reactors,
  quoters,
  showMore,
  hasMoreQuote,
  hasMore,
  mirrorQuote,
  dispatch,
  lensConnected,
}): JSX.Element => {
  if (mirrorQuote && quoters?.length > 0) {
    return (
      <div className="relative w-full h-fit flex flex-col overflow-y-scroll max-h-[20rem]">
        <InfiniteScroll
          dataLength={quoters?.length}
          loader={<></>}
          hasMore={hasMore}
          next={showMore}
          className="w-fit h-fit items-start justify-start flex flex-col gap-10"
        >
          {quoters?.map((item: Quote, index: number) => {
            return (
              <Publication
                lensConnected={lensConnected}
                index={index}
                item={item}
                router={router}
                disabled={true}
                dispatch={dispatch}
                data-post-id={item?.id}
                key={index}
                top={
                  item?.metadata?.content?.length < 100 &&
                  item?.metadata?.__typename !== "AudioMetadataV3" &&
                  item?.metadata?.__typename !== "ImageMetadataV3" &&
                  item?.metadata?.__typename !== "VideoMetadataV3"
                    ? "20px"
                    : "auto"
                }
                bottom={
                  item?.metadata?.content?.length < 100 &&
                  item?.metadata?.__typename !== "AudioMetadataV3" &&
                  item?.metadata?.__typename !== "ImageMetadataV3" &&
                  item?.metadata?.__typename !== "VideoMetadataV3"
                    ? "auto"
                    : "2px"
                }
                left={"auto"}
                right={"2px"}
              />
            );
          })}
        </InfiniteScroll>
      </div>
    );
  } else {
    return reactors?.length > 0 && !mirrorQuote ? (
      <div className="relative w-full h-40 flex flex-col overflow-y-scroll">
        <InfiniteScroll
          hasMore={!mirrorQuote ? hasMore : hasMoreQuote}
          dataLength={!mirrorQuote ? reactors?.length : quoters?.length}
          next={showMore}
          loader={""}
          height={"10rem"}
          className="relative w-full h-40 flex flex-col px-4 gap-2 overflow-y-scroll"
        >
          {reactors?.map((reactor: any, index: number) => {
            const account =
              type === "Likes"
                ? reactor?.profile
                : type === "Mirrors"
                ? reactor?.by
                : reactor;

            const profileImage = createProfilePicture(
              account?.metadata?.picture
            );

            return (
              <div
                key={index}
                className="relative w-full h-14 p-2 flex flex-row border border-black items-center justify-start font-bit text-white cursor-pointer border border-white"
                id="prerollFaded"
                onClick={() => {
                  setReactBox({
                    actionOpen: false,
                  });
                  router.push(
                    `/autograph/${
                      account?.handle?.suggestedFormatted?.localName?.split(
                        "@"
                      )[1]
                    }`
                  );
                }}
              >
                <div className="relative w-fit h-fit flex flex-row gap-3 items-center justify-center">
                  <div
                    className="relative w-8 h-8 rounded-full border border-white items-center justify-center"
                    id="pfp"
                  >
                    {profileImage && (
                      <Image
                        src={profileImage}
                        objectFit="cover"
                        layout="fill"
                        alt="pfp"
                        className="relative w-fit h-fit rounded-full self-center flex"
                        draggable={false}
                      />
                    )}
                  </div>
                  <div
                    id="handle"
                    className="relative w-fit h-fit justify-center items-center flex top-px text-sm"
                  >
                    {account?.handle?.suggestedFormatted?.localName}
                  </div>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    ) : (
      <></>
    );
  }
};

export default WhoSwitch;
