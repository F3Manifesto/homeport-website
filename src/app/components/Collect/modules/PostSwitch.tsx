import {
  ArticleMetadata,
  ImageMetadata,
  StoryMetadata,
  TextOnlyMetadata,
} from "@lens-protocol/client";
import { FunctionComponent, JSX } from "react";
import Text from "./Text";
import Media from "./Media";
import { PostSwitchProps } from "../types/collect.types";

const PostSwitch: FunctionComponent<PostSwitchProps> = ({
  post,
}): JSX.Element => {
  switch (post?.metadata?.__typename) {
    case "ArticleMetadata":
    case "TextOnlyMetadata":
    case "StoryMetadata":
      return (
        <Text
          metadata={
            post?.metadata as ArticleMetadata | StoryMetadata | TextOnlyMetadata
          }
        />
      );

    default:
      return <Media metadata={post?.metadata as ImageMetadata} />;
  }
};

export default PostSwitch;
