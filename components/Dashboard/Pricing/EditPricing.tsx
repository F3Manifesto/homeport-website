import Image from "next/legacy/image";
import { FormEvent, FunctionComponent, useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { EditPricingProps } from "../../../types/general.types";
import lodash from "lodash";
import { GlobalContext } from "../../../pages/_app";

const EditPricing: FunctionComponent<EditPricingProps> = ({
  handleCurrencySubmit,
  oneCurrencyData,
  handleUpdateCurrency,
  showCurrencyETH,
  showCurrencyMatic,
  showCurrencyMona,
  showCurrencyUsdt,
  ethConversion,
  monaConversion,
  maticConversion,
  usdtConversion,
}): JSX.Element => {
  const productInfo = useSelector(
    (state: RootState) => state.app.selectedDropReducer
  );
  return (
    <form
      className="relative w-full h-fit row-start-2 grid grid-flow-row auto-rows-[auto auto] pt-10 gap-4"
      onSubmit={
        productInfo?.name && oneCurrencyData?.ethPrice
          ? (e: FormEvent) => handleUpdateCurrency(e)
          : (e: FormEvent) => handleCurrencySubmit(e)
      }
    >
      <div className="relative w-full h-full row-start-1 grid grid-flow-col auto-cols-[auto auto] gap-12">
        {productInfo.mainImage ? (
          <img
            src={`https://${productInfo.mainImage}.ipfs.w3s.link`}
            className="relative col-start-1 w-72 h-72 object-cover"
          />
        ) : (
          <div className="relative w-72 h-72 rounded-md bg-grayBlue col-start-1"></div>
        )}
        <div className="relative w-full h-fit col-start-2 grid grid-flow-row auto-rows-[auto auto] gap-3">
          <div className="relative w-fit h-fit text-white font-economicaB row-start-1 justify-self-end text-right bg-shaded">
            {productInfo.name ? productInfo.name : "Product Name"}
          </div>
          <div className="relative w-fit h-fit text-white font-economicaB row-start-2 justify-self-end text-right bg-shaded">
            {productInfo.slug ? productInfo.slug : "Product Slug"}
          </div>
          <div className="relative w-60 h-fit text-white font-economicaB row-start-3 justify-self-end text-right pt-10">
            {productInfo?.description
              ? lodash.truncate(productInfo.description, {
                  length: 100,
                })
              : "Product Description"}
          </div>
          <div className="relative w-fit h-fit text-white font-economicaB row-start-4 pt-6 justify-self-end text-right">
            {productInfo?.dropType ? productInfo.dropType : "Drop Type"}
          </div>
        </div>
      </div>
      <div className="relative w-fit h-fit font-economicaB text-3xl text-white row-start-2 pt-10 pl-6">
        Set USD Price
      </div>
      <div className="relative w-full h-full row-start-3 grid grid-flow-col auto-cols-[auto auto]">
        <div className="relative w-fit h-full col-start-1 grid grid-flow-col auto-cols-[auto auto] gap-3">
          <div className="text-white w-fit h-fit text-4xl font-economicaB col-start-1 place-self-center">
            $
          </div>
          <input
            name="usdPrice"
            type={"number"}
            key={oneCurrencyData?.usdPrice}
            defaultValue={
              oneCurrencyData ? oneCurrencyData?.usdPrice : undefined
            }
            disabled={productInfo?.name ? false : true}
            step={0.01}
            className={`relative col-start-2 w-[15vw] h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3`}
            placeholder={"USD Price"}
            required
            // disabled={productSuccess || addMutation.isLoading ? true : false}
          />
        </div>
      </div>
      <div className="relative w-fit h-fit row-start-4 text-white text-economicaB pt-10 text-3xl pb-4">
        Price Pair Oracles
      </div>
      <div className="relative w-full h-fit row-start-5 grid grid-flow-row auto-rows-[auto auto] gap-6 pb-10">
        <div className="relative w-full h-fit row-start-1 col-start-1 grid grid-flow-col auto-cols-[auto auto] gap-3">
          <div className="relative w-fit h-fit col-start-1 place-self-center text-2xl">
            {ethConversion}
          </div>
          <div className="relative w-fit h-fit col-start-2 place-self-center">
            <Image src="/images/ethicon.png" width={10} height={15} />
          </div>
          <div className="relative w-fit h-fit col-start-3 place-self-center text-2xl grid grid-flow-col auto-cols-[auto auto] gap-3">
            <div className="relative w-fit h-fit col-start-1 place-self-center">
              @
            </div>
            <div className="relative w-fit h-fit col-start-2 text-4xl place-self-center">
              $
            </div>
          </div>
          <input
            name="ethPrice"
            type={"number"}
            onChange={(e: FormEvent) => showCurrencyETH(e)}
            step={0.01}
            className={`relative col-start-2 w-[8vw] h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 col-start-4`}
            placeholder={"USD / ETH"}
            required
            key={oneCurrencyData?.ethPrice}
            defaultValue={
              oneCurrencyData ? oneCurrencyData?.ethPrice : undefined
            }
            disabled={productInfo?.name ? false : true}
            // disabled={productSuccess || addMutation.isLoading ? true : false}
          />
        </div>
        <div className="relative w-full h-fit row-start-1 col-start-2 grid grid-flow-col auto-cols-[auto auto] gap-3">
          <div className="relative w-fit h-fit col-start-1 place-self-center text-2xl">
            {monaConversion}
          </div>
          <div className="relative w-fit h-fit col-start-2 place-self-center">
            <Image src="/images/monaicon.png" width={15} height={15} />
          </div>
          <div className="relative w-fit h-fit col-start-3 place-self-center text-2xl grid grid-flow-col auto-cols-[auto auto] gap-3">
            <div className="relative w-fit h-fit col-start-1 place-self-center">
              @
            </div>
            <div className="relative w-fit h-fit col-start-2 text-4xl place-self-center">
              $
            </div>
          </div>
          <input
            name="monaPrice"
            type={"number"}
            step={0.01}
            onChange={(e: FormEvent) => showCurrencyMona(e)}
            disabled={productInfo?.name ? false : true}
            className={`relative col-start-2 w-[8vw] h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 col-start-4`}
            placeholder={"USD / MONA"}
            required
            key={oneCurrencyData?.monaPrice}
            defaultValue={
              oneCurrencyData ? oneCurrencyData?.monaPrice : undefined
            }
            // disabled={productSuccess || addMutation.isLoading ? true : false}
          />
        </div>
        <div className="relative w-full h-fit row-start-2 col-start-1 grid grid-flow-col auto-cols-[auto auto] gap-3">
          <div className="relative w-fit h-fit col-start-1 place-self-center text-2xl">
            {maticConversion}
          </div>
          <div className="relative w-fit h-fit col-start-2 place-self-center">
            <Image src="/images/maticicon.png" width={15} height={10} />
          </div>
          <div className="relative w-fit h-fit col-start-3 place-self-center text-2xl grid grid-flow-col auto-cols-[auto auto] gap-3">
            <div className="relative w-fit h-fit col-start-1 place-self-center">
              @
            </div>
            <div className="relative w-fit h-fit col-start-2 text-4xl place-self-center">
              $
            </div>
          </div>
          <input
            name="maticPrice"
            type={"number"}
            onChange={(e: FormEvent) => showCurrencyMatic(e)}
            step={0.01}
            key={oneCurrencyData?.maticPrice}
            defaultValue={
              oneCurrencyData ? oneCurrencyData?.maticPrice : undefined
            }
            disabled={productInfo?.name ? false : true}
            className={`relative col-start-2 w-[8vw] h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 col-start-4`}
            placeholder={"MATIC / USD"}
            required
            // disabled={productSuccess || addMutation.isLoading ? true : false}
          />
        </div>
        <div className="relative w-full h-fit row-start-2 col-start-2 grid grid-flow-col auto-cols-[auto auto] gap-3">
          <div className="relative w-fit h-fit col-start-1 place-self-center text-2xl">
            {usdtConversion}
          </div>
          <div className="relative w-fit h-fit col-start-2 place-self-center">
            <Image src="/images/usdticon.png" width={15} height={15} />
          </div>
          <div className="relative w-fit h-fit col-start-3 place-self-center text-2xl grid grid-flow-col auto-cols-[auto auto] gap-3">
            <div className="relative w-fit h-fit col-start-1 place-self-center">
              @
            </div>
            <div className="relative w-fit h-fit col-start-2 text-4xl place-self-center">
              $
            </div>
          </div>
          <input
            name="usdtPrice"
            type={"number"}
            step={0.01}
            onChange={(e: FormEvent) => showCurrencyUsdt(e)}
            key={oneCurrencyData?.usdtPrice}
            defaultValue={
              oneCurrencyData ? oneCurrencyData?.usdtPrice : undefined
            }
            disabled={productInfo?.name ? false : true}
            className={`relative col-start-2 w-[8vw] h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 col-start-4`}
            placeholder={"USDT / USD"}
            required
            // disabled={productSuccess || addMutation.isLoading ? true : false}
          />
        </div>
      </div>
      {productInfo?.name && !oneCurrencyData?.ethPrice ? (
        <button
          className="relative w-full h-10 row-start-6 bg-grayBlue px-5 py-1.5 grid grid-flow-col auto-cols-[auto auto] hover:scale-95 active:scale-95 hover:opacity-80 cursor-pointer"
          type="submit"
        >
          <div className="relative w-fit h-fit place-self-center text-black font-economicaB">
            ADD PRICING TO DROP
          </div>
        </button>
      ) : productInfo?.name && oneCurrencyData?.ethPrice ? (
        <button
          className="relative w-full h-10 row-start-6 bg-grayBlue px-5 py-1.5 grid grid-flow-col auto-cols-[auto auto] hover:scale-95 active:scale-95 hover:opacity-80 cursor-pointer"
          type="submit"
        >
          <div className="relative w-fit h-fit place-self-center text-black font-economicaB">
            UPDATE PRICING
          </div>
        </button>
      ) : (
        <div className="relative w-full h-10 row-start-6 bg-grayBlue px-5 py-1.5 grid grid-flow-col auto-cols-[auto auto] text-black text-center">
          SELECT A PRODUCT TO PRICE
        </div>
      )}
    </form>
  );
};

export default EditPricing;
