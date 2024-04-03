const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const router = require('./routes');

env.config({
  path: '.env',
});

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const dbString = `mongodb+srv://${process.env.DB}:${process.env.PASSWORD}@cluster0.a4bka.mongodb.net/pr1`;

mongoose
  .connect(dbString)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(`failed connecting to db`, err);
  });

app.use(router);

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'success generated',
  });
});

app.listen(3000, () => {
  console.log(`listening to port ${3000}`);
});
