import {
  DropInterface,
  OptionsInterface,
  ProductInterface,
  AddressInterface,
} from "../types/general.types";
import { BASE_URL } from "./constants";

export const getProducts = async (): Promise<
  ProductInterface[] | undefined
> => {
  try {
    const response = await fetch(`${BASE_URL}/api/products`);
    const product: ProductInterface[] = await response.json();
    return product;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const getProduct = async (
  productSlug: string
): Promise<ProductInterface | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${productSlug}`);
    const product: ProductInterface | undefined = await response.json();
    return product;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const addProduct = async (
  ProductTypeData: ProductInterface
): Promise<ProductInterface | undefined> => {
  try {
    const Options: OptionsInterface = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ProductTypeData),
    };
    const response = await fetch(`${BASE_URL}/api/products`, Options);
    const productData: ProductInterface = await response.json();
    return productData;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const updateProduct = async (
  productSlug: string,
  productData: ProductInterface
): Promise<ProductInterface | undefined> => {
  try {
    const Options: OptionsInterface = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    };
    const response = await fetch(
      `${BASE_URL}/api/products/${productSlug}`,
      Options
    );
    const product: ProductInterface = await response.json();
    return product;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const deleteProduct = async (
  productSlug: string
): Promise<ProductInterface | undefined> => {
  try {
    const Options: OptionsInterface = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `${BASE_URL}/api/products/${productSlug}`,
      Options
    );
    const product: ProductInterface = await response.json();
    return product;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const getDropTypes = async (): Promise<DropInterface[] | undefined> => {
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

export const getAddress = async (
  addressId: string
): Promise<AddressInterface | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/api/address/${addressId}`);
    const address: AddressInterface | undefined = await response.json();
    return address;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const addAddress = async (
  AddressTypeData: ProductInterface
): Promise<AddressInterface | undefined> => {
  try {
    const Options: OptionsInterface = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(AddressTypeData),
    };
    const response = await fetch(`${BASE_URL}/api/address`, Options);
    const addressData: AddressInterface = await response.json();
    return addressData;
  } catch (err: any) {
    console.error(err.message);
  }
};
