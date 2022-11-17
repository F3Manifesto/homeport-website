import { FunctionComponent } from "react";
import {
  ProductInterface,
  SelectedDropProps,
} from "../../../types/general.types";
import { useDispatch, useSelector } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import { RootState } from "../../../redux/store";
import { setSelected } from "../../../redux/reducers/selectedDropSlice";

const SelectedDrop: FunctionComponent<SelectedDropProps> = ({
  productData,
}): JSX.Element => {
  const dispatch = useDispatch();
  const activeDrop = useSelector(
    (state: RootState) => state.app.activeReducer.value
  );
  const newData = productData?.filter((item) => item.dropType === activeDrop);
  return (
    <div className="relative w-fit h-fit row-start-2 grid grid-flow-col auto-cols-[auto auto] pt-5">
      <div className="grid grid-cols-3 auto-flow-row place-self-center gap-4 relative w-full h-full col-start-1">
        {activeDrop && newData?.length === 0 ? (
          <div className="relative w-fit h-fit text-center place-self-center text-white font-economicaB col-start-1">
            No Products in Drop
          </div>
        ) : (
          (newData?.length !== 0 && activeDrop ? newData : productData)?.map(
            (item: ProductInterface, index: number) => {
              return (
                <div
                  className="relative w-60 h-52 bg-black font-economica text-lg grid grid-flow-col auto-cols-[auto auto] group cursor-pointer"
                  key={index}
                >
                  {item.mainImage && (
                    <img
                      src={`https://${item.mainImage}.ipfs.w3s.link`}
                      className="absolute w-full h-full object-cover opacity-60"
                    />
                  )}
                  <div className="relative w-fit h-fit place-self-center col-start-1 text-white">
                    {item?.name}
                  </div>
                  {
                    <div className="absolute group-hover:visible invisible bg-black w-full h-full bg-opacity-80 grid grid-flow-col auto-cols-[auto auto]">
                      <div className="col-start-1 relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] gap-5 place-self-center">
                        <div className="relative w-fit h-fit col-start-1 place-self-center">
                          <MdModeEdit
                            size={25}
                            color="white"
                            className="hover:scale-90 active:scale-90"
                            onClick={() =>
                              dispatch(
                                setSelected({
                                  actionName: item.name,
                                  actionSlug: item.slug,
                                  actionDescription: item.description,
                                  actionDropType: item.dropType,
                                  actionMainImage: item.mainImage,
                                })
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  }
                </div>
              );
            }
          )
        )}
      </div>
    </div>
  );
};

export default SelectedDrop;
