import { Schema, models, model } from "mongoose";

const DropTypeSchema = new Schema({
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
});

const DropType = models.DropType || model("DropType", DropTypeSchema);

export default DropType;
