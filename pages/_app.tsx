import "../styles/globals.css";
import "./../i18n";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Footer from "../components/Layout/modules/Footer";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Provider } from "react-redux";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { store } from "../redux/store";
import Modals from "../components/Modals/modules/Modals";
import { useRouter } from "next/router";
import RouterChange from "../components/Layout/modules/RouterChange";
import { FACTORY_RANDOM } from "../lib/constants";
import { DefaultSeo } from "next-seo";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    }),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "F3Manifesto",
  chains,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
});

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors,
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log(` **                                                                 
    /**                                                                 
    /**                                                                 
    /**                                                                 
    /**                                                                 
    /**                                                                 
    /**                                                                 
    //                                                                  
     **       **     **     ****     ** **********                      
    /**      /**    ****   /**/**   /**/////**///                       
    /**   *  /**   **//**  /**//**  /**    /**                          
    /**  *** /**  **  //** /** //** /**    /**                          
    /** **/**/** **********/**  //**/**    /**                          
    /**** //****/**//////**/**   //****    /**                          
    /**/   ///**/**     /**/**    //***    /**                          
    //       // //      // //      ///     //                           
     ****     **** **    **                                             
    /**/**   **/**//**  **                                              
    /**//** ** /** //****                                               
    /** //***  /**  //**                                                
    /**  //*   /**   /**                                                
    /**   /    /**   /**                                                
    /**        /**   /**                                                
    //         //    //                                                 
     **       ** ******** ******    ****                                
    /**      /**/**///// /*////**  */// *                               
    /**   *  /**/**      /*   /** /    /*                               
    /**  *** /**/******* /******     ***                                
    /** **/**/**/**////  /*//// **  /// *                               
    /**** //****/**      /*    /** *   /*                               
    /**/   ///**/********/******* / ****                                
    //       // //////// ///////   ////                                 
     ********     **      ******** **      ** **   *******   ****     **
    /**/////     ****    **////// /**     /**/**  **/////** /**/**   /**
    /**         **//**  /**       /**     /**/** **     //**/**//**  /**
    /*******   **  //** /*********/**********/**/**      /**/** //** /**
    /**////   **********////////**/**//////**/**/**      /**/**  //**/**
    /**      /**//////**       /**/**     /**/**//**     ** /**   //****
    /**      /**     /** ******** /**     /**/** //*******  /**    //***
    //       //      // ////////  //      // //   ///////   //      /// `);
  }, []);
  const [routerChangeLoading, setRouterChangeLoading] =
    useState<boolean>(false);
  const [randomFactory, _] = useState<string>(
    FACTORY_RANDOM.sort(() => Math.random() - 0.5)[0]
  );
  const router = useRouter();
  useEffect(() => {
    const handleStart = () => {
      setRouterChangeLoading(true);
    };

    const handleStop = () => {
      setRouterChangeLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  if (routerChangeLoading) {
    return <RouterChange />;
  }

  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <Provider store={store}>
          <div className="h-fit w-full bg-black relative cursor-empire selection:bg-lightYellow selection:text-lightYellow overflow-x-hidden flex flex-col">
            <DefaultSeo
              title="F3Manifesto"
              description="Transcendent nostalgia. Machine & human made. In with gen. AI, web3 fashion & cc0 before it was cool. زن، زندگی، آزادی"
              openGraph={{
                type: "website",
                url: "https://www.f3manifesto.xyz/",
                site_name: "F3Manifesto",
              }}
              twitter={{
                handle: "@f3manifesto",
                site: "@f3manifesto",
                cardType: "summary_large_image",
              }}
            />
            <Component {...pageProps} />
            <Modals />
            <Footer randomFactory={randomFactory} />
            <div style={{ display: "none" }}>
              Web3, Web3 Fashion, Moda Web3, Open Source, CC0, Emma-Jane
              MacKinnon-Lee, Open Source LLMs, DIGITALAX
            </div>
          </div>
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default appWithTranslation(MyApp);
