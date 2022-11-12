import { FunctionComponent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useFiat from "./hooks/useFiat";
import Form from "./Form";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const StripeCheckout: FunctionComponent = (): JSX.Element => {
  const { options, clientSecret } = useFiat();

  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <Form />
        </Elements>
      )}
    </div>
  );
};

export default StripeCheckout;
