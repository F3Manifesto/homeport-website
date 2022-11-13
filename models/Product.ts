import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Please add a title"],
    maxLength: [50, "Title cannot be more than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxLength: [500, "Title cannot be more than 500 characters"],
  },
  collectionName: {},
  availableFormats: {},
  relatedCategories: {},
  sizesAvailable: {},
  material: {},
  colorVariations: {},
  keysToUnlock: {},
  formatVariations: {},
  series: {
    type: Boolean,
    required: [true, "Is this item part of a series?"],
  },
  synthModel: {},
  numberIncluded: {},
  props: {},
  customEmbeddings: {},
  samplingMethod: {},
  sourceIncluded: {
    type: Boolean,
    required: [true, "Is the source included?"],
  },
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
