export type UseLayoutResults = {
  randomImages: () => void;
  randomMicrofactory: string | undefined;
  clicked: boolean;
  setClicked: (e: boolean) => void;
};

export type UseF3ManifestoResults = {
  refreshImages: () => void;
  viewMainImage: (e: any) => void;
  mainImage: string;
  imagesURI: string[];
  newImagesURI: string[];
};

export type useCollectionsResult = {
  gallery: Gallery[];
  filterName: (e: any) => void;
  filterCollections: (e: any) => void;
  filterStyle: (e: any) => void;
  clickedStyle: boolean;
  clickedCollection: boolean;
  collectionSelect: string[];
  collectionFilter: string;
  styleSelect: string[];
  styleFilter: string;
  sexSelect: string[];
  filterSex: (e: any) => void;
};

export type useWeb3FashionResults = {
  showImage: string | undefined;
  handleImageState: (e: any) => void;
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
  setOrder: (e: string) => void;
};

export type SearchProps = {
  filterName: (e: any) => void;
  filterCollections: (e: any) => void;
  filterStyle: (e: any) => void;
  collectionSelect: string[];
  styleSelect: string[];
  sexSelect: string[];
  filterSex: (e: any) => void;
};

export interface Gallery {
  name: string;
  image: string;
  collection: string;
  style: string;
  blurred?: string;
  link: string;
  price: number;
  amount: number;
  description: string;
  graph: string;
  styleImage: string;
  edition: string;
  contract: string;
  type: string;
  styleName: string;
  sex: string;
}

export type CollectionProps = {
  shopping: any;
  setOrder: (e: string) => void;
};

export type Web3FashionProps = {
  goShopping: () => void;
};

export type useClearResults = {
  randomMessage: () => void;
  message: string;
};

export type useFormResults = {
  setSubmitSuccess: (e: boolean) => void;
  submitSuccess: boolean;
  handleSubmitForm: (e: any) => Promise<void>;
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
  viewMainImage: (e: any) => void;
  mainImage: string;
  imagesURI: string[];
  newImagesURI: string[];
};

export type SmallBoardProps = {
  refreshImages: () => void;
  viewMainImage: (e: any) => void;
  mainImage: string;
  imagesURI: string[];
  newImagesURI: string[];
};

export type usePreOrderResults = {
  orderIRLChoice: string;
};

export type MetadataProps = {
  token: any;
  connect: any;
  errorMessage: boolean;
  collectNFT: () => Promise<void>;
  isLoading: boolean;
  collectMarket: () => Promise<void>;
  isSuccess: boolean;
  loading: boolean;
  data: boolean;
};

export type CollectProps = {
  token: any;
  connect: any;
  errorMessage: boolean;
  collectNFT: () => Promise<void>;
  isLoading: boolean;
  collectMarket: () => Promise<void>;
  isSuccess: boolean;
  loading: boolean;
  data: boolean;
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
