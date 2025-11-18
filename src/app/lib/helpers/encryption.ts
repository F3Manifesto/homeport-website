import { EncryptedData } from "@/app/components/Orders/types/orders.types";
import { SigningKey, hashMessage, Wallet, getBytes, hexlify } from "ethers";


const hexToBytes = (hex: string): Uint8Array => {
  return getBytes(hex);
};

const bytesToHex = (bytes: Uint8Array | ArrayBuffer): string => {
  return hexlify(new Uint8Array(bytes));
};

export const getPublicKeyFromSignature = async (
  message: string,
  signature: string
): Promise<string> => {
  const messageHash = hashMessage(message);
  const publicKey = SigningKey.recoverPublicKey(messageHash, signature);
  return publicKey;
};

const deriveAESKey = async (sharedSecret: Uint8Array): Promise<CryptoKey> => {
  const hash = await crypto.subtle.digest("SHA-256", new Uint8Array(sharedSecret));
  return await crypto.subtle.importKey(
    "raw",
    hash,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
};

export const encryptForMultipleRecipients = async (
  data: any,
  recipientPublicKeys: { address: string; publicKey: string }[]
): Promise<EncryptedData> => {
  const dataString = JSON.stringify(data);
  const dataBytes = new TextEncoder().encode(dataString);
  const encryptedData: EncryptedData = {};

  for (const recipient of recipientPublicKeys) {
    const ephemeralWallet = Wallet.createRandom();
    const ephemeralKey = new SigningKey(ephemeralWallet.privateKey);
    const ephemeralPublicKey = ephemeralKey.publicKey;

    const sharedSecret = ephemeralKey.computeSharedSecret(recipient.publicKey);
    const sharedSecretBytes = hexToBytes(sharedSecret);

    const aesKey = await deriveAESKey(sharedSecretBytes);

    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      aesKey,
      dataBytes
    );

    encryptedData[recipient.address.toLowerCase()] = {
      ephemPublicKey: ephemeralPublicKey,
      iv: bytesToHex(iv),
      ciphertext: bytesToHex(encrypted),
    };
  }

  return encryptedData;
};

export const decryptData = async (
  encryptedData: EncryptedData,
  privateKey: string,
  address: string
): Promise<any> => {
  const encrypted = encryptedData[address.toLowerCase()];
  if (!encrypted) {
    throw new Error("No encrypted data found for this address");
  }

  const signingKey = new SigningKey(privateKey);

  const sharedSecret = signingKey.computeSharedSecret(encrypted.ephemPublicKey);
  const sharedSecretBytes = hexToBytes(sharedSecret);

  const aesKey = await deriveAESKey(sharedSecretBytes);

  const iv = hexToBytes(encrypted.iv);
  const ciphertext = hexToBytes(encrypted.ciphertext);

  const ivArray = Uint8Array.from(iv);
  const ciphertextArray = Uint8Array.from(ciphertext);

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: ivArray,
    },
    aesKey,
    ciphertextArray
  );

  const decryptedString = new TextDecoder().decode(decrypted);
  return JSON.parse(decryptedString);
};
