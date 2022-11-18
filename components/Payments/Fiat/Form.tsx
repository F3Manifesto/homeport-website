import { FormEvent, FunctionComponent } from "react";
import useForm from "./hooks/useForm";
import { PaymentElement } from "@stripe/react-stripe-js";
import { AiOutlineLoading } from "react-icons/ai";

const Form: FunctionComponent = (): JSX.Element => {
  const { isLoading, stripe, elements, message, handleSubmit } = useForm();
  return (
    <form
      id="payment-form"
      onSubmit={(e: FormEvent) => {
        handleSubmit(e);
      }}
      className="w-full h-fit relative grid grid-flow-row auto-rows-[auto auto] gap-4"
    >
      <PaymentElement
        id="payment-element"
        className="relative w-full h-fit row-start-1"
      />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        type="submit"
        className="relative w-full h-fit row-start-2 bg-lBlue py-2 rounded-lg"
      >
        <span
          id="button-text"
          className="relative w-full h-fit text-white grid grid-flow-col auto-cols-auto"
        >
          {isLoading ? (
            <div className="relative col-start-1 animate-spin w-fit h-fit place-self-center py-1">
              <AiOutlineLoading size={15} color={"white"} />
            </div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {message && (
        <div
          id="payment-message"
          className="relative w-fit h-fit p-2 text-white"
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default Form;
