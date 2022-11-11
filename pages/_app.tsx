import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { createContext, useState } from "react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

// export const GlobalContextDefault = {
//   buyNow: false,
//   setBuyNow: (buyNow: boolean) => {},
// };

// export const GlobalContext = createContext(GlobalContextDefault);

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
  // const [buyNow, setBuyNow] = useState(GlobalContextDefault.buyNow);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        {/* <GlobalContext.Provider value={{ buyNow, setBuyNow }}> */}
          <div className="relative w-full h-auto bg-black selection:bg-lBlue">
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
        {/* </GlobalContext.Provider> */}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
