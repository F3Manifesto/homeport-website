import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ImageLarge from "./ImageLarge";
import Index from "./Indexer";
import InteractError from "./InteractError";
import Quote from "./Quote";
import Who from "./Who";
import useWho from "./hooks/useWho";
import useSignIn from "../collect/hooks/useSignIn";
import LensConnect from "./LensConnect";
import { useAccount } from "wagmi";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import useQuote from "./hooks/useQuote";
import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import { PrimaryPublication } from "../../graphql/generated";
import PostCollect from "./PostCollect";

const Modals: FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch();
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
  const oracleData = useSelector(
    (state: RootState) => state.app.oracleDataReducer.data
  );
  const quoteBox = useSelector((state: RootState) => state.app.quoteBoxReducer);
  const interact = useSelector(
    (state: RootState) => state.app.interactErrorReducer
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
    address
  );
  return (
    <>
      {image?.value && (
        <ImageLarge dispatch={dispatch} mainImage={image.image} />
      )}
      {quoteBox?.open && (
        <Quote
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
        />
      )}
      {indexer?.open && <Index message={indexer?.message!} />}
      {interact?.value && <InteractError dispatch={dispatch} />}
      {lensConnect?.value && (
        <LensConnect
          dispatch={dispatch}
          loginLoading={loginLoading}
          handleLensSignIn={handleLensSignIn}
          connected={lensConnected?.id}
        />
      )}
    </>
  );
};

export default Modals;
