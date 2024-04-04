import { SetStateAction } from "react";
import { Action, AnyAction, Dispatch } from "redux";
import {
  Erc20,
  MultirecipientFeeCollectOpenActionSettings,
  PrimaryPublication,
  Profile,
  Quote,
  SimpleCollectOpenActionModuleInput,
  SimpleCollectOpenActionSettings,
} from "../../../graphql/generated";
import { PostCollectState } from "../../../redux/reducers/postCollectSlice";
import { TFunction } from "i18next";

export interface MakePostComment {
  content: string | undefined;
  images: string[];
  videos: string[];
}

export type InsufficientBalanceProps = {
  dispatch: Dispatch<Action>;
  message: string;
};

export type FollowCollectProps = {
  dispatch: Dispatch<AnyAction>;
  t: TFunction<"collect", undefined>;
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

export type QuoteProps = {
  dispatch: Dispatch<AnyAction>;
  t: TFunction<"collect", undefined>;
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

export type SuccessCheckoutProps = {
  dispatch: Dispatch<Action>;
  image: string;
  t: TFunction<"collect", undefined>;
  lensConnected: Profile | undefined;
};

export type WhoProps = {
  dataLoading: boolean;
  t: TFunction<"collect", undefined>;
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
  t: TFunction<"collect", undefined>;
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
  t: TFunction<"collect", undefined>;
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
  t: TFunction<"collect", undefined>;
};

export type PostCollectGifProps = {
  dispatch: Dispatch<AnyAction>;
  t: TFunction<"collect", undefined>;
  id: string;
  setCollects: (
    e: SetStateAction<SimpleCollectOpenActionModuleInput | undefined>
  ) => void;
  collects: SimpleCollectOpenActionModuleInput | undefined;
  openMeasure: {
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
  t: TFunction<"collect", undefined>;
  dispatch: Dispatch<AnyAction>;
  collectTypes:
    | {
        [key: string]: SimpleCollectOpenActionModuleInput | undefined;
      }
    | undefined;
  openMeasure: {
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
