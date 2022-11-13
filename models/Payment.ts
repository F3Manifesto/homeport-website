import { Schema, models, model } from "mongoose";

const PaymentSchema = new Schema({
  wallet: {
    type: String,
    required: true,
  },
  stripe: {},
});

const Payment = models.Payment || model("Product", PaymentSchema);

export default Payment;
