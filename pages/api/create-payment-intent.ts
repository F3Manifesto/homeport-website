const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: any, res: any) => {
  const { items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: items.quantity * items.itemPrice,
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