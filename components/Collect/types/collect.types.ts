import { ChangeEvent, MutableRefObject, SetStateAction } from "react";
import {
  ArticleMetadataV3,
  Comment,
  ImageMetadataV3,
  Mirror,
  Post,
  Profile,
  Quote,
  StoryMetadataV3,
  TextOnlyMetadataV3,
  VideoMetadataV3,
} from "../../../graphql/generated";
import { Action, AnyAction, Dispatch } from "redux";
import { Gallery } from "../../Home/types/home.types";
import { PostCollectState } from "../../../redux/reducers/postCollectSlice";
import { MakePostComment } from "../../Modals/types/modals.types";
import { NextRouter } from "next/router";
import { TFunction } from "i18next";

export type QuoteCollectProps = {
  quotes: Quote[];
  getMoreQuotes: () => Promise<void>;
  quotesLoading: boolean;
  quoteInfo: {
    hasMore: boolean;
    cursor: string | undefined;
  };
  mirror: (id: string, main: boolean, quote: boolean) => Promise<void>;
  like: (
    id: string,
    hasReacted: boolean,
    main: boolean,
    quote: boolean
  ) => Promise<void>;
  comment: (id: string, main: boolean, quote: boolean) => Promise<void>;
  interactionsLoading: {
    like: boolean;
    mirror: boolean;
    comment: boolean;
    simpleCollect: boolean;
  }[];
  simpleCollect: (
    id: string,
    type: string,
    main: boolean,
    quote: boolean
  ) => Promise<void>;
  dispatch: Dispatch<AnyAction>;
  lensConnected: Profile | undefined;
  interactionsItemsLoading: {
    like: boolean;
    mirror: boolean;
    comment: boolean;
    simpleCollect: boolean;
  }[];
  openItemMirrorChoice: boolean[];
  setOpenItemMirrorChoice: (e: SetStateAction<boolean[]>) => void;
  makeComment: MakePostComment[];
  profileHovers: boolean[];
  setProfileHovers: (e: SetStateAction<boolean[]>) => void;
  setOpenMirrorChoice: (e: SetStateAction<boolean[]>) => void;
  openMirrorChoice: boolean[];
  followLoading: boolean[];
  unfollowProfile: (
    id: string,
    index?: number | undefined,
    quote?: boolean | undefined
  ) => Promise<void>;
  commentsOpen: boolean[];
  setCommentsOpen: (e: SetStateAction<boolean[]>) => void;
  setMakeComment: (e: SetStateAction<MakePostComment[]>) => void;
  postCollect: PostCollectState;
  setMentionProfiles: (e: SetStateAction<Profile[]>) => void;
  mentionProfiles: Profile[];
  setProfilesOpen: (e: SetStateAction<boolean[]>) => void;
  profilesOpen: boolean[];
  caretCoord: {
    x: number;
    y: number;
  };
  t: TFunction<"collect", undefined>;
  setCaretCoord: (e: SetStateAction<{ x: number; y: number }>) => void;
  followProfile: (
    id: string,
    index?: number | undefined,
    quote?: boolean | undefined
  ) => Promise<void>;
  setContentLoading: (
    e: SetStateAction<
      {
        image: boolean;
        video: boolean;
      }[]
    >
  ) => void;
  contentLoading: {
    image: boolean;
    video: boolean;
  }[];
};

export interface Details {
  name: string;
  contact: string;
  address: string;
  zip: string;
  city: string;
  state: string;
  country: string;
  checkoutCurrency: string;
  chosenAmount: number;
}

export type MetadataProps = {
  item: Gallery | undefined;
  t: TFunction<"collect", undefined>;
  approveLoading: boolean;
  setDetails: (e: SetStateAction<Details>) => void;
  openDropdown: boolean;
  setOpenDropdown: (e: SetStateAction<boolean>) => void;
  rate: number;
  isApprovedSpend: boolean;
  approveSpend: () => Promise<void>;
  collectItem: () => Promise<void>;
  collectPostLoading: boolean;
  details: Details;
  like: (
    id: string,
    hasReacted: boolean,
    main: boolean,
    quote: boolean
  ) => Promise<void>;
  dispatch: Dispatch<Action>;
  mirror: (id: string, main: boolean, quote: boolean) => Promise<void>;
  router: NextRouter;
  mainInteractionsLoading: {
    like: boolean;
    mirror: boolean;
  }[];
  walletConnected: boolean;
  lensProfile: Profile | undefined;
  openConnectModal: (() => void) | undefined;
  commentRef: MutableRefObject<HTMLDivElement | null>;
  collectRef: MutableRefObject<HTMLDivElement | null>;
  handleSignIn: () => Promise<void>;
  address: `0x${string}` | undefined;
};

export type ConnectProps = {
  handleLensSignIn: () => Promise<void>;
  openConnectModal: (() => void) | undefined;
  openChainModal: (() => void) | undefined;
  connected: boolean;
  lensProfile: Profile | undefined;
  handleLogOut: () => void;
  loginLoading: boolean;
  chain: number | undefined;
  t: TFunction<"collect", undefined>;
};

export type CommentProps = {
  comments: Comment[];
  quotes: Quote[];
  t: TFunction<"collect", undefined>;
  getMoreComments: () => Promise<void>;
  commentsLoading: boolean;
  commentRef: MutableRefObject<HTMLDivElement | null>;
  commentInfo: {
    hasMore: boolean;
    cursor: string | undefined;
  };
  unfollowProfile: (
    id: string,
    index?: number | undefined,
    quote?: boolean | undefined
  ) => Promise<void>;
  followProfile: (
    id: string,
    index?: number | undefined,
    quote?: boolean | undefined
  ) => Promise<void>;
  comment: (id: string, main: boolean, quote: boolean) => Promise<void>;
  setCommentsOpen: (e: SetStateAction<boolean[]>) => void;
  mirror: (id: string, main: boolean, quote: boolean) => Promise<void>;
  like: (
    id: string,
    hasReacted: boolean,
    main: boolean,
    quote: boolean
  ) => Promise<void>;
  simpleCollect: (
    id: string,
    type: string,
    main: boolean,
    quote: boolean
  ) => Promise<void>;
  dispatch: Dispatch<AnyAction>;
  lensConnected: Profile | undefined;
  setOpenItemMirrorChoice: (e: SetStateAction<boolean[]>) => void;
  commentsOpen: boolean[];
  commentsQuoteOpen: boolean[];
  openItemMirrorChoice: boolean[];
  interactionsLoading: {
    like: boolean;
    mirror: boolean;
    comment: boolean;
    simpleCollect: boolean;
  }[];
  makeComment: MakePostComment[];
  setMakeComment: (e: SetStateAction<MakePostComment[]>) => void;
  mainMakeComment: MakePostComment[];
  setMainMakeComment: (e: SetStateAction<MakePostComment[]>) => void;
  profileHovers: boolean[];
  setProfileHovers: (e: SetStateAction<boolean[]>) => void;
  setOpenMirrorChoice: (e: SetStateAction<boolean[]>) => void;
  openMirrorChoice: boolean[];
  followLoading: boolean[];
  setContentLoading: (
    e: SetStateAction<
      {
        image: boolean;
        video: boolean;
      }[]
    >
  ) => void;
  contentLoading: {
    image: boolean;
    video: boolean;
  }[];
  profilesOpen: boolean[];
  profilesOpenMain: boolean[];
  caretCoordMain: {
    x: number;
    y: number;
  };
  mainInteractionsLoading: {
    like: boolean;
    mirror: boolean;
    comment: boolean;
    simpleCollect: boolean;
  }[];
  caretCoord: {
    x: number;
    y: number;
  };
  setCaretCoord: (e: SetStateAction<{ x: number; y: number }>) => void;
  setCaretCoordMain: (e: SetStateAction<{ x: number; y: number }>) => void;
  setProfilesOpen: (e: SetStateAction<boolean[]>) => void;
  setProfilesOpenMain: (e: SetStateAction<boolean[]>) => void;
  setMentionProfiles: (e: SetStateAction<Profile[]>) => void;
  mentionProfiles: Profile[];
  setMentionProfilesMain: (e: SetStateAction<Profile[]>) => void;
  mentionProfilesMain: Profile[];
  postCollect: PostCollectState;
  setMainContentLoading: (
    e: SetStateAction<
      {
        image: boolean;
        video: boolean;
      }[]
    >
  ) => void;
  mainContentLoading: {
    image: boolean;
    video: boolean;
  }[];
  item: Gallery;
};

export type HoverProfileProps = {
  followLoading: boolean[];
  unfollowProfile: (
    id: string,
    index: number,
    quote?: boolean
  ) => Promise<void>;
  followProfile: (id: string, index: number, quote?: boolean) => Promise<void>;
  publication: Profile;
  parentId: string;
  index: number;
  dispatch: Dispatch<AnyAction>;
  setProfileHovers: (e: SetStateAction<boolean[]>) => void;
  quote?: boolean;
  lensConnected: Profile | undefined;
  bottom: string;
  top: string;
  left: string;
  right: string;
};

export type PublicationProps = {
  item: Post | Comment | Quote | Mirror;
  index: number;
  top: string;
  t: TFunction<"collect", undefined>;
  bottom: string;
  left: string;
  right: string;
  mentionProfiles?: Profile[];
  profilesOpen?: boolean[];
  caretCoord?: {
    x: number;
    y: number;
  };
  setCaretCoord?: (
    e: SetStateAction<{
      x: number;
      y: number;
    }>
  ) => void;
  setMentionProfiles?: (e: SetStateAction<Profile[]>) => void;
  setProfilesOpen?: (e: SetStateAction<boolean[]>) => void;
  lensConnected: Profile | undefined;
  disabled?: boolean;
  postCollect?: PostCollectState;
  main: boolean;
  quote: boolean;
  mirror?: (id: string, main: boolean, quote: boolean) => Promise<void>;
  like?: (
    id: string,
    hasReacted: boolean,
    main: boolean,
    quote: boolean
  ) => Promise<void>;
  comment?: (id: string, main: boolean, quote: boolean) => Promise<void>;
  commentsOpen?: boolean[];
  setCommentsOpen?: (e: SetStateAction<boolean[]>) => void;
  makeComment?: MakePostComment[];
  setMakePostComment?: (e: SetStateAction<MakePostComment[]>) => void;
  simpleCollect?: (
    id: string,
    type: string,
    main: boolean,
    quote: boolean
  ) => Promise<void>;
  interactionsLoading?: {
    like: boolean;
    mirror: boolean;
    comment: boolean;
    simpleCollect: boolean;
  }[];
  setOpenMirrorChoice?: (e: SetStateAction<boolean[]>) => void;
  openMirrorChoice?: boolean[];
  followLoading?: boolean[];
  unfollowProfile?: (id: string, index: number) => Promise<void>;
  followProfile?: (id: string, index: number) => Promise<void>;
  profileHovers?: boolean[];
  setProfileHovers?: (e: SetStateAction<boolean[]>) => void;
  dispatch: Dispatch<AnyAction>;
  setContentLoading?: (
    e: SetStateAction<
      {
        image: boolean;
        video: boolean;
      }[]
    >
  ) => void;
  contentLoading?: {
    image: boolean;
    video: boolean;
  }[];
};

export type PostBarProps = {
  index: number;
  main: boolean;
  quote: boolean;
  lensConnected: Profile | undefined;
  top: string;
  bottom: string;
  left: string;
  right: string;
  mirror?: (id: string, main: boolean, quote: boolean) => Promise<void>;
  like?: (
    id: string,
    hasReacted: boolean,
    main: boolean,
    quote: boolean
  ) => Promise<void>;
  simpleCollect?:
    | ((
        id: string,
        type: string,
        main: boolean,
        quote: boolean
      ) => Promise<void>)
    | undefined;
  item: Post | Quote | Mirror | Comment;
  setOpenMirrorChoice?: (e: SetStateAction<boolean[]>) => void;
  openMirrorChoice?: boolean[];
  commentsOpen: boolean[];
  setCommentsOpen: (e: SetStateAction<boolean[]>) => void;
  disabled?: boolean;
  interactionsLoading?: {
    like: boolean;
    mirror: boolean;
    simpleCollect: boolean;
  };
  setProfileHovers?: (e: SetStateAction<boolean[]>) => void;
  profileHovers?: boolean[];
  followLoading?: boolean[];
  unfollowProfile?: (id: string, index: number) => Promise<void>;
  followProfile?: (id: string, index: number) => Promise<void>;
  dispatch: Dispatch<AnyAction>;
};

export type PostSwitchProps = {
  dispatch: Dispatch<AnyAction>;
  item: Post | Comment | Quote | Mirror;
  disabled: boolean | undefined;
};

export type PostQuoteProps = {
  quote: Quote;
  disabled: boolean;
  dispatch: Dispatch<AnyAction>;
};

export type TextProps = {
  metadata: ArticleMetadataV3 | StoryMetadataV3 | TextOnlyMetadataV3;
};

export type ImageProps = {
  disabled: boolean | undefined;
  dispatch: Dispatch<AnyAction>;
  metadata: ImageMetadataV3 | VideoMetadataV3;
};

export type MediaProps = {
  type: string;
  srcUrl: string;
  srcCover?: string;
  classNameVideo?: string;
  classNameImage?: string;
  classNameAudio?: string;
  objectFit?: string;
  hidden?: boolean;
};

export type WaveFormProps = {
  keyValue: string;
  audio: string;
  video: string;
  type: string;
  upload?: boolean;
  handleMedia?: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
};

export type PostCommentProps = {
  makePostComment: MakePostComment;
  caretCoord: {
    x: number;
    y: number;
  };
  setCaretCoord: (
    e: SetStateAction<{
      x: number;
      y: number;
    }>
  ) => void;
  width: string;
  t: TFunction<"collect", undefined>;
  mentionProfiles: Profile[];
  profilesOpen: boolean;
  setMentionProfiles: (e: SetStateAction<Profile[]>) => void;
  setProfilesOpen: (e: SetStateAction<boolean[]>) => void;
  lensConnected: Profile | undefined;
  postCollect: PostCollectState;
  setMakePostComment: (e: SetStateAction<MakePostComment[]>) => void;
  main: boolean | undefined;
  commentPost: (id: string, main: boolean, quote: boolean) => Promise<void>;
  commentPostLoading: boolean;
  id: string;
  height: string;
  dispatch: Dispatch<AnyAction>;
  imageHeight: string;
  imageWidth: string;
  setContentLoading: (
    e: SetStateAction<
      {
        image: boolean;
        video: boolean;
      }[]
    >
  ) => void;
  contentLoading: {
    image: boolean;
    video: boolean;
  };
  index: number;
};
