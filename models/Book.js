const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  author: String,
  title: String,
  paragraphs: [String]
}); 

module.exports = mongoose.model('Book', BookSchema);