import { Schema, models, model } from "mongoose";

interface IPayment {
  wallet: string;
  stripeSecret: string;
  stripePublish: string;
}

const PaymentSchema = new Schema<IPayment>({
  wallet: {
    type: String,
    required: true,
  },
  stripeSecret: {
    type: String,
    required: true,
  },
  stripePublish: {
    type: String,
    required: true,
  },
});

const Payment: any =
  models.Payment || model<IPayment>("Payment", PaymentSchema);

export default Payment;
