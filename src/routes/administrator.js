const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { User, Product } = require('../../db/models');

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
  const users = await User.findAll({ where: { name: req.params.userName } });
  res.json(users);
});

router.get('/products/:productName', async (req, res) => {
  const keyword = req.params.productName;
  const products = await Product.findAll({
    where: {
      [Sequelize.Op.or]: [
        {
          name: {
            [Sequelize.Op.like]: `%${keyword}%`,
          },
        },
        {
          productCode: {
            [Sequelize.Op.like]: `%${keyword}%`,
          },
        },
      ],
    },
  });
  res.json(products);
});

module.exports = router;
