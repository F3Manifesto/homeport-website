import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillBackward } from "react-icons/ai";
import Metadata from "../../components/Collect/modules/Metadata";
import Connect from "../../components/Collect/modules/Connect";
import Head from "next/head";
import { useRouter } from "next/router";
import useSignIn from "../../components/Collect/hooks/useSignIn";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useChainModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNetwork } from "wagmi";
import { setImageViewer } from "../../redux/reducers/ImageLargeSlice";
import { INFURA_GATEWAY } from "../../lib/constants";
import useCollection from "../../components/Collect/hooks/useCollection";
import useInteractions from "../../components/Collect/hooks/useInteractions";
import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import Quotes from "../../components/Collect/modules/Quotes";
import Comments from "../../components/Collect/modules/Comments";
import useCheckout from "../../components/Collect/hooks/useCheckout";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { useTranslation, withTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Name: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { name } = router.query;
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("collect");
  const client = new LitJsSdk.LitNodeClient({
    litNetwork: "cayenne",
    debug: false,
  });
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
  const prevURL = useSelector(
    (state: RootState) => state.app.prevURLReducer.url
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
  const { collection, collectionLoading, setCollection } = useCollection(
    name as string,
    lensProfile
  );
  const {
    mainInteractionsLoading,
    interactionsItemsLoading,
    interactionsQuotesItemsLoading,
    mirror,
    like,
    simpleCollect,
    commentsLoading,
    getMoreComments,
    commentInfo,
    comments,
    comment,
    quotes,
    getMoreQuotes,
    quotesLoading,
    quoteInfo,
    openItemMirrorChoice,
    setOpenItemMirrorChoice,
    commentsOpen,
    commentsQuoteOpen,
    quoteOpenItemMirrorChoice,
    setQuoteOpenItemMirrorChoice,
    makeQuoteComment,
    makeComment,
    setMakeComment,
    profileHovers,
    profileHoversQuote,
    setProfileHovers,
    setProfileHoversQuote,
    quoteContentLoading,
    setQuoteContentLoading,
    contentLoading,
    setContentLoading,
    mainContentLoading,
    setMainContentLoading,
    setCommentsOpen,
    unfollowProfile,
    followProfile,
    setMainMakeComment,
    mainMakeComment,
    mentionProfiles,
    setMentionProfiles,
    profilesOpen,
    setProfilesOpen,
    caretCoord,
    setCaretCoord,
    caretCoordMain,
    setCaretCoordMain,
    followLoading,
    followLoadingQuote,
    profilesOpenMain,
    mentionProfilesMain,
    setMentionProfilesMain,
    setProfilesOpenMain,
    commentRef,
    collectRef,
    caretCoordQuote,
    setCaretCoordQuote,
    setCommentsQuoteOpen,
    setMentionProfilesQuote,
    mentionProfilesQuote,
    setProfilesOpenQuote,
    profilesOpenQuote,
    setMakeQuoteComment,
  } = useInteractions(
    lensProfile,
    dispatch,
    address,
    publicClient,
    collection,
    setCollection,
    postCollect,
    t
  );

  const {
    openDropdown,
    setOpenDropdown,
    details,
    setDetails,
    approveLoading,
    collectPostLoading,
    isApprovedSpend,
    approveSpend,
    collectItem,
  } = useCheckout(
    collection,
    address,
    lensProfile,
    client,
    publicClient,
    oracleData,
    dispatch,
    t
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!collectionLoading && !commentsLoading) {
        setGlobalLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [collectionLoading, commentsLoading]);

  useEffect(() => {
    const loadTranslations = async () => {
      await i18n.loadNamespaces("common");
    };
    loadTranslations();
  }, [i18n]);

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
        <link rel="icon" href="/favicon.ico" />
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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <div className="w-full h-full flex flex-col relative items-center justify-start">
        <div className="relative w-full h-fit flex flex-row justify-between gap-4 items-center py-8 px-4">
          <div
            onClick={() => router.push(`/${prevURL}`)}
            className="relative w-fit h-fit flex mr-auto text-offBlack font-fira opacity-80 hover:opacity-20 cursor-empireS flex-row gap-2"
          >
            <AiFillBackward
              color="#131313"
              size={25}
              className="float-left mr-2"
            />
            <div className="relative w-fit h-fit flex items-center justify-center">
              {t("return")}
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
              t={t}
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
            <div className="relative w-full h-full flex bg-foot py-8 border-y-8 border-lightWhite flex items-center justify-center p-2">
              <div
                className="relative w-full h-[120vw] sm:h-[90vw] md:[80vw] lg:h-[50vw] bg-lightWhite flex items-center justify-center p-3"
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
                <div className="relative w-full h-full flex items-center justify-center">
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
                </div>
              </div>
            </div>
            <div className="relative w-full h-full flex flex-col gap-3 items-center justify-center pt-10 pb-24 cursor-empireA px-5">
              <Metadata
                collectRef={collectRef}
                commentRef={commentRef}
                like={like}
                t={t}
                address={address}
                handleSignIn={handleLensSignIn}
                dispatch={dispatch}
                mirror={mirror}
                router={router}
                walletConnected={walletConnected}
                lensProfile={lensProfile}
                openConnectModal={openConnectModal}
                mainInteractionsLoading={mainInteractionsLoading}
                item={collection}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                details={details}
                setDetails={setDetails}
                rate={Number(
                  oracleData?.find(
                    (oracle) =>
                      oracle.currency?.toLowerCase() ===
                      details?.checkoutCurrency?.toLowerCase()
                  )?.rate
                )}
                approveLoading={approveLoading}
                collectPostLoading={collectPostLoading}
                isApprovedSpend={isApprovedSpend}
                approveSpend={approveSpend}
                collectItem={collectItem}
              />
              <div className="relative w-full h-fit flex flex-col lg:flex-row gap-2 justify-start items-start">
                {quotes?.length > 0 && (
                  <Quotes
                    quotes={quotes}
                    t={t}
                    interactionsLoading={interactionsQuotesItemsLoading}
                    getMoreQuotes={getMoreQuotes}
                    quotesLoading={quotesLoading}
                    quoteInfo={quoteInfo}
                    mirror={mirror}
                    like={like}
                    dispatch={dispatch}
                    lensConnected={lensProfile}
                    simpleCollect={simpleCollect}
                    interactionsItemsLoading={interactionsQuotesItemsLoading}
                    openItemMirrorChoice={quoteOpenItemMirrorChoice}
                    setOpenItemMirrorChoice={setQuoteOpenItemMirrorChoice}
                    makeComment={makeQuoteComment}
                    profileHovers={profileHoversQuote}
                    setProfileHovers={setProfileHoversQuote}
                    contentLoading={quoteContentLoading}
                    setContentLoading={setQuoteContentLoading}
                    followLoading={followLoadingQuote}
                    caretCoord={caretCoordQuote}
                    setCaretCoord={setCaretCoordQuote}
                    openMirrorChoice={quoteOpenItemMirrorChoice}
                    setOpenMirrorChoice={setQuoteOpenItemMirrorChoice}
                    commentsOpen={commentsQuoteOpen}
                    setCommentsOpen={setCommentsQuoteOpen}
                    comment={comment}
                    postCollect={postCollect}
                    profilesOpen={profilesOpenQuote}
                    setMakeComment={setMakeQuoteComment}
                    setMentionProfiles={setMentionProfilesQuote}
                    setProfilesOpen={setProfilesOpenQuote}
                    followProfile={followProfile}
                    unfollowProfile={unfollowProfile}
                    mentionProfiles={mentionProfilesQuote}
                  />
                )}
                <Comments
                  t={t}
                  dispatch={dispatch}
                  lensConnected={lensProfile}
                  comments={comments}
                  getMoreComments={getMoreComments}
                  commentsLoading={commentsLoading}
                  commentInfo={commentInfo}
                  commentRef={commentRef}
                  mirror={mirror}
                  like={like}
                  comment={comment}
                  simpleCollect={simpleCollect}
                  setOpenItemMirrorChoice={setOpenItemMirrorChoice}
                  commentsOpen={commentsOpen}
                  commentsQuoteOpen={commentsQuoteOpen}
                  openItemMirrorChoice={openItemMirrorChoice}
                  interactionsLoading={interactionsItemsLoading}
                  makeComment={makeComment}
                  profileHovers={profileHovers}
                  setProfileHovers={setProfileHovers}
                  openMirrorChoice={openItemMirrorChoice}
                  setOpenMirrorChoice={setOpenItemMirrorChoice}
                  unfollowProfile={unfollowProfile}
                  followLoading={followLoading}
                  followProfile={followProfile}
                  setCommentsOpen={setCommentsOpen}
                  setMakeComment={setMakeComment}
                  setContentLoading={setContentLoading}
                  contentLoading={contentLoading}
                  postCollect={postCollect}
                  setMentionProfiles={setMentionProfiles}
                  setProfilesOpen={setProfilesOpen}
                  mentionProfiles={mentionProfiles}
                  profilesOpen={profilesOpen}
                  caretCoord={caretCoord}
                  setCaretCoord={setCaretCoord}
                  mainInteractionsLoading={mainInteractionsLoading}
                  setCaretCoordMain={setCaretCoordMain}
                  caretCoordMain={caretCoordMain}
                  profilesOpenMain={profilesOpenMain}
                  mentionProfilesMain={mentionProfilesMain}
                  setMentionProfilesMain={setMentionProfilesMain}
                  setProfilesOpenMain={setProfilesOpenMain}
                  mainMakeComment={mainMakeComment}
                  setMainMakeComment={setMainMakeComment}
                  item={collection!}
                  setMainContentLoading={setMainContentLoading}
                  mainContentLoading={mainContentLoading}
                  quotes={quotes}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default withTranslation()(Name);

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["collect", "footer"])),
  },
});
