import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { createContext, useState } from "react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { store } from "./../redux/store";
import { Provider } from "react-redux";
import { useRef } from "react";

const queryClient = new QueryClient();

export const GlobalContextDefault = {
  quantity: 1,
  setQuantity: (quantity: number) => {},
  itemName: "",
  setItemName: (itemName: string) => {},
  deleteModal: false,
  setDeleteModal: (deleteModal: boolean) => {},
  cantDeleteDrop: false,
  setCantDeleteDrop: (cantDeleteDrop: boolean) => {},
  addPricingModal: false,
  setAddPricingModal: (addPricingModal: boolean) => {},
  cantDeleteAdmin: false,
  setCantDeleteAdmin: (cantDeleteAdmin: boolean) => {},
  mainFile: undefined,
  setMainFile: (cantDeleteAdmin: any) => {},
  featuredFiles: [],
  setFeaturedFiles: (featuredFiles: any) => {},
  clickedFirst: true,
  setClickedFirst: (clickedFirst: boolean) => {},
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
  const [itemName, setItemName] = useState(GlobalContextDefault.itemName);
  const [deleteModal, setDeleteModal] = useState<boolean>(
    GlobalContextDefault.deleteModal
  );
  const [cantDeleteDrop, setCantDeleteDrop] = useState<boolean>(
    GlobalContextDefault.cantDeleteDrop
  );
  const [clickedFirst, setClickedFirst] = useState<boolean>(
    GlobalContextDefault.clickedFirst
  );
  const [addPricingModal, setAddPricingModal] = useState<boolean>(
    GlobalContextDefault.addPricingModal
  );
  const [cantDeleteAdmin, setCantDeleteAdmin] = useState<boolean>(
    GlobalContextDefault.cantDeleteAdmin
  );
  const landTop = useRef<null | HTMLDivElement>(null);
  const handleLandTop = (): void => {
    landTop.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [mainFile, setMainFile] = useState<any>(GlobalContextDefault.mainFile);
  const [featuredFiles, setFeaturedFiles] = useState<any>(
    GlobalContextDefault.featuredFiles
  );
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <GlobalContext.Provider
              value={{
                clickedFirst,
                setClickedFirst,
                quantity,
                setQuantity,
                itemName,
                mainFile,
                setMainFile,
                featuredFiles,
                setFeaturedFiles,
                setItemName,
                addPricingModal,
                setAddPricingModal,
                deleteModal,
                setDeleteModal,
                cantDeleteDrop,
                setCantDeleteDrop,
                setCantDeleteAdmin,
                cantDeleteAdmin,
              }}
            >
              <div className="relative w-screen max-w-screen overflow-hidden h-auto bg-black selection:bg-lBlue">
                <Header landTop={landTop} />
                <Component {...pageProps} handleLandTop={handleLandTop} />
                <Footer />
              </div>
            </GlobalContext.Provider>
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
