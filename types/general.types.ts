import {
  StripeElementsOptions,
  Stripe,
  StripeElements,
} from "@stripe/stripe-js";

export interface AggregatorInterface {
  inputs:
    | []
    | [
        {
          internalType: string;
          name: string;
          type: string;
        }
      ];
  name: string;
  outputs: {
    internalType: string;
    name: string;
    type: string;
  }[];
  stateMutability: string;
  type: string;
}

export type UseBannerResult = {
  imageList: string[];
  currentIndex: number;
  setCurrentIndex: (e: number) => void;
  direction: number;
  setDirection: (e: number) => void;
};

export type UseImageSliderResult = {
  nextImage: () => void;
  imageList: string[];
  imageIndex: number;
  featuredImage: string;
  setFeaturedImage: (e: string) => void;
};

export type UseOrderResult = {
  tokens: string[];
  layoutIndexes: number[];
  setSelectedPrice: (e: string) => void;
  setPurchase: (e: string) => void;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  featurePrice: number;
  convertedPrice: number;
  currencyTag: string;
  clickedToken: string;
  setClickedToken: (e: string) => void;
  setPayment: (e: string) => void;
  payment: string;
};

export type UseOracleResult = {
  data: any;
};

export type PriceProps = {
  tokens: string[];
  featurePrice: number;
  layoutIndexes: number[];
  convertedPrice: number;
  setSelectedPrice: (e: string) => void;
  currencyTag: string;
  clickedToken: string;
  setClickedToken: (e: string) => void;
};

export type UseCollectionTagsResult = {
  categories: string[];
  formats: string[];
  categoryColors: string[];
  formatColors: string[];
  showFormats: boolean;
  setShowFormats: (e: boolean) => void;
  showCategories: boolean;
  setShowCategories: (e: boolean) => void;
};

export type UseTraitsResult = {
  traits: string[];
  values: string[];
};

export type UseGalleryResult = {
  extend: boolean;
  setExtend: (e: boolean) => void;
  gallery: string[];
};

export type UseFeaturedResult = {
  dropFormat: string[];
  dropType: string[];
  formatColors: string[];
  typeColors: string[];
};

export type PaymentButtonProps = {
  payment: string;
  setPurchase: (e: string) => void;
  setPayment: (e: string) => void;
  clickedToken: string;
};

export type UseFiatResult = {
  clientSecret: string;
  options: StripeElementsOptions;
};

export type UseFormResult = {
  handleSubmit: (e: any) => Promise<void>;
  isLoading: boolean;
  stripe: Stripe | null;
  elements: StripeElements | null;
  message: string | undefined;
};

export interface ProductInterface {
  title: string;
  description: string;
  collectionName: string;
  availableFormats: string[];
  relatedCategories: string[];
  sizesAvailable: string[];
  material: string;
  colorVariations: string[];
  keysToUnlock: string;
  formatVariations: string[];
  series: boolean;
  synthModel: string;
  numberIncluded: string;
  props: string[];
  customEmbeddings: string;
  samplingMethod: string;
  sourceIncluded: boolean;
};

export type UseDashboardResult = {
  section: string;
  setSection: (e: string) => void;
  sidebar: string[];
};

export interface DropInterface {
  title: string;
  description: string;
};
