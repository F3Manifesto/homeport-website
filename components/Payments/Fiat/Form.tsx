import { FunctionComponent } from "react";
import useForm from "./hooks/useForm";
import { PaymentElement } from "@stripe/react-stripe-js";

const Form: FunctionComponent = (): JSX.Element => {
  const { isLoading, stripe, elements, message, handleSubmit } = useForm();
  return (
    <form
      id="payment-form"
      onSubmit={() => handleSubmit}
      className="w-full h-fit relative grid grid-flow-row auto-rows-[auto auto] gap-4"
    >
      <PaymentElement
        id="payment-element"
        className="relative w-full h-fit row-start-1"
      />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="relative w-full h-fit row-start-2 bg-lBlue py-2 rounded-lg"
      >
        <span id="button-text" className="relative w-full h-fit text-white">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message" className="relative w-fit h-fit p-2 text-white">{message}</div>}
    </form>
  );
};

export default Form;
