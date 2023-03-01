const express = require('express');
const app = express();

const products = require('./routes/products');

app.use(express.json());

app.get('/', (req, res) => {
  res.write(`<a href="/api/products">API PRODUCTS</a>`);
});

app.use('/api/products', products);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
