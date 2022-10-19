import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <meta property="og:url" content="https://f3manifesto.xyz/" />
          <meta property="og:title" content="F3Manifesto" />
          <meta property="og:description" content="I Want My Web3 Fashion" />
          <meta property="og:image" content="" />
          <meta property="twitter:card" content="summary" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
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
                  src: url("./fonts/Emiken Regular.ttf");
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
                  src: url("./fonts/Doctor Glitch.otf");
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
                  src: url("./fonts/DIN Condensed Bold.ttf");
                }

                @font-face {
                  font-family: "Futurist";
                  font-weight: 400;
                  src: url("./fonts/Futurist Regular.ttf");
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
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </Html>
    );
  }
}

export default Document;
