const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const cors = require('cors');

const bookChunkSize = 3;

router.get('/', cors(), async ({ query }, res) => {
  const skip = parseInt(query.pageNumber) * bookChunkSize;
  const books = await Book.find();
  const payload = { 
    hasMoreBooks: books.length >= bookChunkSize * (skip + 1),
    books: await Book.find().skip(skip).limit(bookChunkSize) // to avoid making a second call use slice()
  }
  res.json(payload);
});

router.post('/', cors(), async ({ body }, res) => {
  const newBook = new Book(body.book);
  const savedBook = await newBook.save();
  res.json(savedBook);
});

router.patch('/:id', cors(), async ({ body, params }, res) => {
  const b = await Book.updateOne({ _id: params.id }, { $set: body.book });
  res.json(await Book.findById(params.id));
});

router.delete('/:id', cors(), async ({ params }, res) => {
  const result = await Book.findByIdAndDelete({ _id: params.id });
  res.json(result);
});

module.exports = router;