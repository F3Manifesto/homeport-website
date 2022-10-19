import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useMemo, useRef } from "react";
import Footer from "../components/layout/Footer";

function MyApp({ Component, pageProps }: AppProps) {

  // const fakeRequest = () => {
  //   return new Promise<void>(resolve => setTimeout(() => resolve(), 2500));
  // };

  // const componentDidMount = () => {
  //   fakeRequest().then(() => {
  //     const el = document.querySelector(".loader-container");
  //     if (el) {
  //       el.remove(); 
  //       console.log("here") // removing the spinner element
  //     }
  //   });
  // }
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
    
  }, []);

  

  return (
    <div className="min-h-screen h-auto min-w-screen w-screen bg-black relative cursor-empire selection:bg-lightYellow selection:text-lightYellow">
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
