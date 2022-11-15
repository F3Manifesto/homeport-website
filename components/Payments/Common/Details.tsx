import { FunctionComponent } from "react";

const Details: FunctionComponent = (): JSX.Element => {
  return (
    <form className="relative w-full h-fit grid grid-flow-col auto-cols-[auto auto] text-white font-economicaB gap-4">
      <div className="relative row-start-1 w-full h-fit text-2xl">
        Contact Information
      </div>
      <div className="relative w-[35vw] h-full row-start-2 grid grid-flow-col auto-cols-[auto auto] gap-6">
        <input
          name="email"
          placeholder="email"
          className={`relative row-start-1 col-start-1 w-full h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
        />
        <input
          name="firstName"
          placeholder="First Name"
          className={`relative row-start-1 col-start-2 w-full h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
        />
        <input
          name="lastName"
          placeholder="Last Name"
          className={`relative row-start-2 col-start-2 w-full h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
        />
      </div>
      <div className="relative row-start-3 w-full h-fit text-2xl">
        Shipping Details
      </div>
      <div className="relative w-[35vw] h-full row-start-4 grid grid-flow-col auto-cols-[auto auto] gap-6">
        <input
          name="country"
          placeholder="Country"
          className={`relative col-start-1 w-full h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
        />
        <input
          name="street"
          placeholder="Street Name"
          className={`relative col-start-2 w-full h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
        />
      </div>
      <div className="relative w-[35vw] h-full row-start-5 grid grid-flow-col auto-cols-[auto auto] gap-6">
        <input
          name="aptNo"
          placeholder="Building / Apt No."
          className={`relative col-start-1 w-full h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
        />
        <input
          name="state"
          placeholder="State / Province"
          className={`relative col-start-2 w-full h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
        />
        <input
          name="city"
          placeholder="City"
          className={`relative col-start-3 w-full h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
        />
      </div>
      <input
        name="zip"
        placeholder="Zip Code"
        className={`relative row-start-6 w-full h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
        required
      />
    </form>
  );
};

export default Details;
