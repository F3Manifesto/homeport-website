import { NextRouter } from "next/router";
import { Post, Profile } from "../../../graphql/generated";
import { Action, AnyAction, Dispatch } from "redux";
import { TFunction } from "i18next";
import { I18n } from "next-i18next";

export type SidebarProps = {
  clicked: boolean;
  setClicked: (e: boolean) => void;
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

export type FilmProps = {
  clicked: boolean;
  setClicked: (e: boolean) => void;
  t: TFunction<"common", undefined>;
  i18n: I18n;
};

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
  filterConstants: {
    sexes: string[];
    styles: string[];
    drops: string[];
  };
  t: TFunction<"common", undefined>;
  filterURL: (type: string, newValue: string) => void;
};

export type BoardProps = {
  t: TFunction<"common", undefined>;
  setMainImages: (e: string[]) => void;
  mainImages: string[];
  filterConstants: {
    sexes: string[];
    styles: string[];
    drops: string[];
  };
  router: NextRouter;
  filterURL: (type: string, newValue: string) => void;
  goShopping: () => void;
  mainImage: string;
  setMainImage: (e: string) => void;
};
