import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useMemo, useRef } from "react";
import Footer from "../components/layout/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const isMounted = useRef(false);
  useMemo(() => {
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
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader) loader.remove();
    }
    console.log(isMounted)
    isMounted.current = true;
    console.log(isMounted)
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <>
      {
        isMounted ? <div className="min-h-auto h-auto min-w-screen w-screen bg-black relative cursor-empire selection:bg-lightYellow selection:text-lightYellow">
      <Component {...pageProps} />
      <Footer />
    </div> : <div>
        heyooooo
    </div>
      }
    </>
    
  );
}

export default MyApp;
