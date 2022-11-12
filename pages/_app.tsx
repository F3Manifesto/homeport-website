import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { createContext, useState } from "react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

export const GlobalContextDefault = {
  quantity: 1,
  setQuantity: (quantity: number) => {},
  itemPrice: {price: 0, currency: "USD"},
  setItemPrice: (itemPrice: {price: number, currency: string}) => {},
  itemName: "",
  setItemName: (itemName: string) => {},
};

export const GlobalContext = createContext(GlobalContextDefault);

const { chains, provider } = configureChains(
  [chain.mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "DMS",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [quantity, setQuantity] = useState(GlobalContextDefault.quantity);
  const [itemPrice, setItemPrice] = useState(GlobalContextDefault.itemPrice);
  const [itemName, setItemName] = useState(GlobalContextDefault.itemName);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <GlobalContext.Provider
          value={{ quantity, setQuantity, itemPrice, setItemPrice, itemName, setItemName }}
        >
          <div className="relative w-screen max-w-screen overflow-hidden h-auto bg-black selection:bg-lBlue">
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
        </GlobalContext.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
