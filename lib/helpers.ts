import {
  DropInterface,
  OptionsInterface,
  ProductInterface,
  AddressInterface,
  UserInterface,
  CurrencyInterface,
  PaymentInterface,
  DraftInterface,
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
  AddressTypeData: AddressInterface
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

export const getUsers = async (): Promise<UserInterface[] | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/api/user`);
    const users: UserInterface[] = await response.json();
    return users;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const addUser = async (
  UserTypeData: UserInterface
): Promise<UserInterface | undefined> => {
  try {
    const Options: OptionsInterface = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(UserTypeData),
    };
    const response = await fetch(`${BASE_URL}/api/user`, Options);
    const userData: UserInterface = await response.json();
    return userData;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const addCurrency = async (
  CurrencyTypeData: CurrencyInterface
): Promise<CurrencyInterface | undefined> => {
  try {
    const Options: OptionsInterface = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(CurrencyTypeData),
    };
    const response = await fetch(`${BASE_URL}/api/currency`, Options);
    const currencyData: CurrencyInterface = await response.json();
    return currencyData;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const getCurrency = async (
  currencySlug: string
): Promise<CurrencyInterface | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/api/currency/${currencySlug}`);
    const currency: CurrencyInterface | undefined = await response.json();
    return currency;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const updateCurrency = async (
  currencySlug: string,
  currencyData: CurrencyInterface
): Promise<CurrencyInterface | undefined> => {
  try {
    const Options: OptionsInterface = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currencyData),
    };
    const response = await fetch(
      `${BASE_URL}/api/currency/${currencySlug}`,
      Options
    );
    const currency: CurrencyInterface = await response.json();
    return currency;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const getCurrencies = async (): Promise<
  CurrencyInterface[] | undefined
> => {
  try {
    const response = await fetch(`${BASE_URL}/api/currency`);
    const currencies: CurrencyInterface[] = await response.json();
    return currencies;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const deleteUser = async (
  userId: string
): Promise<UserInterface | undefined> => {
  try {
    const Options: OptionsInterface = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`${BASE_URL}/api/user/${userId}`, Options);
    const user: UserInterface = await response.json();
    return user;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const addPaymentAdmin = async (
  adminPaymentDataType: PaymentInterface
): Promise<PaymentInterface | undefined> => {
  try {
    const Options: OptionsInterface = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminPaymentDataType),
    };
    const response = await fetch(`${BASE_URL}/api/payments`, Options);
    const currencyData: PaymentInterface = await response.json();
    return currencyData;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const updatePaymentAdmin = async (
  paymentId: string,
  paymentAdminData: PaymentInterface
): Promise<PaymentInterface | undefined> => {
  try {
    const Options: OptionsInterface = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentAdminData),
    };
    const response = await fetch(
      `${BASE_URL}/api/payments/${paymentId}`,
      Options
    );
    const paymentType: PaymentInterface = await response.json();
    return paymentType;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const getPaymentAdmins = async (): Promise<
  PaymentInterface[] | undefined
> => {
  try {
    const response = await fetch(`${BASE_URL}/api/payments`);
    const paymentAdminType: PaymentInterface[] = await response.json();
    return paymentAdminType;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const getDrafts = async (): Promise<DraftInterface[] | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/api/drafts`);
    const drafts: DraftInterface[] = await response.json();
    return drafts;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const getDraft = async (
  draftId: string
): Promise<DraftInterface | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/api/drafts/${draftId}`);
    const draft: DraftInterface | undefined = await response.json();
    return draft;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const addDraft = async (
  draftData: DraftInterface
): Promise<DraftInterface | undefined> => {
  try {
    const Options: OptionsInterface = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draftData),
    };
    const response = await fetch(`${BASE_URL}/api/drafts`, Options);
    const draft: DraftInterface = await response.json();
    return draft;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const updateDraft = async (
  draftId: string,
  draftData: DraftInterface
): Promise<DraftInterface | undefined> => {
  try {
    const Options: OptionsInterface = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draftData),
    };
    const response = await fetch(`${BASE_URL}/api/drafts/${draftId}`, Options);
    const draft: DraftInterface = await response.json();
    return draft;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const deleteDraft = async (
  draftId: string
): Promise<DraftInterface | undefined> => {
  try {
    const Options: OptionsInterface = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`${BASE_URL}/api/drafts/${draftId}`, Options);
    const draft: DraftInterface = await response.json();
    return draft;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const getAddresses = async (): Promise<
  AddressInterface[] | undefined
> => {
  try {
    const response = await fetch(`${BASE_URL}/api/address`);
    const addresses: AddressInterface[] = await response.json();
    return addresses;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const updateAddress = async (
  addressId: string,
  addressData: AddressInterface
): Promise<AddressInterface | undefined> => {
  try {
    const Options: OptionsInterface = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addressData),
    };
    const response = await fetch(
      `${BASE_URL}/api/address/${addressId}`,
      Options
    );
    const address: AddressInterface = await response.json();
    return address;
  } catch (err: any) {
    console.error(err.message);
  }
};
