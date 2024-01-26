import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <meta name="og:image" content="https://f3manifesto.xyz/card.png/" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="preload"
            href="https://www.f3manifesto.xyz/fonts/jacklane_2.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://www.f3manifesto.xyz/fonts/NaNHoloCondensed_TRIAL-Black.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://www.f3manifesto.xyz/fonts/NewYork.otf"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://www.f3manifesto.xyz/fonts/airstrikegrad.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://www.f3manifesto.xyz/fonts/EmikenRegular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://www.f3manifesto.xyz/fonts/Atmosphere-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://www.f3manifesto.xyz/fonts/Alberto-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://www.f3manifesto.xyz/fonts/DoctorGlitch.otf"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://www.f3manifesto.xyz/fonts/Conso-Regular.otf"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://www.f3manifesto.xyz/fonts/Conso-Medium.otf"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://www.f3manifesto.xyz/fonts/Gaia.otf"
            as="font"
            type="font/otf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://www.f3manifesto.xyz/fonts/FiraCode-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://www.f3manifesto.xyz/fonts/FiraCode-Light.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://www.f3manifesto.xyz/fonts/FiraCode-Bold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://www.f3manifesto.xyz/fonts/FiraCode-Medium.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://www.f3manifesto.xyz/fonts/DINCondensedBold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://www.f3manifesto.xyz/fonts/FuturistRegular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @font-face {
                    font-family: "Nan Holo";
                    font-weight: 400;
                    src: url("./fonts/NaNHoloCondensed_TRIAL-Black.ttf");
                }

                @font-face {
                  font-family: "New York";
                  font-weight: 400;
                  src: url("./fonts/NewYork.otf");
                }

                @font-face {
                  font-family: "Air Strike";
                  font-weight: 400;
                  src: url("./fonts/airstrikegrad.ttf");
                }

                @font-face {
                  font-family: "Emiken";
                  font-weight: 400;
                  src: url("./fonts/EmikenRegular.ttf");
                }

                @font-face {
                  font-family: "Atmosphere";
                  font-weight: 400;
                  src: url("./fonts/Atmosphere-Regular.ttf");
                }

                @font-face {
                  font-family: "Alberto";
                  font-weight: 400;
                  src: url("./fonts/Alberto-Regular.ttf");
                }

                @font-face {
                  font-family: "Doctor Glitch";
                  font-weight: 400;
                  src: url("./fonts/DoctorGlitch.otf");
                } 

                @font-face {
                  font-family: "Conso Regular";
                  font-weight: 400;
                  src: url("./fonts/Conso-Regular.otf");
                } 

                @font-face {
                  font-family: "Conso Medium";
                  font-weight: 400;
                  src: url("./fonts/Conso-Medium.otf");
                } 

                @font-face {
                  font-family: "Gaia";
                  font-weight: 400;
                  src: url("./fonts/Gaia.otf");
                } 

                @font-face {
                  font-family: "Fira Code";
                  font-weight: 400;
                  src: url("./fonts/FiraCode-Regular.ttf");
                } 

                @font-face {
                  font-family: "Fira Code Light";
                  font-weight: 400;
                  src: url("./fonts/FiraCode-Light.ttf");
                }

                @font-face {
                  font-family: "Fira Code Bold";
                  font-weight: 400;
                  src: url("./fonts/FiraCode-Bold.ttf");
                }

                @font-face {
                  font-family: "DIN Condensed";
                  font-weight: 400;
                  src: url("./fonts/DINCondensedBold.ttf");
                }

                @font-face {
                  font-family: "Futurist";
                  font-weight: 400;
                  src: url("./fonts/FuturistRegular.ttf");
                }

                @font-face {
                  font-family: "Jack Lane";
                  font-weight: 400;
                  src: url("./fonts/jacklane_2.woff");
                }

                @font-face {
                  font-family: "Fira Medium";
                  font-weight: 400;
                  src: url("./fonts/FiraCode-Medium.ttf");
                }

                .loader {
                  border: 16px solid #f3f3f3;
                  border-top: 16px solid #3498db;
                  border-radius: 50%;
                  width: 130px;
                  height: 130px;
                  animation: spin 2s linear infinite;
                }
                
                @keyframes spin {
                  0%  { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
            `,
            }}
          ></style>
        </Head>
        <body>
          <script>0</script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
