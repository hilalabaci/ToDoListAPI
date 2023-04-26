import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  value: String,
});
export default mongoose.model("Item", itemSchema);
