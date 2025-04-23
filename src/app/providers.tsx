"use client";
import { createContext, SetStateAction, useEffect, useState } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { chains } from "@lens-chain/sdk/viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet, Post, PublicClient } from "@lens-protocol/client";
import {
  Filters,
  Gallery,
  LensConectado,
} from "./components/Common/types/common.types";
import { FACTORY_RANDOM } from "./lib/constants";
import { OracleData } from "./components/Collect/types/collect.types";
import { StorageClient } from "@lens-chain/storage-client";

const queryClient = new QueryClient();

export const ModalContext = createContext<
  | {
      oracleData: OracleData[];
      setOracleData: (e: SetStateAction<OracleData[]>) => void;
      successCheckout: Gallery | undefined;
      setSuccessCheckout: (e: SetStateAction<Gallery | undefined>) => void;
      imageViewer: string | undefined;
      setImageViewer: (e: SetStateAction<string | undefined>) => void;
      signless: boolean;
      setSignless: (e: SetStateAction<boolean>) => void;
      reactBox: { type: string; post: Post } | undefined;
      setReactBox: (
        e: SetStateAction<{ type: string; post: Post } | undefined>
      ) => void;
      createAccount: boolean;
      setCreateAccount: (e: SetStateAction<boolean>) => void;
      randomFactory: string;
      prevURL: string;
      setPrevURL: (e: SetStateAction<string>) => void;
      filters: Filters | undefined;
      setFilters: (e: SetStateAction<Filters | undefined>) => void;
      gallery: Gallery[];
      setGallery: (e: SetStateAction<Gallery[]>) => void;
      isekaiGallery: Gallery[];
      setIsekaiGallery: (e: SetStateAction<Gallery[]>) => void;
      lensClient: PublicClient | undefined;
      lensConectado: LensConectado | undefined;
      storageClient: StorageClient;
      setLensConectado: (e: SetStateAction<LensConectado | undefined>) => void;
      indexar: string | undefined;
      setIndexar: (e: SetStateAction<string | undefined>) => void;
      notification: string | undefined;
      setNotification: (e: SetStateAction<string | undefined>) => void;
    }
  | undefined
>(undefined);

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

export const config = createConfig(
  getDefaultConfig({
    appName: "F3Manifesto",
    walletConnectProjectId: process.env
      .NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
    appUrl: "https://f3manifesto.xyz",
    appIcon: "https://f3manifesto.xyz/favicon.ico",
    chains: [chains.mainnet],
    transports: {
      [chains.mainnet.id]: http("https://rpc.lens.xyz"),
    },
    ssr: true,
  })
);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [lensConectado, setLensConectado] = useState<
    LensConectado | undefined
  >();
  const storageClient = StorageClient.create();
  const [oracleData, setOracleData] = useState<OracleData[]>([]);
  const [lensClient, setLensClient] = useState<PublicClient | undefined>();
  const [notification, setNotification] = useState<string | undefined>();
  const [imageViewer, setImageViewer] = useState<string | undefined>();
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [indexar, setIndexar] = useState<string>();
  const [createAccount, setCreateAccount] = useState<boolean>(false);
  const [signless, setSignless] = useState<boolean>(false);
  const [isekaiGallery, setIsekaiGallery] = useState<Gallery[]>([]);
  const [filters, setFilters] = useState<Filters | undefined>();
  const [prevURL, setPrevURL] = useState<string>("");
  const [reactBox, setReactBox] = useState<
    { type: string; post: Post } | undefined
  >();
  const [successCheckout, setSuccessCheckout] = useState<Gallery | undefined>();

  const [randomFactory, setRandomFactory] = useState<string>("");

  useEffect(() => {
    if (randomFactory == "") {
      setRandomFactory(FACTORY_RANDOM.sort(() => Math.random() - 0.5)[0]);
    }
    if (!lensClient) {
      setLensClient(
        PublicClient.create({
          environment: mainnet,
          storage: window.localStorage,
        })
      );
    }
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          customTheme={{
            "--ck-font-family": '"Nerd Semi", cursive',
          }}
        >
          <ModalContext.Provider
            value={{
              oracleData,
              setOracleData,
              storageClient,
              imageViewer,
              setImageViewer,
              indexar,
              setIndexar,
              signless,
              setSignless,
              createAccount,
              setCreateAccount,
              randomFactory,
              isekaiGallery,
              successCheckout,
              setSuccessCheckout,
              setIsekaiGallery,
              gallery,
              setGallery,
              lensConectado,
              setLensConectado,
              notification,
              setNotification,
              lensClient,
              filters,
              setFilters,
              prevURL,
              setPrevURL,
              reactBox,
              setReactBox,
            }}
          >
            {children}
          </ModalContext.Provider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
