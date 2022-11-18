import { FunctionComponent } from "react";
import {
  AddressInterface,
  SelectedDropFulFillmentProps,
} from "../../../types/general.types";
import { useDispatch, useSelector } from "react-redux";
import { FiPackage } from "react-icons/fi";
import { RootState } from "../../../redux/store";
import { setFulfill } from "../../../redux/reducers/selectedFulfillSlice";

const SelectedDrop: FunctionComponent<SelectedDropFulFillmentProps> = ({
  addressData,
}): JSX.Element => {
  const dispatch = useDispatch();
  const activeDrop = useSelector(
    (state: RootState) => state.app.activeReducer.value
  );
  const newData = addressData?.filter(
    (item) => item?.forProductDropType === activeDrop
  );
  return (
    <div className="relative w-full h-fit row-start-2 grid grid-flow-col auto-cols-[auto auto] pt-5">
      <div
        className="grid grid-cols-3 auto-flow-row gap-4 relative w-full h-full col-start-1"
        id="productsmap"
      >
        {activeDrop && newData?.length === 0 ? (
          <div className="relative w-fit h-fit text-center text-end text-white font-economicaB col-start-1">
            No Orders in Drop
          </div>
        ) : (
          (newData?.length !== 0 && activeDrop ? newData : addressData)?.map(
            (item: AddressInterface, index: number) => {
              return (
                <div
                  className="relative w-full h-52 bg-black font-economica text-lg grid grid-flow-col auto-cols-[auto auto] group cursor-pointer"
                  key={index}
                >
                  {item?.forProductMainImage && (
                    <img
                      src={`https://${item?.forProductMainImage}.ipfs.w3s.link`}
                      className="absolute w-full h-full object-cover opacity-60"
                    />
                  )}
                  <div className="relative w-fit h-fit place-self-center col-start-1 text-white">
                    {item?.forProductName}
                  </div>
                  {
                    <div className="absolute group-hover:visible invisible bg-black w-full h-full bg-opacity-80 grid grid-flow-col auto-cols-[auto auto]">
                      <div className="col-start-1 relative w-fit h-fit grid grid-flow-col auto-cols-[auto auto] gap-5 place-self-center">
                        <div className="relative w-fit h-fit col-start-1 place-self-center">
                          <FiPackage
                            size={25}
                            color={item?.fulfilled ? "#ADE7B5" : "#FA6400"}
                            className="hover:scale-90 active:scale-90"
                            onClick={() =>
                              dispatch(
                                setFulfill({
                                  actionId: item._id,
                                  actionFirstName: item.firstName,
                                  actionLastName: item.lastName,
                                  actionEmail: item.email,
                                  actionCountryLocation: item.countryLocation,
                                  actionStreet: item.street,
                                  actionBuilding: item.buildingAparmentNo,
                                  actionState: item.stateProvince,
                                  actionCity: item.city,
                                  actionZip: item.zipCode,
                                  actionProductName: item.forProductName,
                                  actionProductPrice: item.forProductPrice,
                                  actionProductToken: item.forProductToken,
                                  actionProductQuantity:
                                    item.forProductQuantity,
                                  actionProductMainImage:
                                    item.forProductMainImage,
                                  actionProductDropType:
                                    item.forProductDropType,
                                  actionProductFulfilled: item.fulfilled,
                                  actionProvider: item.provider,
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
