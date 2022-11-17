import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { setDraft } from "../../../redux/reducers/draftSlice";
import { DraftInterface } from "../../../types/general.types";
import useAddProduct from "../Inventory/hooks/useAddProduct";
import useAddDraft from "./hooks/useAddDraft";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import useUpdateDraft from "./hooks/useUpdateDraft";
import Switcher from "./Switcher";
import Listed from "./Listed";

const Main: FunctionComponent = (): JSX.Element => {
  const { handleDraftSubmit, success, showImages, drafts } = useAddDraft();
  const { hashImageStringOne } = useAddProduct();
  const { handleDraftUpdate, oneDraft } = useUpdateDraft();
  const dispatch = useDispatch();
  const imagesArray = useSelector(
    (state: RootState) => state.app.draftImageReducer.value
  );
  // const draft = useSelector((state: RootState) => state.app.draftReducer);
  return (
    <div className="relative w-full h-full grid grid-flow-col auto-cols-[auto auto] py-8 gap-10">
      <div className="relative w-full h-fit col-start-1 grid grid-flow-row auto-rows-[auto auto] pt-10 pr-16 gap-10">
        <div
          className="relative w-full h-fit row-start-1 grid grid-flow-col auto-cols-[auto auto] bg-grayBlue cursor-pointer hover:scale-105 active:scale-95"
          onClick={() =>
            dispatch(
              setDraft({
                actionId: undefined,
                actionTitle: undefined,
                actionDescription: undefined,
                actionProductImages: undefined,
                actionType: "ADD_DRAFT",
              })
            )
          }
        >
          <div className="relative w-full h-fit px-10 py-1.5 col-start-1 place-self-center text-black font-economica">
            New Draft
          </div>
        </div>
        {drafts && <Listed drafts={drafts} />}
      </div>
      <div className="relative w-full h-full col-start-2 grid grid-flow-row auto-rows-[auto auto] pt-10">
        <Switcher
          showImages={showImages}
          hashImageStringOne={hashImageStringOne}
          imagesArray={imagesArray}
          handleDraftUpdate={handleDraftUpdate}
          handleDraftSubmit={handleDraftSubmit}
          success={success}
          draft={oneDraft}
        />
      </div>
    </div>
  );
};

export default Main;
