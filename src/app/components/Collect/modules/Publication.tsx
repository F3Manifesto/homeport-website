import { FunctionComponent } from "react";
import moment from "moment";
import { PublicationProps } from "../types/collect.types";
import PostSwitch from "./PostSwitch";
import InteractBar from "./InteractBar";

const Publication: FunctionComponent<PublicationProps> = ({ post, dict }) => {
  return (
    <div
      className={`relative rounded-sm h-fit w-full lg:w-110 px-1 py-3 sm:py-2 sm:px-2 flex flex-col gap-4 sm:gap-2 border items-center justify-between border-black bg-lightYellow`}
      id={post?.id}
    >
      <div className="relative w-full h-fit flex items-center justify-start">
        <div
          className={`relative w-fit h-fit flex font-din text-xxs text-black`}
        >
          <div className={`relative w-fit h-fit flex`}>
            {post?.timestamp && moment(`${post?.timestamp}`).fromNow()}
          </div>
        </div>
      </div>
      <PostSwitch post={post} />
      <InteractBar dict={dict} post={post} />
    </div>
  );
};

export default Publication;
