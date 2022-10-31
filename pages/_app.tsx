import "../styles/globals.css";
import type { AppProps } from "next/app";
import {useEffect, useState, createContext } from "react";
import Footer from "../components/layout/Footer";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "F3Manifesto",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export const GlobalContextDefault = {
  order: "",
  setOrder: (order: string) => {},
};

export const GlobalContext = createContext(GlobalContextDefault);

function MyApp({ Component, pageProps }: AppProps) {
  const [order, setOrder] = useState(GlobalContextDefault.order);
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

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <GlobalContext.Provider
          value={{ order, setOrder}}
        >
          <div className="min-h-screen h-auto min-w-screen w-screen bg-black relative cursor-empire selection:bg-lightYellow selection:text-lightYellow">
            <Component {...pageProps} />
            <Footer />
          </div>
        </GlobalContext.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
