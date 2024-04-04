import { FunctionComponent } from "react";
import { ImCross } from "react-icons/im";
import { AiOutlineLoading } from "react-icons/ai";
import moment from "moment";
import { setFollowCollect } from "../../../redux/reducers/followCollectSlice";
import Image from "next/image";
import { INFURA_GATEWAY } from "../../../lib/constants";
import { FeeFollowModuleSettings } from "../../../graphql/generated";
import { FollowCollectProps } from "../types/modals.types";

const FollowCollect: FunctionComponent<FollowCollectProps> = ({
  dispatch,
  type,
  collect,
  follower,
  handleFollow,
  handleCollect,
  transactionLoading,
  informationLoading,
  approved,
  approveSpend,
  t,
}): JSX.Element => {
  return (
    <div className="inset-0 justify-center fixed z-50 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto">
      <div className="relative w-[90vw] cursor-empireS sm:w-[40vw] half:w-[35vw] h-fit max-h-[90vh] min-h-[27vh] place-self-center bg-lightWhite border border-black overflow-y-scroll">
        <div className="relative w-full h-full flex flex-col gap-3 px-2 pt-2 pb-4 items-center justify-start">
          <div className="relative w-fit h-fit items-end justify-end ml-auto cursor-pointer flex">
            <ImCross
              color="black"
              size={10}
              onClick={() =>
                dispatch(
                  setFollowCollect({
                    actionType: undefined,
                  })
                )
              }
            />
          </div>
          {(type == "collect" && !collect?.item?.followerOnly) ||
          (type == "collect" &&
            collect?.item?.followerOnly &&
            follower?.operations?.isFollowedByMe?.value) ? (
            <div
              className={`relative rounded-md flex flex-col gap-5 w-5/6 p-2 items-center justify-center w-full h-fit font-din text-black text-sm`}
            >
              <div className="relative w-fit h-fit flex items-center justify-center">
                {t("ready")}
              </div>
              <div className="relative w-3/4 xl:w-1/2 items-center justify-center rounded-md border border-black h-60 flex">
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/QmTYsxh1g9jzGEdGg54B9921jtMwuXJjtyjibtP4h4i5h9`}
                  objectFit="cover"
                  layout="fill"
                  className="rounded-md"
                  draggable={false}
                />
              </div>
              {collect?.item?.endsAt && (
                <div className="relative w-fit h-fit flex items-center justify-center font-din break-words px-2 text-center">
                  {collect?.item?.endsAt < Date.now()
                    ? t("over")
                    : `${t("finish")} ${
                        moment
                          .duration(
                            moment(collect?.item?.endsAt).diff(moment())
                          )
                          .asMilliseconds() > 0
                          ? `${moment
                              .utc(moment(collect?.item?.endsAt).diff(moment()))
                              .format("H [hrs]")} and ${moment
                              .utc(moment(collect?.item?.endsAt).diff(moment()))
                              .format("m [min]")}`
                          : "0 hrs and 0 min"
                      }`}
                </div>
              )}
              {Number(collect?.item?.collectLimit) > 0 && (
                <div className="relative w-fit h-fit flex items-center justify-center font-din text-base text-center">
                  {collect?.stats} / {collect?.item?.collectLimit}
                </div>
              )}
              {collect?.item?.amount &&
                Number(collect?.item?.amount?.value) > 0 && (
                  <div className="relative w-fit h-fit flex items-center justify-center flex-row gap-2 font-din text-base text-sol">
                    <div className="relative w-fit h-fit flex items-center justify-center">
                      {collect?.item?.amount?.value}
                    </div>
                    <div className="relative w-fit h-fit flex items-center justify-center">
                      {collect?.item?.amount?.asset?.symbol}
                    </div>
                  </div>
                )}
            </div>
          ) : (
            <div
              className={`relative rounded-md flex flex-col gap-5 w-5/6 p-2 items-center justify-center w-full h-fit font-firaB text-black text-sm`}
            >
              <div className="relative w-fit h-fit flex items-center justify-center">
                {t("follow")} {follower?.handle?.suggestedFormatted?.localName}{" "}
                {type == "collect" &&
                  collect?.item?.followerOnly &&
                  !follower?.operations?.isFollowedByMe?.value &&
                  t("collect")}
              </div>
              <div className="relative w-3/4 xl:w-1/2 items-center justify-center rounded-md border border-black h-60 flex">
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/Qme8vMm6zfkXVctNLZh9zUdH7UYy8B27dnhr2YC6uvPL5H`}
                  objectFit="cover"
                  layout="fill"
                  className="rounded-md"
                  draggable={false}
                />
              </div>
              {follower?.followModule &&
                Number(
                  (follower?.followModule as FeeFollowModuleSettings)?.amount
                    .value
                ) > 0 && (
                  <div className="relative w-fit h-fit flex items-center justify-center flex-row gap-2 font-din text-base">
                    <div className="relative w-fit h-fit flex items-center justify-center">
                      {
                        (follower?.followModule as FeeFollowModuleSettings)
                          ?.amount?.value
                      }
                    </div>
                    <div className="relative w-fit h-fit flex items-center justify-center">
                      {
                        (follower?.followModule as FeeFollowModuleSettings)
                          ?.amount?.asset?.symbol
                      }
                    </div>
                  </div>
                )}
            </div>
          )}
          <div
            className={`relative w-28 h-8 py-1 px-2 border border-black rounded-md font-din text-black bg-lightYellow flex items-center justify-center text-xs ${
              !transactionLoading &&
              !informationLoading &&
              "cursor-pointer active:scale-95"
            }`}
            onClick={() =>
              !transactionLoading &&
              !informationLoading &&
              (!approved &&
              type === "collect" &&
              (!collect?.item?.followerOnly ||
                (follower?.operations?.isFollowedByMe?.value &&
                  collect?.item?.followerOnly))
                ? approveSpend()
                : approved &&
                  ((type === "collect" && !collect?.item?.followerOnly) ||
                    (follower?.operations?.isFollowedByMe?.value &&
                      collect?.item?.followerOnly))
                ? handleCollect()
                : handleFollow())
            }
          >
            <div
              className={`relative w-fit h-fit flex items-center justify-center ${
                (transactionLoading || informationLoading) && "animate-spin"
              }`}
            >
              {transactionLoading || informationLoading ? (
                <AiOutlineLoading size={15} color={"black"} />
              ) : type === "collect" &&
                !approved &&
                type === "collect" &&
                (!collect?.item?.followerOnly ||
                  (follower?.operations?.isFollowedByMe?.value &&
                    collect?.item?.followerOnly)) ? (
                t("app")
              ) : type === "collect" &&
                (!collect?.item?.followerOnly ||
                  (follower?.operations?.isFollowedByMe?.value &&
                    collect?.item?.followerOnly)) ? (
                t("col")
              ) : (
                t("follow")
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowCollect;
