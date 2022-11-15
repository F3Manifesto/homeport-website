import { Schema, models, model } from "mongoose";

const DropTypeSchema = new Schema({
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

const DropType = models.DropType || model("DropType", DropTypeSchema);

export default DropType;
