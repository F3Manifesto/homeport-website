import { FunctionComponent } from "react";
import { MdModeEdit, MdPreview } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import {
  CurrencyInterface,
  MapProps,
  ProductInterface,
} from "../../../types/general.types";
import { AiOutlineDollar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setProduct } from "../../../redux/reducers/productSlice";
import { BASE_URL } from "../../../lib/constants";
import { setType } from "../../../redux/reducers/dashSlice";
import { setSelected } from "../../../redux/reducers/selectedDropSlice";

const Map: FunctionComponent<MapProps> = ({
  productData,
  setDeleteModal,
  setAddPricingModal,
  currencyData,
  handleLandTop,
  handleModalTop,
  setClickedFirst,
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
              className="relative w-80 h-60 bg-black font-economica text-lg grid grid-flow-col auto-cols-[auto auto] group cursor-pointer"
              key={index}
            >
              {item.mainImage && (
                <img
                  src={`https://${item.mainImage}.ipfs.w3s.link`}
                  className="absolute w-full h-full object-cover opacity-60"
                />
              )}
              <div className="relative w-fit h-fit place-self-center col-start-1 text-white text-xl">
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
                        onClick={() => {
                          dispatch(
                            setProduct({
                              actionValue: "INVENTORY_UPDATE",
                              actionId: item.slug,
                            })
                          );
                          setClickedFirst(true);
                        }}
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
                          handleModalTop();
                          setDeleteModal(true);
                        }}
                      />
                    </div>
                    <div className="relative w-fit h-fit col-start-3 place-self-center">
                      <MdPreview
                        size={25}
                        color="white"
                        className="hover:scale-90 active:scale-90"
                        onClick={
                          currencyData?.filter(
                            (data: CurrencyInterface) =>
                              data.itemSlug === item.slug
                          )?.length !== 0
                            ? () =>
                                window?.open(`${BASE_URL}/items/${item.slug}`)
                            : () => {
                                dispatch(
                                  setSelected({
                                    actionName: item.name,
                                    actionSlug: item.slug,
                                    actionDescription: item.description,
                                    actionDropType: item.dropType,
                                    actionMainImage: item.mainImage,
                                  })
                                );
                                setAddPricingModal(true);
                              }
                        }
                      />
                    </div>
                    <div className="relative w-fit h-fit col-start-4 place-self-center">
                      <AiOutlineDollar
                        size={25}
                        color={
                          currencyData?.filter(
                            (data: CurrencyInterface) =>
                              data.itemSlug === item.slug
                          )?.length === 0
                            ? "#E25049"
                            : "#ADE7B5"
                        }
                        className="hover:scale-90 active:scale-90"
                        onClick={() => {
                          handleLandTop();
                          dispatch(
                            setSelected({
                              actionName: item.name,
                              actionSlug: item.slug,
                              actionDescription: item.description,
                              actionDropType: item.dropType,
                              actionMainImage: item.mainImage,
                            })
                          );
                          dispatch(setType("PRICING"));
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
