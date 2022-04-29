const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: { type: string, require: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("category", categorySchema);
