const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: any, res: any) => {
  const { items } = req.body;
  console.log("inside, items", items)

  // items.quantity * items.itemPrice.price,

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 50,
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
