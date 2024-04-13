import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import useCollections from "../components/Home/hooks/useCollections";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { polygon } from "viem/chains";
import { createPublicClient, http } from "viem";
import useInteractions from "../components/Home/hooks/useInteractions";
import RouterChange from "../components/Layout/modules/RouterChange";
import Film from "../components/Home/modules/Film";
import useGeneral from "../components/Home/hooks/useGeneral";
import Board from "../components/Home/modules/Board";
import Image from "next/image";
import { INFURA_GATEWAY, MARQUEE_IMAGES } from "../lib/constants";
import Search from "../components/Home/modules/Search";
import Gallery from "../components/Home/modules/Gallery";
import Marquee from "react-fast-marquee";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: NextPage = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("common");
  const { t: tCollect } = useTranslation("collect");
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const publicClient = createPublicClient({
    chain: polygon,
    transport: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
  });
  const filterConstants = useSelector(
    (state: RootState) => state.app.filterConstantsReducer.constants
  );
  const gallery = useSelector(
    (state: RootState) => state.app.allGalleryReducer.gallery
  );
  const walletConnected = useSelector(
    (state: RootState) => state.app.walletConnectedReducer.value
  );
  const lensProfile = useSelector(
    (state: RootState) => state.app.lensConnectedReducer.profile
  );
  const prevURL = useSelector(
    (state: RootState) => state.app.prevURLReducer.url
  );
  const {
    shopping,
    goShopping,
    filteredGallery,
    galleryLoading,
    handleURL,
    setFilteredGallery,
  } = useCollections(dispatch, router, gallery, lensProfile, prevURL, t);
  const { like, mirror, interactionLoaders } = useInteractions(
    gallery,
    filteredGallery,
    dispatch,
    setFilteredGallery,
    lensProfile,
    publicClient,
    address,
    tCollect
  );
  const {
    clicked,
    setClicked,
    mainImages,
    setMainImages,
    mainImage,
    setMainImage,
    videoImage,
    setVideoImage,
    message,
  } = useGeneral(router);

  if (!galleryLoading && gallery?.length > 0) {
    return (
      <div
        id="cursor"
        className="flex flex-col bg-offBlack h-fit w-full relative justify-start items-center"
      >
        <Head>
          <title>F3Manifesto</title>
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:site_name" content="F3M" />
          <meta
            property="og:image"
            content="https://f3manifesto.xyz/card.png/"
          />
          <meta property="og:type" content="website" />
          <meta name="og:url" content="https://f3manifesto.xyz/" />
          <meta name="og:title" content="F3Manifesto" />
          <meta name="og:description" content="I Want My Web3 Fashion" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@f3manifesto" />
          <meta name="twitter:creator" content="@f3manifesto" />
          <meta
            name="twitter:image"
            content="https://f3manifesto.xyz/card.png/"
          />
          <meta name="twitter:url" content="https://f3manifesto.xyz/" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="canonical" href="https://f3manifesto.xyz/" />
        </Head>
        <Film
          router={router}
          t={t}
          i18n={i18n}
          clicked={clicked}
          setClicked={setClicked}
        />
        <Board
          t={t}
          router={router}
          filterURL={handleURL}
          goShopping={goShopping}
          filterConstants={filterConstants}
          mainImages={mainImages}
          setMainImages={setMainImages}
          mainImage={mainImage}
          setMainImage={setMainImage}
        />
        <div className="w-full h-[400vh] items-center justify-center relative flex bg-offBlack overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              priority
              src={`${INFURA_GATEWAY}/ipfs/QmeNFvYW5eWDBwFgCkpiU6PY18oabkBuj56iDcr1ZU9AY9`}
              objectFit="cover"
              layout="fill"
              draggable={false}
            />
          </div>
          <div className="absolute w-full h-fit top-4 flex items-center justify-between gap-3 flex-col md:flex-row">
            <div className="font-glitch w-full md:w-96 xl:w-72 h-fit relative inline-table flex-col text-sm sm:text-base md:text-lg leading-tight cursor-empireS break-word items-center justify-center pl-2 half:pl-0 half:left-24 text-lightYellow">
              {t("looks")}
              <em className="font-air">,</em> {t("elec")}
            </div>
            <div className="relative w-28 h-fit flex items-center justify-center mr-0">
              <motion.div
                onClick={() => goShopping()}
                variants={{
                  animate: {
                    x: [-485, 485],
                    transition: {
                      x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                      },
                    },
                  },
                }}
                animate="animate"
                className="w-10 h-8 will-change-transform cursor-empireS"
              >
                <Image
                  priority
                  src="/images/carts.gif"
                  layout="fill"
                  draggable={false}
                />
              </motion.div>
            </div>
          </div>
          <div
            className="absolute w-full h-fit justify-center flex leading-tight top-72 mix-blend-hard-light text-[20vw] md:text-[11rem] cursor-empireA text-center items-center p-4"
            id="want"
          >
            {t("want")} <br />
            {t("web3")}
            <br />
            {t("fash")}
          </div>
          <div className="absolute top-2/3 left-2 sm:left-10 w-full h-fit flex flex-row items-center justify-start">
            <div className="relative w-fit h-[25.3rem] flex flex-row items-start justify-center font-holo">
              <div className="relative w-fit h-full rounded-l-md border-l-2 border-t-2 border-b-2 border-white flex items-start justify-between flex-col gap-20">
                <div
                  className={`relative w-fit h-fit flex items-start flex-row gap-3 justify-start`}
                >
                  <div
                    className="absolute left-12 sm:left-24 -top-3 whitespace-nowrap text-offWhite cursor-empireS hover:text-bright flex items-center justify-center"
                    onMouseOver={() =>
                      setVideoImage(
                        "QmQs6MHroLcc5ifmUSdcqUbrPa6emwiBCTVajv9Dm9kh16"
                      )
                    }
                    onMouseLeave={() => setVideoImage(undefined)}
                  >
                    ZK CYPHERPUNK
                  </div>
                </div>
                <div className="relative w-fit h-full flex flex-col items-start justify-between gap-6">
                  {[
                    {
                      title: t("nav"),
                      video: "QmQ8oq5VhKAYQ3iKNtk6SaHiuhw7JfzSHkN46r7QjzioAA",
                    },
                    {
                      title: t("eng"),
                      video: "QmSqg89NzVqBriAZWHBSZPgNBUaLu9saGMSrMLuGiFB7tG",
                    },
                    {
                      title: t("rea"),
                      video: "QmdGa6HZGnZEQY3Riix7FYrpvdTcJNz1mGd4c5qEJyjin4",
                    },
                    {
                      title: t("un"),
                      video: "QmNYRZ5k5R63ZAYQxXzMZexLZ4Fm6ZWGzQAMyecQ5id8Yr",
                    },
                  ].map(
                    (
                      video: { title: string; video: string },
                      index: number
                    ) => {
                      return (
                        <div
                          className={`relative w-fit h-fit flex items-start flex-row gap-3 justify-start`}
                          key={index}
                        >
                          <div
                            className={`relative w-10 sm:w-20 h-0.5 flex items-center justify-center bg-offWhite`}
                          ></div>
                          <div
                            className="absolute left-12 sm:left-24 -top-3 whitespace-nowrap text-offWhite cursor-empireS hover:text-bright flex items-center justify-center"
                            onMouseOver={() => setVideoImage(video.video)}
                            onMouseLeave={() => setVideoImage(undefined)}
                          >
                            {video.title}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
                <div
                  className={`relative w-fit h-fit flex items-start flex-row gap-3 justify-start`}
                >
                  <div
                    className="absolute left-12 sm:left-24 -top-3 whitespace-nowrap text-offWhite cursor-empireS hover:text-bright flex items-center justify-center"
                    onMouseOver={() =>
                      setVideoImage(
                        "QmbSNy3aUmwCzaEutJHDpBMhCy6y75jZEMtwP6KVmz3wVm"
                      )
                    }
                    onMouseLeave={() => setVideoImage(undefined)}
                  >
                    {t("synth")}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex items-center justify-center w-5/6 left-0 sm:w-fit h-fit md:left-60 md:top-auto -top-96">
              {videoImage && (
                <div className="relative rounded-lg h-80 w-full sm:w-96 border-4 border-offBlack flex items-center justify-center bg-offBlack">
                  <video
                    className="object-cover w-full h-full rounded-lg"
                    autoPlay
                    loop
                    key={videoImage}
                    muted
                  >
                    <source src={`${INFURA_GATEWAY}/ipfs/${videoImage}`} />
                  </video>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="w-full h-fit flex items-center justify-center relative flex-col cursor-empireA bg-offWhite pt-2 pb-20 gap-10"
          ref={shopping}
        >
          <div className="w-full h-4 flex items-center justify-center relative bg-grayBlue"></div>
          <Search
            t={t}
            filterURL={handleURL}
            filterConstants={filterConstants}
          />
          <Gallery
            t={t}
            filteredGallery={filteredGallery}
            router={router}
            gallery={gallery}
            galleryLoading={galleryLoading}
            interactionLoaders={interactionLoaders}
            connected={walletConnected}
            lensConnected={lensProfile}
            dispatch={dispatch}
            openConnectModal={openConnectModal}
            mirror={mirror}
            like={like}
          />
        </div>
        <div className="relative w-full h-[275vh] flex bg-offWhite items-center justify-center">
          <div
            className={`w-full h-full relative flex items-center justify-center`}
          >
            <Image
              src={`${INFURA_GATEWAY}/ipfs/QmQdKuK1f2VmEBoXr7nWr9dEjZo4B2WSRoUs65WxJ5KEzL`}
              priority
              layout="fill"
              objectFit="cover"
              objectPosition={"left"}
              draggable={false}
            />
          </div>
          <div className="absolute bottom-20 right-5 sm:right-10 grid auto-rows-auto grid-flow-col gap-6">
            <div className="relative col-start-1 md:col-start-2 md:row-start-2 row-start-3 w-fit h-fit">
              <div
                className={`w-40 h-40 galaxy:h-80 galaxy:w-80 border border-lightYellow relative flex items-center justify-center bg-lightYellow`}
              >
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/QmcM8caaAM6Pu7bdiwM6QMkwYJa2hhqsAmJFi8zvZzEQQD`}
                  priority
                  objectFit="cover"
                  layout="fill"
                  draggable={false}
                />
              </div>
            </div>
            <div className="relative col-start-1 row-start-2 w-fit h-fit">
              <div
                className={`w-40 h-40 galaxy:h-80 galaxy:w-80 border border-lightYellow relative flex items-center justify-center`}
              >
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/QmTVMXcjyMNmkMiyUFKxx3iqqdCTMuSpnLCgUS6usLX9Bu`}
                  priority
                  objectFit="cover"
                  layout="fill"
                  draggable={false}
                />
              </div>
            </div>
            <div className="relative col-start-1 md:col-start-2 row-start-1 w-fit h-fit">
              <div
                className={`w-40 h-40 galaxy:h-80 galaxy:w-80 border border-lightYellow relative flex items-center justify-center`}
              >
                <Image
                  src={`${INFURA_GATEWAY}/ipfs/QmcJm2mBZ1SErHEDYro3yJYyyv8aqnjVCt5s7NbqkkcYpC`}
                  priority
                  objectFit="cover"
                  layout="fill"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex w-full h-fit items-center justify-end bg-offWhite">
          <div className="font-gaia break-word text-3xl relative flex items-center justify-center w-fit h-96 px-10 text-right w-40 mr-0">
            {message}
          </div>
        </div>
        <div className="h-72 flex relative w-full bg-offWhite cursor-empireA overflow-hidden pb-10 items-center justify-center">
          <Marquee className="flex" pauseOnHover pauseOnClick direction="right">
            {MARQUEE_IMAGES.map((uri: string, index: number) => {
              return (
                <div
                  key={index}
                  className={`h-60 w-60 relative mr-4 bg-lightYellow`}
                >
                  <Image
                    src={`${INFURA_GATEWAY}/ipfs/${uri}`}
                    objectFit="cover"
                    layout="fill"
                    priority
                    draggable={false}
                  />
                </div>
              );
            })}
          </Marquee>
        </div>
        <div className="relative w-full flex items-center justify-center flex-col flex h-fit">
          <div className="relative w-full h-2 bg-lightYellow flex items-center justify-center"></div>
          <div className="relative w-full h-2 bg-midGray flex items-center justify-center"></div>
        </div>
      </div>
    );
  }

  return <RouterChange />;
};

export default Home;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "collect", "footer"])),
  },
});
