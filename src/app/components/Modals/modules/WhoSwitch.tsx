import { FunctionComponent, JSX, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/legacy/image";
import Publication from "../../Collect/modules/Publication";
import { Account, Post } from "@lens-protocol/client";
import { ModalContext } from "@/app/providers";
import { handleProfilePicture } from "@/app/lib/helpers/handleProfilePicture";
import { WhoSwitchProps } from "../types/modals.types";

const WhoSwitch: FunctionComponent<WhoSwitchProps> = ({
  reactors,
  quoters,
  hasMore,
  hasMoreQuote,
  showMore,
  mirrorQuote,
  dict,
}): JSX.Element => {
  const context = useContext(ModalContext);

  if (mirrorQuote && quoters?.length > 0) {
    return (
      <div className="relative w-full h-fit flex flex-col overflow-y-scroll max-h-[20rem]">
        <InfiniteScroll
          dataLength={quoters?.length}
          loader={<></>}
          hasMore={hasMore}
          next={showMore}
          className="w-full h-fit items-center justify-start flex flex-col gap-10"
        >
          {quoters?.map((post: Post, index: number) => {
            return <Publication post={post} key={index} dict={dict} />;
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
          {reactors?.map((reactor: Account, index: number) => {
            return (
              <div
                key={index}
                className="relative w-full h-14 p-2 flex flex-row items-center justify-start font-conso bg-lightYellow text-black cursor-empireS border border-black"
                onClick={() => {
                  context?.setReactBox(undefined);
                  window.open(
                    `https://cypher.digitalax.xyz/autograph/${reactor?.username?.localName}`
                  );
                }}
              >
                <div className="relative w-fit h-fit flex flex-row gap-3 items-center justify-center">
                  <div className="relative w-8 h-8 rounded-full border border-black items-center justify-center bg-lightWhite">
                    <Image
                      src={handleProfilePicture(reactor?.metadata?.picture)}
                      objectFit="cover"
                      layout="fill"
                      alt="pfp"
                      className="relative w-fit h-fit rounded-full self-center flex"
                      draggable={false}
                    />
                  </div>
                  <div
                    id="handle"
                    className="relative w-fit h-fit justify-center items-center flex top-px text-xs"
                  >
                    {reactor?.username?.localName}
                  </div>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    ) : (
      <div className="relative w-fit h-fit text-black font-conso flex items-center justify-center text-xs py-3 px-1">
        {mirrorQuote && quoters?.length < 1
          ? dict?.collect?.quotes
          : dict?.collect?.mirrors}
      </div>
    );
  }
};

export default WhoSwitch;
