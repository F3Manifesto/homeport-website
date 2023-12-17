import { AnyAction, Dispatch } from "redux";
import { Post, PrimaryPublication, Profile, Quote } from "../graphql/generated";
import { NextRouter } from "next/router";
import { PostCollectState } from "../redux/reducers/postCollectSlice";
import { MutableRefObject, SetStateAction } from "react";

export type UseLayoutResults = {
  randomImages: () => void;
  randomMicrofactory: string | undefined;
  clicked: boolean;
  setClicked: (e: boolean) => void;
};

export type UseF3ManifestoResults = {
  refreshImages: () => void;
  viewMainImage: (e: string) => void;
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

export type GalleryProps = {
  gallery: Gallery[];
  router: NextRouter;
  filteredGallery: Gallery[];
  galleryLoading: boolean;
  interactionLoaders: {
    like: boolean;
    mirror: boolean;
  }[];
  mirror: (id: string, index: number) => Promise<void>;
  like: (id: string, hasReacted: boolean, index: number) => Promise<void>;
  quote: (publication: PrimaryPublication) => void;
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
  mirror: (id: string, index: number) => Promise<void>;
  like: (id: string, hasReacted: boolean, index: number) => Promise<void>;
  quote: (publication: PrimaryPublication) => void;
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
  viewMainImage: (e: string) => void;
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
  collect: boolean;
  setCollect: (e: boolean) => void;
};

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
  router: NextRouter;
  commentPostLoading: boolean[];
  postCollect: PostCollectState;
  commentPost: (id: string, main?: boolean) => Promise<void>;
  makePostComment: MakePostComment[];
  setMakePostComment: (e: SetStateAction<MakePostComment[]>) => void;
  id: string;
  height: string;
  imageHeight: string;
  imageWidth: string;
  setContentLoading: (e: SetStateAction<boolean[]>) => void;
  contentLoading: boolean[];
  index: number;
};

export type PostCommentProps = {
  main: boolean;
  dispatch: Dispatch<AnyAction>;
  commentPostLoading: boolean;
  postCollect: PostCollectState;
  commentPost: (id: string, main?: boolean) => Promise<void>;
  makePostComment: MakePostComment;
  setMakePostComment: (e: SetStateAction<MakePostComment[]>) => void;
  id: string;
  height: string;
  imageHeight: string;
  imageWidth: string;
  setContentLoading: (e: SetStateAction<boolean[]>) => void;
  contentLoading: boolean;
  index: number;
};

export type PostQuoteProps = {
  router: NextRouter;
  quote: Quote;
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
  router: NextRouter;
  dispatch: Dispatch<AnyAction>;
  lensConnected: Profile | undefined;
};

export type WhoSwitchProps = {
  type: string;
  dispatch: Dispatch<AnyAction>;
  router: NextRouter;
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
