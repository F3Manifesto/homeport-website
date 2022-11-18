const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import lodash from "lodash";

export interface NewItemsInterface {
  order: string;
  quantity: number;
  itemPrice: {
    price: number;
    token: string;
  };
}

const handler = async (req: any, res: any) => {
  const { items } = req.body;
  const newItems: NewItemsInterface = lodash.first(items);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: newItems?.itemPrice?.price * newItems?.quantity * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

export default handler;
