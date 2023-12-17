import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillBackward } from "react-icons/ai";
import Metadata from "../../components/collect/modules/Metadata";
import Connect from "../../components/collect/modules/Connect";
import Head from "next/head";
import { useRouter } from "next/router";
import useSignIn from "../../components/collect/hooks/useSignIn";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useChainModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNetwork } from "wagmi";
import { setImageViewer } from "../../redux/reducers/ImageLargeSlice";
import { INFURA_GATEWAY } from "../../lib/constants";
import useCollection from "../../components/collect/hooks/useCollection";
import useInteractions from "../../components/collect/hooks/useInteractions";
import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import Quotes from "../../components/collect/modules/Quotes";
import Comments from "../../components/collect/modules/Comments";
import Checkout from "../../components/collect/modules/Checkout";

const Name: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { name } = router.query;
  const dispatch = useDispatch();
  const publicClient = createPublicClient({
    chain: polygon,
    transport: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
  });
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { openAccountModal } = useAccountModal();
  const { address, isConnected } = useAccount();
  const { chain: chainNetwork } = useNetwork();
  const [globalLoading, setGlobalLoading] = useState<boolean>(true);
  const oracleData = useSelector(
    (state: RootState) => state.app.oracleDataReducer.data
  );
  const postCollect = useSelector(
    (state: RootState) => state.app.postCollectReducer
  );
  const walletConnected = useSelector(
    (state: RootState) => state.app.walletConnectedReducer.value
  );
  const lensProfile = useSelector(
    (state: RootState) => state.app.lensConnectedReducer.profile
  );
  const { handleLensSignIn, handleLogout, loginLoading } = useSignIn(
    address,
    isConnected,
    dispatch,
    oracleData,
    lensProfile,
    openAccountModal
  );
  const { collection, collectionLoading, setCollection, collect, setCollect } =
    useCollection(name as string, lensProfile);

  const {
    commentsLoading,
    getMoreComments,
    commentInfo,
    comments,
    quotes,
    getMoreQuotes,
    quoteInfo,
    quotesLoading,
    mirror,
    like,
    interactionsItemsLoading,
    quote, 
  } = useInteractions(
    lensProfile,
    dispatch,
    address,
    publicClient,
    collection,
    setCollection,
    postCollect
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!collectionLoading && !commentsLoading) {
        setGlobalLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [collectionLoading, commentsLoading]);
  return (
    <div className="flex h-full min-h-screen w-full relative cursor-empire selection:bg-lightYellow selection:text-lightYellow bg-gradient-to-b from-lightY via-white to-lightPurple items-start justify-center">
      <Head>
        <title>{name as string}</title>
        <meta
          name="og:url"
          content={`https://f3manifesto.xyz/collect/${(name as string)
            ?.replaceAll(" ", "-")
            ?.toLowerCase()}`}
        />
        <meta name="og:title" content={name as string} />
        <meta
          name="og:description"
          content={collection?.collectionMetadata?.description}
        />
        <meta
          name="og:image"
          content={`${INFURA_GATEWAY}/ipfs/${
            collection?.collectionMetadata?.images?.[0]?.split("ipfs://")?.[1]
          }`}
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="og:url"
          content={`https://f3manifesto.xyz/collect/${(name as string)
            ?.replaceAll(" ", "-")
            ?.toLowerCase()}`}
        />
        <meta
          name="og:image"
          content={`${INFURA_GATEWAY}/ipfs/${
            collection?.collectionMetadata?.images?.[0]?.split("ipfs://")?.[1]
          }`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@f3manifesto" />
        <meta name="twitter:creator" content="@f3manifesto" />
        <meta
          name="twitter:image"
          content={`${INFURA_GATEWAY}/ipfs/${
            collection?.collectionMetadata?.images?.[0]?.split("ipfs://")?.[1]
          }`}
        />
        <meta
          name="twitter:url"
          content={`https://f3manifesto.xyz/collect/${(name as string)
            ?.replaceAll(" ", "-")
            ?.toLowerCase()}`}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="canonical"
          href={`https://f3manifesto.xyz/collect/${(name as string)
            ?.replaceAll(" ", "-")
            ?.toLowerCase()}`}
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>
      <div className="w-full h-full flex flex-col relative items-center justify-start">
        <div className="relative w-full h-fit flex flex-row justify-between gap-4 items-center py-8 px-4">
          <div
            onClick={() => router.back()}
            className="relative w-fit h-fit flex mr-auto text-offBlack font-fira opacity-80 hover:opacity-20 cursor-empireS flex-row gap-2"
          >
            <AiFillBackward
              color="#131313"
              size={25}
              className="float-left mr-2"
            />
            <div className="relative w-fit h-fit flex items-center justify-center">
              Return
            </div>
          </div>
          <div className="w-fit h-fit ml-auto flex items-center justify-center hover:text-offBlue underline underline-offset-4 h-fit relative">
            <Connect
              handleLensSignIn={handleLensSignIn}
              handleLogOut={handleLogout}
              chain={chainNetwork?.id}
              connected={walletConnected}
              openChainModal={openChainModal}
              openConnectModal={openConnectModal}
              lensProfile={lensProfile}
              loginLoading={loginLoading}
            />
          </div>
        </div>
        {globalLoading ? (
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            <div className="w-12 h-12 relative flex items-center justify-center animate-spin">
              <Image
                width={60}
                height={60}
                draggable={false}
                src={`${INFURA_GATEWAY}/ipfs/QmWcaVfpqyRB2BQ9swPHBB85fBTQSjQgoh4LNt1tWTXPmU`}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="relative w-full h-fit flex border-t-4 border-lightWhite px-4 py-7">
              <div className="relative flex items-center justify-start font-jacklane text-4xl sm:text-7xl">
                {collection?.collectionMetadata?.title?.toUpperCase()}
              </div>
            </div>
            <div className="relative w-full flex bg-foot py-8 border-y-8 border-lightWhite flex items-center justify-center">
              <div
                className="relative w-full h-[120vw] sm:h-[90vw] md:[80vw] lg:h-[50vw] bg-lightWhite flex items-center justify-center"
                onClick={() =>
                  dispatch(
                    setImageViewer({
                      actionValue: true,
                      actionImage: `${INFURA_GATEWAY}/ipfs/${
                        collection?.collectionMetadata?.images?.[0]?.split(
                          "ipfs://"
                        )?.[1]
                      }`,
                    })
                  )
                }
              >
                <Image
                  priority
                  layout="fill"
                  objectFit="contain"
                  unoptimized
                  draggable={false}
                  src={`${INFURA_GATEWAY}/ipfs/${
                    collection?.collectionMetadata?.images?.[0]?.split(
                      "ipfs://"
                    )?.[1]
                  }`}
                />
                <div className="absolute bottom-10 w-1/3 h-10 flex items-center justify-center bg-lightYellow"></div>
              </div>
            </div>
            <div className="relative w-full h-full flex flex-col xl:flex-row gap-3 items-center justify-center pt-10 pb-24 cursor-empireA px-5">
              <Metadata
                item={collection}
                collect={collect}
                setCollect={setCollect}
              />
              {collect ? (
                <Checkout />
              ) : (
                <>
                  <Quotes
                    quotes={quotes}
                    getMoreQuotes={getMoreQuotes}
                    quotesLoading={quotesLoading}
                    quoteInfo={quoteInfo}
                    mirror={mirror}
                    like={like}
                    quote={quote}
                    simpleCollect={simpleCollect}
                  />
                  <Comments
                    comments={comments}
                    getMoreComments={getMoreComments}
                    commentsLoading={commentsLoading}
                    commentInfo={commentInfo}
                    mirror={mirror}
                    like={like}
                    quote={quote}
                    simpleCollect={simpleCollect}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Name;
