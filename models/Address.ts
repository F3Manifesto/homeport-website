import { Schema, models, model } from "mongoose";

interface IAddress {
  firstName: string;
  lastName: string;
  email: string;
  countryLocation: string;
  street: string;
  buildingAparmentNo: string;
  stateProvince: string;
  city: string;
  zipCode: string;
  forProductName: string;
  forProductPrice: number;
  forProductToken: string;
  forProductQuantity: number;
  forProductMainImage: string;
  forProductDropType: string;
  fulfilled?: boolean;
  provider: string;
}

const AddressSchema = new Schema<IAddress>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  countryLocation: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  buildingAparmentNo: {
    type: String,
    required: true,
  },
  stateProvince: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  forProductName: {
    type: String,
    required: true,
  },
  forProductPrice: {
    type: Number,
    required: true,
  },
  forProductToken: {
    type: String,
    required: true,
  },
  forProductQuantity: {
    type: Number,
    required: true,
  },
  forProductMainImage: {
    type: String,
    required: true,
  },
  forProductDropType: {
    type: String,
    required: true,
  },
  fulfilled: {
    type: Boolean,
    required: false,
  },
  provider: {
    type: String,
    required: false,
  },
});

const Address: any =
  models.Address || model<IAddress>("Address", AddressSchema);

export default Address;
