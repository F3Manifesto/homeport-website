import { encryptString } from "@lit-protocol/lit-node-client";
import { ILitNodeClient } from "@lit-protocol/types";
import { DIGITALAX_ADDRESS } from "../constants";
import { Gallery } from "../../components/Home/types/home.types";

export const encryptItems = async (
  client: ILitNodeClient,
  fulfillmentDetails: {
    name: string;
    contact: string;
    address: string;
    zip: string;
    city: string;
    state: string;
    country: string;
    checkoutCurrency: string;
    chosenAmount: number;
    sizes: string[];
  },
  address: `0x${string}`,
  authSig: {
    sig: any;
    derivedVia: string;
    signedMessage: string;
    address: string;
  },
  collection: Gallery
): Promise<
  | {
      pubId: string;
      data: string;
    }[]
  | undefined
> => {
  try {
    let encryptedItems: {
      pubId: string;
      data: string;
    }[] = [];

    let fulfillerEditions: any[] = [];
    fulfillerEditions.push({
      contractAddress: "",
      standardContractType: "",
      chain: "polygon",
      method: "",
      parameters: [":userAddress"],
      returnValueTest: {
        comparator: "=",
        value: address.toLowerCase(),
      },
    });

    fulfillerEditions.push({
      operator: "or",
    });

    const accessControlConditions = [
      ...fulfillerEditions,
      {
        contractAddress: "",
        standardContractType: "",
        chain: "polygon",
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: address?.toLowerCase() as string,
        },
      },
    ];

    const { checkoutCurrency, chosenAmount, ...rest } = fulfillmentDetails;

    const { ciphertext, dataToEncryptHash } = await encryptString(
      {
        accessControlConditions,
        authSig,
        chain: "polygon",
        dataToEncrypt: JSON.stringify({
          ...rest,
          prices: [collection?.prices[0]],
          types: ["f3m"],
          amounts: [chosenAmount],
          collectionIds: [collection?.collectionId],
          fulfillerAddress: [DIGITALAX_ADDRESS],
          origin: "4",
        }),
      },
      client!
    );

    encryptedItems.push({
      pubId: collection?.pubId,
      data: JSON.stringify({
        ciphertext,
        dataToEncryptHash,
        accessControlConditions,
      }),
    });

    return encryptedItems;
  } catch (err: any) {
    console.error(err.message);
  }
};
