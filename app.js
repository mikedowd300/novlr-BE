const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
const BooksRoute = require('./routes/Books');

const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost/novlr', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('open...')
});

app.use(bodyParser.json());

app.get('/', cors(), (req, res) => {
  res.send('Hello World!!!');
});

app.use('/books', BooksRoute);

app.listen(8080, () => console.log('listening on port 8080'));
