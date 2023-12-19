import { Action, AnyAction, Dispatch } from "redux";
import {
  ArticleMetadataV3,
  Comment,
  Erc20,
  ImageMetadataV3,
  Mirror,
  MultirecipientFeeCollectOpenActionSettings,
  Post,
  PrimaryPublication,
  Profile,
  Quote,
  SimpleCollectOpenActionModuleInput,
  SimpleCollectOpenActionSettings,
  StoryMetadataV3,
  TextOnlyMetadataV3,
  VideoMetadataV3,
} from "../graphql/generated";
import { NextRouter } from "next/router";
import { PostCollectState } from "../redux/reducers/postCollectSlice";
import { ChangeEvent, MutableRefObject, SetStateAction } from "react";

export type UseLayoutResults = {
  randomImages: () => void;
  randomMicrofactory: string | undefined;
  clicked: boolean;
  setClicked: (e: boolean) => void;
};

export type UseF3ManifestoResults = {
  refreshImages: () => void;
  setMainImage: (e: string) => void;
  mainImage: string;
  imagesURI: string[];
  newImagesURI: string[];
};

export type useWeb3FashionResults = {
  showImage: string | undefined;
  handleImageState: (e: string) => void;
  imageState: boolean;
  setImageState: (e: boolean) => void;
  setShowImage: (e: string | undefined) => void;
  marqueeVariants: {
    animate: {
      x: number[];
      transition: {
        x: {
          repeat: any;
          repeatType: string;
          duration: number;
          ease: string;
        };
      };
    };
  };
};

export type marqueeVariants = {
  animate: {
    x: number[];
    transition: {
      x: {
        repeat: any;
        repeatType: string;
        duration: number;
        ease: string;
      };
    };
  };
};

export type PostSwitchProps = {
  dispatch: Dispatch<AnyAction>;
  item: Post | Comment | Quote | Mirror;
  disabled: boolean | undefined;
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

export type GalleryProps = {
  gallery: Gallery[];
  router: NextRouter;
  filteredGallery: Gallery[];
  galleryLoading: boolean;
  interactionLoaders: {
    like: boolean;
    mirror: boolean;
  }[];
  mirror: (id: string) => Promise<void>;
  like: (id: string, hasReacted: boolean) => Promise<void>;
  connected: boolean;
  lensConnected: Profile | undefined;
  openConnectModal: (() => void) | undefined;
  dispatch: Dispatch<AnyAction>;
};

export type SearchProps = {
  router: NextRouter;
  filterConstants: {
    sexes: string[];
    styles: string[];
    drops: string[];
  };
  filterURL: (type: string, newValue: string) => void;
};

export interface MakePostComment {
  content: string | undefined;
  images: string[];
  videos: string[];
}

export interface Gallery {
  amount: string;
  uri: string;
  dropMetadata: {
    dropCover: string;
    dropTitle: string;
  };
  soldTokens: string;
  collectionMetadata: {
    style: string;
    sex: string;
    title: string;
    tags: string[];
    prompt: string;
    description: string;
    images: string[];
    access: string[];
  };
  pubId: string;
  profileId: string;
  acceptedTokens: string[];
  prices: string[];
  publication: Post | undefined;
  profile: Profile | undefined;
  collectionId: string;
}

export type CollectionProps = {
  shopping: MutableRefObject<HTMLDivElement | null>;
  router: NextRouter;
  gallery: Gallery[];
  galleryLoading: boolean;
  filteredGallery: Gallery[];
  filterURL: (type: string, newValue: string) => void;
  filterConstants: {
    sexes: string[];
    styles: string[];
    drops: string[];
  };
  interactionLoaders: {
    like: boolean;
    mirror: boolean;
  }[];
  mirror: (id: string) => Promise<void>;
  like: (id: string, hasReacted: boolean) => Promise<void>;
  connected: boolean;
  lensConnected: Profile | undefined;
  dispatch: Dispatch<AnyAction>;
  openConnectModal: (() => void) | undefined;
};

export type Web3FashionProps = {
  goShopping: () => void;
};

export type useClearResults = {
  randomMessage: () => void;
  message: string;
};

export type shoppingAnimate = {
  x: number[];
  transition: {
    x: {
      repeat: any;
      repeatType: string;
      duration: number;
      ease: string;
    };
  };
};

export type MainBoardProps = {
  refreshImages: () => void;
  setMainImage: (e: string) => void;
  mainImage: string;
  filterConstants: {
    sexes: string[];
    styles: string[];
    drops: string[];
  };
  filterURL: (type: string, newValue: string) => void;
  newImagesURI: string[];
  goShopping: () => void;
};

export type PinBoardProps = {
  goShopping: () => void;
  filterURL: (type: string, newValue: string) => void;
  filterConstants: {
    sexes: string[];
    styles: string[];
    drops: string[];
  };
};

export type F3ManifestoProps = {
  goShopping: () => void;
  filterConstants: {
    sexes: string[];
    styles: string[];
    drops: string[];
  };
  filterURL: (type: string, newValue: string) => void;
};

export type MetadataProps = {
  item: Gallery | undefined;
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
};

export interface AuthSig {
  sig: any;
  derivedVia: string;
  signedMessage: string;
  address: string;
}

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

export type useMetadataResults = {
  collectNFT: () => Promise<void>;
  collectMarket: () => Promise<void>;
  errorState: boolean;
  prepareNFTDataCollection: (
    address: string,
    price: number,
    amount: number
  ) => void;
  prepareNFTDataMarket: (
    address: string,
    price: number,
    amount: number
  ) => void;
  errorMessage: boolean;
  setAbiFunction: (e: string) => void;
  isLoading: boolean;
  loading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: boolean;
};

export type useApproveResults = {
  prepareApproval: () => void;
  approveAddress: () => Promise<void>;
  isLoading: boolean;
  loading: boolean;
  isSuccess: boolean;
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
};

export interface OracleData {
  currency: string;
  rate: string;
  wei: string;
}

export type ImageLargeProps = {
  mainImage: string;
  dispatch: Dispatch<AnyAction>;
};

export type IndexProps = {
  message: string;
};

export type InteractErrorProps = {
  dispatch: Dispatch<AnyAction>;
};

export type QuoteProps = {
  dispatch: Dispatch<AnyAction>;
  postCollect: PostCollectState;
  quote: PrimaryPublication | undefined;
  makePost: MakePostComment[];
  post: () => Promise<void>;
  lensConnected: Profile | undefined;
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
  profilesOpen: boolean[];
  mentionProfiles: Profile[];
  setMentionProfiles: (e: SetStateAction<Profile[]>) => void;
  setProfilesOpen: (e: SetStateAction<boolean[]>) => void;
  setMakePost: (e: SetStateAction<MakePostComment[]>) => void;
  postLoading: boolean[];
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

export type PostQuoteProps = {
  quote: Quote;
  disabled: boolean;
  dispatch: Dispatch<AnyAction>;
};

export type WhoProps = {
  dataLoading: boolean;
  reactors: any[];
  quoters: Quote[];
  hasMore: boolean;
  hasMoreQuote: boolean;
  showMore: () => void;
  mirrorQuote: boolean;
  setMirrorQuote: (e: SetStateAction<boolean>) => void;
  type: string;
  dispatch: Dispatch<AnyAction>;
  lensConnected: Profile | undefined;
};

export type WhoSwitchProps = {
  type: string;
  dispatch: Dispatch<AnyAction>;
  reactors: any[];
  quoters: Quote[];
  hasMore: boolean;
  hasMoreQuote: boolean;
  mirrorQuote: boolean;
  showMore: () => void;
  lensConnected: Profile | undefined;
};

export type LensConnectProps = {
  loginLoading: boolean;
  handleLensSignIn: () => Promise<void>;
  dispatch: Dispatch<AnyAction>;
  connected: boolean;
};

export type PublicationProps = {
  item: Post | Comment | Quote | Mirror;
  index: number;
  top: string;
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

export type PostCollectGifProps = {
  dispatch: Dispatch<AnyAction>;
  id: string;
  setCollects: (
    e: SetStateAction<SimpleCollectOpenActionModuleInput | undefined>
  ) => void;
  collects: SimpleCollectOpenActionModuleInput | undefined;
  openMeasure: {
    collectibleOpen: boolean;
    collectible: string;
    award: string;
    whoCollectsOpen: boolean;
    creatorAwardOpen: boolean;
    currencyOpen: boolean;
    editionOpen: boolean;
    edition: string;
    timeOpen: boolean;
    time: string;
  };
  setOpenMeasure: (
    e: SetStateAction<{
      collectibleOpen: boolean;
      collectible: string;
      award: string;
      whoCollectsOpen: boolean;
      creatorAwardOpen: boolean;
      currencyOpen: boolean;
      editionOpen: boolean;
      edition: string;
      timeOpen: boolean;
      time: string;
    }>
  ) => void;
  availableCurrencies: Erc20[];
  collectTypes:
    | {
        [key: string]: SimpleCollectOpenActionModuleInput | undefined;
      }
    | undefined;
};

export type CollectOptionsProps = {
  id: string;
  dispatch: Dispatch<AnyAction>;
  collectTypes:
    | {
        [key: string]: SimpleCollectOpenActionModuleInput | undefined;
      }
    | undefined;
  openMeasure: {
    collectibleOpen: boolean;
    collectible: string;
    award: string;
    whoCollectsOpen: boolean;
    creatorAwardOpen: boolean;
    currencyOpen: boolean;
    editionOpen: boolean;
    edition: string;
    timeOpen: boolean;
    time: string;
  };
  setOpenMeasure: (
    e: SetStateAction<{
      collectibleOpen: boolean;
      collectible: string;
      award: string;
      whoCollectsOpen: boolean;
      creatorAwardOpen: boolean;
      currencyOpen: boolean;
      editionOpen: boolean;
      edition: string;
      timeOpen: boolean;
      time: string;
    }>
  ) => void;
  availableCurrencies: Erc20[];
};

export type InteractBarProps = {
  token: Gallery;
  like:
    | ((id: string, hasReacted: boolean) => Promise<void>)
    | ((
        id: string,
        hasReacted: boolean,
        main: boolean,
        quote: boolean
      ) => Promise<void>);
  dispatch: Dispatch<Action>;
  mirror:
    | ((id: string) => Promise<void>)
    | ((id: string, main: boolean, quote: boolean) => Promise<void>);
  router: NextRouter;
  index: number;
  interactionLoaders: {
    like: boolean;
    mirror: boolean;
  }[];
  connected: boolean;
  lensConnected: Profile | undefined;
  openConnectModal: (() => void) | undefined;
  left?: string;
  bottom?: string;
  hideComment?: () => void;
  hideCollect?: () => void;
  absolute?: boolean;
  main: boolean;
};

export type InsufficientBalanceProps = {
  dispatch: Dispatch<Action>;
  message: string;
};

export type SuccessCheckoutProps = {
  dispatch: Dispatch<Action>;
  image: string;
  lensConnected: Profile | undefined;
};

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

export type CommentProps = {
  comments: Comment[];
  quotes: Quote[];
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

export type FollowCollectProps = {
  dispatch: Dispatch<AnyAction>;
  type: string;
  collect:
    | {
        item:
          | SimpleCollectOpenActionSettings
          | MultirecipientFeeCollectOpenActionSettings
          | undefined;
        stats: number | undefined;
        id: string;
      }
    | undefined;
  follower: Profile | undefined;
  handleFollow: () => Promise<void>;
  handleCollect: () => Promise<void>;
  approveSpend: () => Promise<void>;
  transactionLoading: boolean;
  informationLoading: boolean;
  approved: boolean;
};
