const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3001 } = process.env;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Hello, world");
});

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewURLParser: true,
}).then(() => {
  app.listen(PORT, () => {
    console.log(`app listen on port ${PORT}`);
  })
});

