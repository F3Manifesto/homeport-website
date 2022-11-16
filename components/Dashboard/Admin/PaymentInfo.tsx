import { FormEvent, FunctionComponent } from "react";
import {
  PaymentInfoProps,
  PaymentInterface,
} from "../../../types/general.types";
import lodash from "lodash";

const PaymentInfo: FunctionComponent<PaymentInfoProps> = ({
  handleAdminPayment,
  data,
  handleAdminUpdate,
  showSecretPassword,
  setShowSecretPassword,
  showPublishPassword,
  setShowPublishPassword,
}): JSX.Element => {
  let newArray: PaymentInterface | undefined;
  if (data?.length !== 0) {
    newArray = lodash.first(data as any);
  }
  return (
    <form
      className="relative w-full h-full row-start-2 pt-20 grid grid-flow-row auto-rows-[auto auto]"
      onSubmit={
        data?.length !== 0
          ? (e: FormEvent) => handleAdminUpdate(e)
          : (e: FormEvent) => handleAdminPayment(e)
      }
    >
      <div className="relative w-full h-full row-start-1 grid grid-flow-row auto-rows-[auto auto] gap-2 col-start-1">
        <div className="relative w-fit h-fit font-economicaB text-2xl text-white row-start-1">
          Ethereum Wallet Payout Address
        </div>
        <div className="relative w-fit h-fit text-white font-economica text-base pb-6 row-start-2">
          Make sure this address is for the Ethereum Network and can accept
          multiple cryptocurrencies.
        </div>
        <input
          name="wallet"
          defaultValue={data?.length === 0 ? undefined : newArray?.stripeSecret}
          className={`relative row-start-3 w-[30vw] h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
        />
      </div>
      <div className="relative w-full h-full col-start-1 row-start-2">
        <div className="relative w-fit h-fit font-economicaB text-2xl text-white row-start-4 pt-10">
          Stripe Secret Key
        </div>
        <div className="relative w-fit h-fit text-white font-economica text-base pb-6 row-start-5">
          You can source this from your stripe developer dashboard.
        </div>
        <input
          defaultValue={data?.length === 0 ? undefined : newArray?.stripeSecret}
          name="stripeSecret"
          className={`relative row-start-6 w-[30vw] h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
          type={showSecretPassword ? "text" : "password"}
          onClick={() => setShowSecretPassword(!showSecretPassword)}
        />
      </div>
      <div className="relative w-full h-full col-start-2 row-start-2 pb-10">
        <div className="relative w-fit h-fit font-economicaB text-2xl text-white row-start-4 pt-10">
          Stripe Publishable Key
        </div>
        <div className="relative w-fit h-fit text-white font-economica text-base pb-6 row-start-5">
          You can source this from your stripe developer dashboard.
        </div>
        <input
          defaultValue={
            data?.length === 0 ? undefined : newArray?.stripePublish
          }
          name="stripePublish"
          className={`relative row-start-6 w-[30vw] h-fit text-white font-economica px-2 bg-shaded border-white border-2 rounded-md py-3 `}
          required
          type={showPublishPassword ? "text" : "password"}
          onClick={() => setShowPublishPassword(!showPublishPassword)}
        />
      </div>
      {
        <button
          className="relative w-fit h-10 row-start-3 bg-grayBlue px-5 py-1.5 grid grid-flow-col auto-cols-[auto auto] hover:scale-95 active:scale-95 hover:opacity-80 cursor-pointer"
          type="submit"
        >
          <div className="relative w-fit h-fit place-self-center text-black font-economicaB">
            SUBMIT
          </div>
        </button>
      }
    </form>
  );
};

export default PaymentInfo;
