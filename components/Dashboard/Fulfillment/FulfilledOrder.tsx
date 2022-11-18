import { FormEvent, FunctionComponent } from "react";
import { FulFilledOrderProps } from "../../../types/general.types";
import lodash from "lodash";

const FulFilledOrder: FunctionComponent<FulFilledOrderProps> = ({
  productInfo,
  handleFulfillOrder,
  providers,
  setProviderValue,
  providerValue,
  productData,
}): JSX.Element => {
  const firstData = lodash.first(productData);
  return (
    <form
      className="relative w-full h-fit row-start-2 grid grid-flow-row auto-rows-[auto auto] pt-10 gap-4"
      onSubmit={(e: FormEvent) => handleFulfillOrder(e)}
    >
      <div className="relative w-full h-full row-start-1 grid grid-flow-col auto-cols-[auto auto] gap-12">
        {productInfo?.forProductMainImage ? (
          <img
            src={`https://${productInfo?.forProductMainImage}.ipfs.w3s.link`}
            className="relative col-start-1 w-72 h-72 object-cover"
          />
        ) : (
          <div className="relative w-72 h-72 rounded-md bg-grayBlue col-start-1"></div>
        )}
        <div className="relative w-full h-fit col-start-2 grid grid-flow-row auto-rows-[auto auto] gap-3">
          <div className="relative w-fit h-fit text-white font-economicaB row-start-1 justify-self-end text-right bg-shaded text-xl">
            {productInfo?.forProductName
              ? productInfo?.forProductName
              : "Product Name"}
          </div>
          <div className="relative w-fit h-fit text-white font-economica row-start-3 justify-self-end text-right">
            {productInfo?.forProductDropType
              ? productInfo?.forProductDropType
              : "Drop Type"}
          </div>
          <div className="relative w-fit h-fit text-white font-economica row-start-4 justify-self-end text-right pt-6 grid grid-flow-col auto-cols-auto gap-2">
            <div className="relative w-fit h-fit col-start-1">
              {productInfo?.forProductPrice
                ? productInfo?.forProductPrice
                : "Product Price"}
            </div>
            <div className="relative w-fit h-fit col-start-2">
              {productInfo?.forProductToken
                ? productInfo?.forProductToken
                : "Currency Type"}
            </div>
          </div>
          <div className="relative w-fit h-fit text-white row-start-5 justify-self-end text-right pt-6 grid grid-flow-col auto-cols-auto gap-2">
            <div className="relative w-fit h-fit col-start-1 font-economicaB">
              Order Quantity:
            </div>
            <div className="relative w-fit h-fit col-start-2 font-economica">
              {productInfo?.forProductQuantity &&
                productInfo?.forProductQuantity}
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-fit h-fittext-3xl text-white row-start-2 pt-10 grid grid-flow-col auto-cols-auto gap-5">
        <div className="relative w-fit h-fit col-start-1 font-economicaB text-2xl">
          Order Details:
        </div>
      </div>
      <div className="relative w-full h-full row-start-3 grid grid-flow-row auto-rows-[auto auto]">
        <div className="relative w-fit h-full row-start-1 grid grid-flow-col auto-cols-[auto auto] gap-3 text-base">
          <div className="relative col-start-1 w-fit h-fit font-economicaB">
            {productInfo?.firstName ? "First Name:" : "---"}
          </div>
          <div className="relative col-start-2 w-fit h-fit font-economica">
            {productInfo?.firstName}
          </div>
          <div className="relative col-start-3 w-fit h-fit font-economicaB">
            {productInfo?.lastName ? "Last Name:" : "---"}
          </div>
          <div className="relative col-start-4 w-fit h-fit font-economica">
            {productInfo?.lastName}
          </div>
          <div className="relative col-start-5 w-fit h-fit font-economicaB">
            {productInfo?.email ? "Email:" : "---"}
          </div>
          <div className="relative col-start-6 w-fit h-fit font-economica">
            {productInfo?.email}
          </div>
        </div>
        <div className="relative w-fit h-full row-start-2 grid grid-flow-col auto-cols-[auto auto] text-base pt-4">
          <div className="relative col-start-1 row-start-1 w-fit h-fit font-economicaB text-lg pb-2">
            {productInfo?.city ? "Address:" : "---"}
          </div>
          <div className="relative col-start-1 row-start-2 w-fit h-fit font-economica">
            {productInfo?.buildingAparmentNo} {productInfo?.street}{" "}
            {productInfo?.city} {productInfo?.stateProvince}
          </div>
          <div className="relative col-start-1 row-start-3 w-fit h-fit font-economica">
            {productInfo?.zipCode} {productInfo?.countryLocation}{" "}
          </div>
        </div>
      </div>
      <div className="relative w-fit h-fit row-start-4 text-white text-economicaB text-xl grid grid-flow-col auto-cols-auto gap-3">
        <div className="relative col-start-1 w-fit h-fit">
          Amount Left in Drop:
        </div>
        <div className="relative w-fit h-fit col-start-2 font-economica">
          {firstData?.quantity - firstData?.amountSold > 0
            ? firstData?.quantity - firstData?.amountSold
            : "Drop Sold Out"}
        </div>
      </div>
      <div className="relative w-fit h-fit row-start-5 text-white text-economicaB text-xl pb-4 grid grid-flow-col auto-cols-auto gap-3">
        <div className="relative w-fit h-fit col-start-1">
          {productInfo?.firstName ? "Order Fulfilled ?" : "---"}
        </div>
        <div
          className={`relative w-fit h-fit col-start-2 font-economica ${
            productInfo?.forProductFulfilled === true && "text-grayGreen"
          }`}
        >
          {productInfo?.forProductFulfilled === true
            ? "Yes"
            : productInfo?.forProductFulfilled === false
            ? "No"
            : productInfo?.firstName
            ? "No"
            : "---"}
        </div>
      </div>
      <div className="relative w-fit gap-4 h-fit row-start-6 grid grid-cols-3 grid-flow-row pb-6">
        {providers?.map((provider: string, index: number) => {
          return (
            <div
              key={index}
              className={`relative w-28 h-28 ${
                !productInfo?.forProductFulfilled &&
                "cursor-pointer hover:opacity-80 active:scale-95"
              } rounded-md grid grid-flow-col auto-cols-auto ${
                providerValue === provider ? "bg-grayGreen" : "bg-grayBlue"
              } ${
                productInfo?.forProductProvider === provider
                  ? "bg-grayGreen"
                  : "bg-grayBlue"
              }`}
              onClick={
                productInfo?.forProductFulfilled
                  ? () => {}
                  : () => setProviderValue(provider)
              }
            >
              <div className="relative w-fit h-fit text-black font-economica place-self-center">
                {provider}
              </div>
            </div>
          );
        })}
      </div>
      {productInfo?.forProductName && !productInfo?.forProductFulfilled ? (
        <button
          className="relative w-full h-10 row-start-7 bg-grayBlue px-5 py-1.5 grid grid-flow-col auto-cols-[auto auto] hover:scale-95 active:scale-95 hover:opacity-80 cursor-pointer"
          type="submit"
        >
          <div className="relative w-fit h-fit place-self-center text-black font-economicaB">
            FULFILL ORDER
          </div>
        </button>
      ) : productInfo?.forProductFulfilled === true ? (
        <div className="relative w-full h-10 row-start-7 bg-grayGreen px-5 py-1.5 grid grid-flow-col auto-cols-[auto auto] text-black text-center">
          ORDER HAS BEEN FULFILLED
        </div>
      ) : (
        <div className="relative w-full h-10 row-start-7 bg-grayBlue px-5 py-1.5 grid grid-flow-col auto-cols-[auto auto] text-black text-center">
          SELECT AN ORDER TO FULFILL
        </div>
      )}
    </form>
  );
};

export default FulFilledOrder;
