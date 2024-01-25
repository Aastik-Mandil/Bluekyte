const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publicationYear: {
      type: Number,
      default: new Date().getFullYear(),
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Book", BookSchema);
