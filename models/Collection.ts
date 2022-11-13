import { Schema, models, model } from "mongoose";

const CollectionSchema = new Schema({ 

})

const Collection = models.Collection || model("Product", CollectionSchema);

export default Collection;
