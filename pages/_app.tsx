import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Suspense, useEffect, useState, createContext } from "react";
import Footer from "../components/layout/Footer";
import Loading from "../components/layout/Loading";

export const GlobalProfileContextDefault = {
  orderIRL: "",
  setOrderIRL: (orderIRL: string) => {},
};

export const GlobalContext = createContext(GlobalProfileContextDefault);

function MyApp({ Component, pageProps }: AppProps) {
  const [orderIRL, setOrderIRL] = useState(
    GlobalProfileContextDefault.orderIRL
  );
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
    <Suspense fallback={Loading}>
      <GlobalContext.Provider value={{ orderIRL, setOrderIRL }}>
        <div className="min-h-screen h-auto min-w-screen w-screen bg-black relative cursor-empire selection:bg-lightYellow selection:text-lightYellow">
          <Component {...pageProps} />
          <Footer />
        </div>
      </GlobalContext.Provider>
    </Suspense>
  );
}

export default MyApp;
