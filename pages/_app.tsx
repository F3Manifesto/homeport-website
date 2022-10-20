import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Suspense, useEffect } from "react";
import Footer from "../components/layout/Footer";
import Loading from "../components/layout/Loading";
import BlurHash from "../components/layout/BlurHash";
import useBlurHash from "../components/layout/BlurHash";

function MyApp({ Component, pageProps }: AppProps) {
  const {encodeImageToBlurhash} = useBlurHash();
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

    const imagedata = encodeImageToBlurhash(
      "https://ibb.co/W3szpSm"
    );
    console.log(imagedata);
  }, []);

  return (
    <Suspense fallback={Loading}>
      <div className="min-h-screen h-auto min-w-screen w-screen bg-black relative cursor-empire selection:bg-lightYellow selection:text-lightYellow">
        <Component {...pageProps} />
        <Footer />
      </div>
    </Suspense>
  );
}

export default MyApp;
