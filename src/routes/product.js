const router = require('express').Router();
const { Product, Manufacturer, Category } = require('../../db/models');

router.post('/', async (req, res) => {
  const { parentproductName, name, code, manufacturer, price, inStock } = req.body;
  try {
    const category = await Category.findOne({ where: { name: parentproductName } });
    let company = await Manufacturer.findOne({ where: { name: manufacturer } });
    if (!company) {
      company = await Manufacturer.create({ name: manufacturer });
    }

    await Product.create({
      categoryId: category.id,
      name,
      productCode: code,
      manufacturerId: company.id,
      price,
      quantityInStock: inStock,
    });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Something went wrong...', error: { error } }, 500);
  }
});

module.exports = router;
