import { FunctionComponent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useFiat from "../BuyNow/hooks/useFiat";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const StripeCheckout: FunctionComponent = (): JSX.Element => {
  const { options, clientSecret } = useFiat();
  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          
        </Elements>
      )}
    </div>
  );
};

export default StripeCheckout;
