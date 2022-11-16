import { Schema, models, model } from "mongoose";

interface IProduct {
  name: string;
  description: string;
  dropType: string;
  dropFormat: string[];
  quantity: number;
  mainImage: string;
  featuredImages: string[];
  slug: string;
}

const ProductSchema = new Schema<IProduct>({
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
  quantity: { type: Number, required: true },
  mainImage: { data: Buffer, contentType: String },
  featuredImages: { data: Buffer, contentType: [String] },
  slug: {
    type: String,
    required: true,
  },
});

const Product: any = models.Product || model<IProduct>("Product", ProductSchema);

export default Product;
