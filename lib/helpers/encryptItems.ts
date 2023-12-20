import { encryptString } from "@lit-protocol/lit-node-client";
import { ILitNodeClient } from "@lit-protocol/types";
import { AuthSig, Details, Gallery } from "../../types/general.types";
import {  DIGITALAX_ADDRESS } from "../constants";

export const encryptItems = async (
  client: ILitNodeClient,
  fulfillmentDetails: Details,
  address: `0x${string}`,
  authSig: AuthSig,
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
