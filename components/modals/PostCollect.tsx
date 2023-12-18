import { FunctionComponent } from "react";
import { ImCross } from "react-icons/im";
import { setPostCollect } from "../../redux/reducers/postCollectSlice";
import { PostCollectGifProps } from "../../types/general.types";
import CollectOptions from "./modules/CollectOptions";

const PostCollect: FunctionComponent<PostCollectGifProps> = ({
  dispatch,
  openMeasure,
  setOpenMeasure,
  availableCurrencies,
  collectTypes,
  id,
}): JSX.Element => {
  return (
    <div className="inset-0 justify-center fixed z-50 bg-opacity-50 backdrop-blur-sm overflow-y-hidden grid grid-flow-col auto-cols-auto w-full h-auto cursor-empireS">
      <div className="relative w-[90vw] md:w-[50vw] h-fit max-h-[90vh] min-h-[27vh] place-self-center bg-lightWhite border border-black overflow-y-scroll">
        <div className="relative w-full h-full flex flex-col gap-3 p-2 items-center justify-start">
          <div className="relative w-fit h-fit items-end justify-end ml-auto cursor-pointer flex">
            <ImCross
              color="black"
              size={10}
              onClick={() =>
                dispatch(
                  setPostCollect({
                    actionCollectTypes: collectTypes,
                  })
                )
              }
            />
          </div>
          <CollectOptions
            openMeasure={openMeasure}
            setOpenMeasure={setOpenMeasure}
            collectTypes={collectTypes}
            id={id}
            availableCurrencies={availableCurrencies}
            dispatch={dispatch}
          />
        </div>
      </div>
    </div>
  );
};

export default PostCollect;
