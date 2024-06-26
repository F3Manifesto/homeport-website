import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import ImageLarge from "./ImageLarge";
import Index from "./Indexer";
import InteractError from "./InteractError";
import Quote from "./Quote";
import Who from "./Who";
import useWho from "../hooks/useWho";
import useSignIn from "../../Collect/hooks/useSignIn";
import LensConnect from "./LensConnect";
import { useAccount } from "wagmi";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import useQuote from "../hooks/useQuote";
import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import PostCollect from "../../Collect/modules/PostCollect";
import InsufficientBalance from "./InsufficientBalance";
import SuccessCheckout from "./SuccessCheckout";
import FollowCollect from "./FollowCollect";
import { useTranslation } from "next-i18next";

const Modals: FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation("collect");
  const publicClient = createPublicClient({
    chain: polygon,
    transport: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    ),
  });
  const { openAccountModal } = useAccountModal();
  const { address, isConnected } = useAccount();
  const lensConnected = useSelector(
    (state: RootState) => state.app.lensConnectedReducer?.profile
  );
  const lensConnect = useSelector(
    (state: RootState) => state.app.lensConnectModalReducer
  );
  const successCheckout = useSelector(
    (state: RootState) => state.app.successCheckoutReducer
  );
  const oracleData = useSelector(
    (state: RootState) => state.app.oracleDataReducer.data
  );
  const quoteBox = useSelector((state: RootState) => state.app.quoteBoxReducer);
  const interact = useSelector(
    (state: RootState) => state.app.interactErrorReducer
  );
  const insufficientBalance = useSelector(
    (state: RootState) => state.app.insufficientBalanceReducer
  );
  const postCollect = useSelector(
    (state: RootState) => state.app.postCollectReducer
  );
  const followCollect = useSelector(
    (state: RootState) => state.app.followCollectReducer
  );
  const availableCurrencies = useSelector(
    (state: RootState) => state.app.availableCurrenciesReducer.currencies
  );
  const reactBox = useSelector((state: RootState) => state.app.reactBoxReducer);
  const indexer = useSelector((state: RootState) => state.app.indexerReducer);
  const image = useSelector((state: RootState) => state.app.ImageLargeReducer);
  const {
    dataLoading,
    quoters,
    mirrorQuote,
    setMirrorQuote,
    reactors,
    hasMore,
    hasMoreQuote,
    showMore,
  } = useWho(lensConnected, reactBox);
  const { loginLoading, handleLensSignIn } = useSignIn(
    address,
    isConnected,
    dispatch,
    oracleData,
    lensConnected,
    openAccountModal
  );
  const {
    quote,
    quoteLoading,
    setMakeQuote,
    makeQuote,
    quoteContentLoading,
    setQuoteContentLoading,
    collects,
    setCollects,
    openMeasure,
    setOpenMeasure,
    informationLoading,
    transactionLoading,
    handleCollect,
    handleFollow,
    approveSpend,
    approved,
    mentionProfiles,
    setMentionProfiles,
    caretCoord,
    setCaretCoord,
    setProfilesOpen,
    profilesOpen,
  } = useQuote(
    availableCurrencies,
    lensConnected,
    postCollect,
    followCollect,
    quoteBox,
    dispatch,
    publicClient,
    address,
    t
  );
  return (
    <>
      {image?.value && (
        <ImageLarge dispatch={dispatch} mainImage={image.image} />
      )}
      {quoteBox?.open && (
        <Quote
          t={t}
          lensConnected={lensConnected}
          setCaretCoord={setCaretCoord}
          setMentionProfiles={setMentionProfiles}
          setProfilesOpen={setProfilesOpen}
          profilesOpen={profilesOpen}
          mentionProfiles={mentionProfiles}
          caretCoord={caretCoord}
          dispatch={dispatch}
          quote={quoteBox?.quote}
          makePost={makeQuote}
          setMakePost={setMakeQuote}
          post={quote}
          postLoading={quoteLoading}
          contentLoading={quoteContentLoading}
          setContentLoading={setQuoteContentLoading}
          postCollect={postCollect}
        />
      )}
      {postCollect?.id && (
        <PostCollect
          t={t}
          dispatch={dispatch}
          openMeasure={openMeasure}
          setOpenMeasure={setOpenMeasure}
          availableCurrencies={availableCurrencies}
          collects={collects}
          setCollects={setCollects}
          id={postCollect?.id!}
          collectTypes={postCollect?.collectTypes}
        />
      )}
      {reactBox?.open && (
        <Who
          lensConnected={lensConnected}
          dispatch={dispatch}
          type={reactBox.type!}
          reactors={reactors}
          dataLoading={dataLoading}
          quoters={quoters}
          hasMore={hasMore}
          hasMoreQuote={hasMoreQuote}
          showMore={showMore}
          mirrorQuote={mirrorQuote}
          setMirrorQuote={setMirrorQuote}
          t={t}
        />
      )}
      {followCollect?.type && (
        <FollowCollect
          dispatch={dispatch}
          type={followCollect?.type!}
          collect={followCollect?.collect}
          follower={followCollect?.follower}
          handleCollect={handleCollect}
          handleFollow={handleFollow}
          informationLoading={informationLoading}
          transactionLoading={transactionLoading}
          approved={approved}
          approveSpend={approveSpend}
          t={t}
        />
      )}
      {indexer?.open && <Index message={indexer?.message!} />}
      {interact?.value && <InteractError t={t} dispatch={dispatch} />}
      {successCheckout?.value && (
        <SuccessCheckout
          image={successCheckout?.image}
          dispatch={dispatch}
          lensConnected={lensConnected}
          t={t}
        />
      )}
      {insufficientBalance?.value && (
        <InsufficientBalance
          dispatch={dispatch}
          message={insufficientBalance?.message!}
        />
      )}
      {lensConnect?.value && (
        <LensConnect
          dispatch={dispatch}
          loginLoading={loginLoading}
          handleLensSignIn={handleLensSignIn}
          connected={lensConnected?.id}
          t={t}
        />
      )}
    </>
  );
};

export default Modals;
