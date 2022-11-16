import { Schema, models, model } from "mongoose";

interface ICurrency {
  itemSlug: string;
  itemName: string;
  usdPrice: number;
  ethPrice: number;
  monaPrice: number;
  usdtPrice: number;
  maticPrice: number;
}

const CurrencySchema = new Schema<ICurrency>({
  itemSlug: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  usdPrice: {
    type: Number,
    required: true,
  },
  ethPrice: {
    type: Number,
    required: true,
  },
  monaPrice: {
    type: Number,
    required: true,
  },
  usdtPrice: {
    type: Number,
    required: true,
  },
  maticPrice: {
    type: Number,
    required: true,
  },
});

const Currency: any =
  models.Currency || model<ICurrency>("Currency", CurrencySchema);

export default Currency;
