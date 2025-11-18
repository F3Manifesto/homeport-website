import { Gallery } from "../../Common/types/common.types";

export interface EncryptedData {
  [address: string]: {
    ephemPublicKey: string;
    iv: string;
    ciphertext: string;
  };
}
export interface Order {
  messages: string[];
  tokenIds: string[];
  details: string;
  blockTimestamp: string;
  fulfillment?: {
    address: string;
    zip: string;
    city: string;
    state: string;
    country: string;
    checkoutCurrency: string;
    tamano: string;
  };
  decrypted: boolean;
  buyer: string;
  currency: string;
  orderId: string;
  timestamp: string;
  totalPrice: string;
  collectionId: string;
  postId: string;
  amount: string;
  status: Status;
  isFulfilled: boolean;
  collection: Gallery;
  transactionHash: string;
}

export enum Status {
  Fulfilled = "Fulfilled",
  Shipped = "Shipped",
  Shipping = "Shipping",
  Designing = "Designing",
}
