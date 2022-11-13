import {
  DropInterface,
  OptionsInterface,
  ProductInterface,
} from "../types/general.types";
import { BASE_URL } from "./constants";

export const getProducts = async (): Promise<ProductInterface | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/api/product`);
    const product: ProductInterface[] = await response.json();
    return product;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const getDropTypes = async (): Promise<DropInterface | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/api/droptypes`);
    const dropType: DropInterface[] = await response.json();
    return dropType;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const getDropType = async (
  dropTypeId: string
): Promise<DropInterface | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/api/droptypes/${dropTypeId}`);
    const dropType: DropInterface | undefined = await response.json();
    return dropType;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const addDropType = async (
  dropTypeData: DropInterface
): Promise<DropInterface | undefined> => {
  try {
    const Options: OptionsInterface = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dropTypeData),
    };
    const response = await fetch(`${BASE_URL}/api/droptypes`, Options);
    const dropType: DropInterface = await response.json();
    return dropType;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const updateDropType = async (
  dropTypeId: string,
  dropTypeData: DropInterface
): Promise<DropInterface | undefined> => {
  try {
    const Options: OptionsInterface = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dropTypeData),
    };
    const response = await fetch(
      `${BASE_URL}/api/droptypes/${dropTypeId}`,
      Options
    );
    const dropType: DropInterface = await response.json();
    return dropType;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const deleteDropType = async (
  dropTypeId: string
): Promise<DropInterface | undefined> => {
  try {
    const Options: OptionsInterface = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `${BASE_URL}/api/droptypes/${dropTypeId}`,
      Options
    );
    const dropType: DropInterface = await response.json();
    return dropType;
  } catch (err: any) {
    console.error(err.message);
  }
};
