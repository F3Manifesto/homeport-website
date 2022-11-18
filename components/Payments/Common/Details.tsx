import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../../../redux/reducers/addressSlice";
import { RootState } from "../../../redux/store";
import { DetailsProps } from "../../../types/general.types";

const Details: FunctionComponent<DetailsProps> = ({
  setDetailsSuccess,
  detailsSuccess,
}): JSX.Element => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.app.itemReducer);
  const priceValues = useSelector((state: RootState) => state.app.priceReducer);
  return (
    <form
      className="relative w-full h-fit grid grid-flow-col auto-cols-[auto auto] text-white font-economicaB gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(
          setAddress({
            actionFirstName: (e.target as HTMLFormElement).firstName.value,
            actionLastName: (e.target as HTMLFormElement).lastName.value,
            actionEmail: (e.target as HTMLFormElement).email.value,
            actionCountryLocation: (e.target as HTMLFormElement).country.value,
            actionStreet: (e.target as HTMLFormElement).street.value,
            actionBuilding: (
              e.target as HTMLFormElement
            ).aptNo.value.toString(),
            actionState: (e.target as HTMLFormElement).state.value,
            actionCity: (e.target as HTMLFormElement).city.value,
            actionZip: (e.target as HTMLFormElement).zip.value.toString(),
            actionProductName: items.name,
            actionProductPrice: priceValues.price,
            actionProductToken: priceValues.token,
            actionProductQuantity: items.quantity,
            actionProductMainImage: items.mainImage,
            actionProductDropType: items.dropType,
          })
        );
        setDetailsSuccess(true);
      }}
    >
      <div className="relative row-start-1 w-full h-fit text-2xl">
        Contact Information
      </div>
      <div className="relative w-[35vw] h-full row-start-2 grid grid-flow-col auto-cols-[auto auto] gap-6">
        <input
          name="email"
          type={"text"}
          placeholder="email"
          className={`relative row-start-1 col-start-1 w-full h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
          disabled={detailsSuccess ? true : false}
        />
        <input
          name="firstName"
          type={"text"}
          placeholder="First Name"
          className={`relative row-start-1 col-start-2 w-full h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
          disabled={detailsSuccess ? true : false}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          type={"text"}
          className={`relative row-start-2 col-start-2 w-full h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
          disabled={detailsSuccess ? true : false}
        />
      </div>
      <div className="relative row-start-3 w-full h-fit text-2xl">
        Shipping Details
      </div>
      <div className="relative w-[35vw] h-full row-start-4 grid grid-flow-col auto-cols-[auto auto] gap-6">
        <input
          name="country"
          type={"text"}
          placeholder="Country"
          className={`relative col-start-1 w-full h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
          disabled={detailsSuccess ? true : false}
        />
        <input
          name="street"
          placeholder="Street Name"
          type={"text"}
          className={`relative col-start-2 w-full h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
          disabled={detailsSuccess ? true : false}
        />
      </div>
      <div className="relative w-[35vw] h-full row-start-5 grid grid-flow-col auto-cols-[auto auto] gap-6">
        <input
          name="aptNo"
          type={"number"}
          placeholder="Building / Apt No."
          className={`relative col-start-1 w-full h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
          disabled={detailsSuccess ? true : false}
        />
        <input
          name="state"
          placeholder="State / Province"
          type={"text"}
          className={`relative col-start-2 w-full h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
          disabled={detailsSuccess ? true : false}
        />
        <input
          name="city"
          placeholder="City"
          type={"text"}
          className={`relative col-start-3 w-full h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
          disabled={detailsSuccess ? true : false}
        />
      </div>
      <input
        name="zip"
        placeholder="Zip Code"
        type={"number"}
        className={`relative row-start-6 w-full h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
        required
        disabled={detailsSuccess ? true : false}
      />
      {!detailsSuccess && (
        <button
          className="relative row-start-7 w-full h-fit grid grid-flow-row auto-rows-[auto auto] gap-4 pt-10"
          type="submit"
        >
          <div className="row-start-1 relative w-fit h-fit bg-lBlue p-3 border-2 border-white text-white cursor-pointer active:scale-95 rounded-md px-10 place-self-end">
            MAKE IT YOURS
          </div>
        </button>
      )}
    </form>
  );
};

export default Details;
