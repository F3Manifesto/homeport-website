import type { NextPage } from "next";
import Head from "next/head";
import VintageFilm from "../components/home/video/VintageFilm";
import F3Manifesto from "../components/home/f3manifesto/F3Manifesto";
import Web3Fashion from "../components/home/web3fashion/Web3Fashion";
import Collections from "../components/home/collections/Collections";
import Poster from "../components/home/poster/Poster";
import Clear from "../components/home/clear/Clear";
import Slider from "../components/home/slider/Slider";
import Gap from "../components/home/gap/Gap";
import useCollections from "../components/home/collections/hooks/useCollections";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { polygon } from "viem/chains";
import { createPublicClient, http } from "viem";
import useInteractions from "../components/home/collections/hooks/useInteractions";
import RouterChange from "../components/layout/RouterChange";

const Home: NextPage = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();
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
  } = useCollections(dispatch, router, gallery, lensProfile, prevURL);
  const { like, mirror, interactionLoaders } = useInteractions(
    gallery,
    filteredGallery,
    dispatch,
    setFilteredGallery,
    lensProfile,
    publicClient,
    address
  );

  if (!galleryLoading && gallery?.length > 0) {
    return (
      <div
        id="cursor"
        className="flex flex-col midWhite bg-offBlack h-full min-w-screen"
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
        <VintageFilm />
        <F3Manifesto
          filterURL={handleURL}
          goShopping={goShopping}
          filterConstants={filterConstants}
        />
        <Web3Fashion goShopping={goShopping} />
        <Collections
          filterURL={handleURL}
          shopping={shopping}
          filteredGallery={filteredGallery}
          router={router}
          gallery={gallery}
          filterConstants={filterConstants}
          galleryLoading={galleryLoading}
          interactionLoaders={interactionLoaders}
          connected={walletConnected}
          lensConnected={lensProfile}
          dispatch={dispatch}
          openConnectModal={openConnectModal}
          mirror={mirror}
          like={like}
        />
        <Poster />
        <Clear />
        <Slider />
        <Gap />
      </div>
    );
  }

  return <RouterChange />;
};

export default Home;
