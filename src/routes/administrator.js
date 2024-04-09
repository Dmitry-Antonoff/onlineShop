const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { User, Category, Product, Manufacturer } = require('../../db/models');

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

module.exports = router;
