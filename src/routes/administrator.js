const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { User, Product, Manufacturer, Category } = require('../../db/models');

router.post('/:id/add', async (req, res) => {
  try {
    const { id } = req.body;
    await User.update({ role: 'ADMIN' }, { where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.post('/:id/remove', async (req, res) => {
  try {
    const { id } = req.body;
    await User.update({ role: 'USER' }, { where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.get('/:userName', async (req, res) => {
  const keyword = req.params.productName;
  const users = await User.findAll({
    where: {
      [Sequelize.Op.or]: [
        {
          name: {
            [Sequelize.Op.iLike]: `%${keyword}%`,
          },
        },
        {
          email: {
            [Sequelize.Op.iLike]: `%${keyword}%`,
          },
        },
      ],
    },
  });
  res.json(users);
});

router.get('/products/:productName', async (req, res) => {
  const keyword = req.params.productName;
  const products = await Product.findAll({
    where: {
      [Sequelize.Op.or]: [
        {
          name: {
            [Sequelize.Op.iLike]: `%${keyword}%`,
          },
        },
        {
          productCode: {
            [Sequelize.Op.iLike]: `%${keyword}%`,
          },
        },
      ],
    },
    include: [{ model: Manufacturer }],
  });
  res.json(products);
});

router.get('/categories/:categoryName', async (req, res) => {
  const keyword = req.params.categoryName;
  const categories = await Category.findAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: `%${keyword}%`,
      },
    },
  });
  res.json(categories);
});

router.put('/category/:id', async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    await Category.update(
      { name },
      { where: { id: req.params.id } },
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const { name, code, manufacturer, price, inStock } = req.body;
    let manufactur = await Manufacturer.findOne({ where: { name: manufacturer } });
    if (!manufactur) {
      manufactur = await Manufacturer.create({ name: manufacturer });
    }

    await Product.update(
      { name, productCode: code, manufacturerId: manufactur.id, price, quantityInStock: inStock },
      { where: { id: req.params.id } },
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.delete('/category/:id', async (req, res) => {
  try {
    await Category.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

module.exports = router;
