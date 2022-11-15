import { FunctionComponent } from "react";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { setDrop } from "../../../redux/reducers/dropSlice";
import { MapProps, ProductInterface } from "../../../types/general.types";
import { useDispatch } from "react-redux";
import { setProduct } from "../../../redux/reducers/productSlice";

const Map: FunctionComponent<MapProps> = ({
  productData,
  setDeleteModal,
}): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <div className="relative w-fit h-fit row-start-2 grid grid-flow-col auto-cols-[auto auto] pt-10">
      <div
        id="productsmap"
        className="overflow-y-scroll grid grid-cols-2 auto-rows-auto place-self-center gap-4 relative w-fit max-h-[120vw] col-start-1"
      >
        {productData?.map((item: ProductInterface, index: number) => {
          return (
            <div
              className="relative w-80 h-60 bg-grayBlue font-economica text-lg grid grid-flow-col auto-cols-[auto auto] group cursor-pointer"
              key={index}
            >
              <div className="relative w-fit h-fit place-self-center col-start-1 text-black">
                {item.name}
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
                            setProduct({
                              actionValue: "INVENTORY_UPDATE",
                              actionId: item.slug,
                            })
                          )
                        }
                      />
                    </div>
                    <div className="relative w-fit h-fit col-start-2 place-self-center">
                      <RiDeleteBin5Fill
                        size={25}
                        color="white"
                        className="hover:scale-90 active:scale-90"
                        onClick={() => {
                          dispatch(
                            setProduct({
                              actionValue: "INVENTORY_ADD",
                              actionId: item.slug,
                            })
                          );
                          setDeleteModal(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Map;
