import { ChangeEvent, RefObject } from "react";
import { Gallery } from "../../Common/types/common.types";
import {
  ArticleMetadata,
  AudioMetadata,
  ImageMetadata,
  Post,
  StoryMetadata,
  TextOnlyMetadata,
  VideoMetadata,
} from "@lens-protocol/client";

export interface Details {
  address: string;
  zip: string;
  city: string;
  state: string;
  country: string;
  checkoutCurrency: string;
  tamano: string;
}

export interface OracleData {
  currency: string;
  rate: string;
  wei: string;
}

export type MetadataProps = {
  item: Gallery;
  dict: any;
  lang: string;
  post: Post | undefined;
};

export type InteractBarProps = {
  dict: any;
  post: Post | undefined;
};

export type PublicationProps = {
  post: Post;
  dict: any;
};

export type TextProps = {
  metadata: ArticleMetadata | StoryMetadata | TextOnlyMetadata;
};

export type WaveFormProps = {
  keyValue: string;
  audio: string;
  video: string;
  type: string;
  upload?: boolean;
  handleMedia?: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
};

export type MediaSwitchProps = {
  type: string;
  srcUrl: string;
  srcCover?: string;
  classNameVideo?: string;
  classNameImage?: string;
  classNameAudio?: string;
  objectFit?: string;
  hidden?: boolean;
};

export type PostSwitchProps = {
  post: Post;
};

export type MediaProps = {
  metadata: VideoMetadata | ImageMetadata | AudioMetadata;
};

export type ReferencesProps = {
  post: Post | undefined;
  dict: any;
};

export type CommentProps = {
  dict: any;
  post: Post | undefined;
  getReferences: () => Promise<void>;
};
