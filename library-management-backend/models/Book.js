const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: String, required: true },
  publishedDate: { type: String, required: true },
  genre: { type: String },
  copiesAvailable: { type: Number, default: 1 }
});

module.exports = mongoose.model('Book', bookSchema);