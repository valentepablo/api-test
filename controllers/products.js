const products = require('../data');

const getProducts = (req, res) => {
  let newProducts = [...products];
  const { search, limit } = req.query;

  if (search) {
    newProducts = newProducts.filter((product) => product.name.startsWith(search.toLowerCase()));
  }
  if (limit) {
    newProducts = newProducts.slice(0, Number(limit));
  }

  res.status(200).json(newProducts);
};

const getSingleProduct = (req, res) => {
  const { id } = req.params;
  const singleProduct = products.find((product) => product.id === Number(id));

  if (!singleProduct) res.status(404).json({ success: false, msg: 'Resource not found' });

  res.status(200).json({ success: true, data: singleProduct });
};

const createProduct = (req, res) => {
  const { name, desc, price } = req.body;
  if (!name || !desc || !price) {
    return res
      .status(400)
      .json({ success: false, msg: 'Please, provide the required properties.' });
  }

  const lastId = products[products.length - 1].id;
  const newProduct = { id: Number(lastId) + 1, name, desc, price };
  const newProducts = [...products, newProduct];

  res.status(200).json({ success: true, data: newProducts });
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, desc, price } = req.body;

  const singleProduct = products.find((product) => product.id === Number(id));
  if (!singleProduct) {
    return res.status(404).json({ success: false, msg: `Product with id ${id} not found.` });
  }

  const newProducts = products.map((product) => {
    if (product.id === Number(id)) {
      product.name = name || product.name;
      product.desc = desc || product.desc;
      product.price = price || product.price;
    }
    return product;
  });

  res.status(200).json({ success: true, data: newProducts });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;

  const singleProduct = products.find((product) => product.id === Number(id));
  if (!singleProduct) {
    return res.status(400).json({ success: true, msg: `Product with id ${id} not found.` });
  }

  const newProducts = products.filter((product) => product.id !== Number(id));

  res.status(200).json({ success: true, data: newProducts });
};

module.exports = {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
