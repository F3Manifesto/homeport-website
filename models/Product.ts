import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dropType: { type: String, required: true },
  dropFormat: { type: [String], required: true },
  mainImage: { data: Buffer, contentType: String },
  featuredImages: { data: Buffer, contentType: [String] },
  slug: {
    type: String,
    required: true,
  },
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
