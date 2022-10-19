import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useMemo, useRef,  } from "react";
import Footer from "../components/layout/Footer";
import Router, { useRouter } from "next/router";
import { useTransitionFix } from "./_transition";

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

  const router = useRouter()

  const savePageStyles = () => {
    const head = document.head
    const previousStylesFixes = head.querySelectorAll('[data-fix]')

    // Delete previously created fixes
    if (previousStylesFixes) {
      for (let i = 0; i < previousStylesFixes.length; i++) {
        head.removeChild(previousStylesFixes[i])
      }
    }

    // Get all the styles of the page
    const allStyleElems: any = head.querySelectorAll(
      'link[rel="stylesheet"], link[as="style"]'
    )
    // Get all the inline styles of the page, labelled by "data-n-href" ( defined by nextjs )
    const allInlineStylesElems = head.querySelectorAll('style[data-n-href]')

    // Create doubling links to css sheets that wont be removed unless we say so
    if (allStyleElems) {
      for (let i = 0; i < allStyleElems.length; i++) {
        if (allStyleElems[i].href) {
          const styles = document.createElement('link')
          styles.setAttribute('data-pt-fix', 'true')
          styles.setAttribute('rel', 'stylesheet')
          styles.setAttribute('href', allStyleElems[i].href)

          head.appendChild(styles)
        }
      }
    }

    // Now do the same with the inline styles
    const inlineStyles = document.createElement('style')
    inlineStyles.setAttribute('data-pt-fix', 'true')
    if (allInlineStylesElems) {
      for (let i = 0; i < allInlineStylesElems.length; i++) {
        inlineStyles.innerHTML += allInlineStylesElems[i].innerHTML
      }

      head.appendChild(inlineStyles)
    }
  }
  
  useEffect(() => {
    const handleDone = () => {
      // Arbitrary setTimeout, modify it at will
      setTimeout(() => {
        savePageStyles()
      }, 1000)
    }
  
    router.events.on('routeChangeComplete', handleDone)
  
    return () => {
      router.events.off('routeChangeComplete', handleDone)
    }
  }, [router])
  return (
    <div className="min-h-screen h-auto min-w-screen w-screen bg-black relative cursor-empire selection:bg-lightYellow selection:text-lightYellow">
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
