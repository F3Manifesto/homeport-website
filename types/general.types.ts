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
  setPurchase: () => void;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  quantity: number;
  setQuantity: (e: number) => void;
  featurePrice: number;
  convertedPrice: number;
  currencyTag: string;
  clickedToken: string;
  setClickedToken: (e: string) => void;
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
  randomColor: string[];
  showFormats: boolean;
  setShowFormats: (e: boolean) => void;
  showCategories: boolean;
  setShowCategories: (e: boolean) => void;
  bgColor: number;
};

export type UseTraitsResult = {
  traits: string[];
  values: string[];
};
