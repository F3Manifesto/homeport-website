import { Schema, models, model } from "mongoose";

interface IDropType {
  title: string;
  description: string;
}

const DropTypeSchema = new Schema<IDropType>({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const DropType: any =
  models.DropType || model<IDropType>("DropType", DropTypeSchema);

export default DropType;
