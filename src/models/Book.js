const mongoose = require("mongoose");

/* The code is defining a Mongoose schema for a book. A schema is a blueprint for defining the
structure of a document within a MongoDB collection. */
const bookSchema = new mongoose.Schema({
  ISBN:{
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  copies: {
    type: Number,
    required: true,
    min: 0,
  },
  publication: {
    type: Date,
    required: true,
  },
  fine: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
