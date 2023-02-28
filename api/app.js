const express = require('express');
const app = express();

const products = require('../data');

app.get('/', (req, res) => {
  res.write(`<a href="/api/products">API PRODUCTS</a>`);
});

app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

app.get('/api/products/:id', (req, res) => {});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
