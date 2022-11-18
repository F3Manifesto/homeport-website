import { createSlice } from "@reduxjs/toolkit";

export interface ItemState {
  name?: string;
  description?: string;
  mainImage?: string;
  quantity?: number;
  price?: number;
  token?: string;
  dropType?: string;
  dropFormat?: string[];
  featuredImages?: string[];
  slug?: string;
  totalQuantity?: number;
  amountSold?: number;
}

const initialItemState: ItemState = {
  name: undefined,
  description: undefined,
  mainImage: undefined,
  quantity: undefined,
  price: undefined,
  token: undefined,
  dropType: undefined,
  dropFormat: undefined,
  featuredImages: undefined,
  slug: undefined,
  totalQuantity: undefined,
  amountSold: undefined,
};
export const itemSlice = createSlice({
  name: "item",
  initialState: initialItemState,
  reducers: {
    setItem: (
      state: ItemState,
      {
        payload: {
          actionName,
          actionDescription,
          actionMainImage,
          actionQuantity,
          actionPrice,
          actionToken,
          actionDropType,
          actionDropFormat,
          actionFeaturedImages,
          actionSlug,
          actionDropTotalQuantity,
          actionAmountSold,
        },
      }
    ) => {
      state.name = actionName;
      state.description = actionDescription;
      state.mainImage = actionMainImage;
      state.quantity = actionQuantity;
      state.price = actionPrice;
      state.token = actionToken;
      state.dropType = actionDropType;
      state.dropFormat = actionDropFormat;
      state.featuredImages = actionFeaturedImages;
      state.slug = actionSlug;
      state.totalQuantity = actionDropTotalQuantity;
      state.amountSold = actionAmountSold;
    },
  },
});

export const { setItem } = itemSlice.actions;

export default itemSlice.reducer;
