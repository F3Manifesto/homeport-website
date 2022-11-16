import { Schema, models, model } from "mongoose";

interface IPayment {
  wallet: string;
  stripe: string;
}

const PaymentSchema = new Schema<IPayment>({
  wallet: {
    type: String,
    required: true,
  },
  stripe: {
    type: String,
    required: true,
  },
});

const Payment: any =
  models.Payment || model<IPayment>("Product", PaymentSchema);

export default Payment;
