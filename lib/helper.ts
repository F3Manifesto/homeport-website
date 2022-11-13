import { DropInterface, ProductInterface } from "../types/general.types";
import { BASE_URL } from "./constants";

export const getProduct = async (): Promise<ProductInterface | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/api/product`);
    const product: ProductInterface[] = await response.json();
    return product;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const getDropType = async (): Promise<DropInterface | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/api/droptypes`);
    const dropType: DropInterface[] = await response.json();
    return dropType;
  } catch (err: any) {
    console.error(err.message);
  }
};
