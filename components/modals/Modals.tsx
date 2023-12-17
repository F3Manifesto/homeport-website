import { useRouter } from "next/router";
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

const Modals: FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { openAccountModal } = useAccountModal();
  const { address, isConnected } = useAccount();
  const lensConnected = useSelector(
    (state: RootState) => state.app.lensConnectedReducer?.profile
  );
  const lensConnect = useSelector(
    (state: RootState) => state.app.lensConnectModalSlice
  );
  const oracleData = useSelector(
    (state: RootState) => state.app.oracleDataReducer.data
  );
  const quote = useSelector((state: RootState) => state.app.quoteBoxReducer);
  const interact = useSelector(
    (state: RootState) => state.app.interactErrorReducer
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
  return (
    <>
      {image?.value && (
        <ImageLarge dispatch={dispatch} mainImage={image.image} />
      )}
      {quote?.open && <Quote dispatch={dispatch} router={router} />}
      {reactBox?.open && (
        <Who
          router={router}
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
