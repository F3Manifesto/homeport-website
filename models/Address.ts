import { Schema, models, model } from "mongoose";

interface IAddress {
  firstName: string;
  lastName: string;
  email: string;
  countryLocation: string;
  street: string;
  buildingAparmentNo: number;
  stateProvince: string;
  city: string;
  zipCode: number;
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
    type: Number,
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
    type: Number,
    required: true,
  },
});

const Address: any =
  models.Address || model<IAddress>("Address", AddressSchema);

export default Address;
