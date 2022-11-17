import { Schema, models, model } from "mongoose";

interface IDrafts {
  title: string;
  description: string;
  productImages: string[];
  date: string;
}

const DraftsSchema = new Schema<IDrafts>({
  title: String,
  description: String,
  productImages: [String],
  date: String,
});

const Drafts: any = models.Drafts || model<IDrafts>("Drafts", DraftsSchema);

export default Drafts;
