import { createSlice } from "@reduxjs/toolkit";

export interface SoldAmountState {
  name?: string;
  description?: string;
  dropType?: string;
  dropFormat?: string[];
  quantity?: number;
  mainImage?: string;
  featuredImages?: string[];
  slug?: string;
  soldOut?: boolean;
}

const initialSoldAmountState: SoldAmountState = {
  name: undefined,
  description: undefined,
  dropType: undefined,
  dropFormat: undefined,
  quantity: undefined,
  mainImage: undefined,
  featuredImages: undefined,
  slug: undefined,
  soldOut: undefined,
};
export const soldAmountSlice = createSlice({
  name: "soldAmount",
  initialState: initialSoldAmountState,
  reducers: {
    setSoldAmount: (
      state: SoldAmountState,
      {
        payload: {
          actionName,
          actionDescription,
          actionDropType,
          actionDropFormat,
          actionQuantity,
          actionMainImage,
          actionFeaturedImages,
          actionSlug,
          actionSoldOut,
        },
      }
    ) => {
      state.name = actionName;
      state.description = actionDescription;
      state.dropType = actionDropType;
      state.dropFormat = actionDropFormat;
      state.quantity = actionQuantity;
      state.mainImage = actionMainImage;
      state.featuredImages = actionFeaturedImages;
      state.slug = actionSlug;
      state.soldOut = actionSoldOut;
    },
  },
});

export const { setSoldAmount } = soldAmountSlice.actions;

export default soldAmountSlice.reducer;
