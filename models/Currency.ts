import { Schema, models, model } from "mongoose";

const CurrencySchema = new Schema({
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

const Currency = models.Currency || model("Currency", CurrencySchema);

export default Currency;
