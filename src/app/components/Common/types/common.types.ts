import { Account, Post, SessionClient } from "@lens-protocol/client";

export type LensConectado = {
  sessionClient?: SessionClient;
  profile?: Account;
};

export interface Filters {
  sexes: string[];
  styles: string[];
  drops: string[];
  portals: { title: string; image: string }[];
}

export interface Gallery {
  amount: string;
  uri: string;
  drop: {
    uri: string;
    metadata: {
      cover: string;
      title: string;
    };
  };
  tokenIdsMinted: string[];
  metadata: {
    style: string;
    sex: string;
    title: string;
    tags: string[];
    prompt: string;
    description: string;
    images: string[];
    access: string[];
    extra: string;
  };
  postId: string;
  acceptedTokens: string[];
  price: string;
  post: Post | undefined;
  collectionId: string;
}

export type BoardProps = {
  dict: any;
  goShopping: () => void;
  handleURL: (type: string, newValue: string) => Promise<void>;
};

export type IsekaiSearchProps = {
  dict: any;
  handleURL: (type: string, newValue: string) => Promise<void>;
};

export type IsekaiGalleryProps = {
  dict: any;
  handleURL: (type: string, newValue: string) => Promise<void>;
  filteredIsekaiGallery: Gallery[];
  galleryLoading: boolean;
};

export type InteractBarProps = {
  dict: any;
  post: Post;
  title: string;
};

export type SearchProps = {
  dict: any;
  handleURL: (type: string, newValue: string) => Promise<void>;
};

export type GalleryProps = {
  dict: any;
  filteredGallery: Gallery[];
  galleryLoading: boolean;
};