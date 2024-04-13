const router = require('express').Router();
const { BasketList } = require('../../db/models');

router.post('/', async (req, res) => {
  const userId = req.session.user.id;
  const { quantity, productId } = req.body;

  try {
    await BasketList.create({ productId, userId, quantity });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/all', async (req, res) => {
  await BasketList.destroy({ where: { userId: req.session.user.id } });
  res.sendStatus(200);
});

router.delete('/', async (req, res) => {
  const { id } = req.body;
  await BasketList.destroy({ where: { productId: +id } });
  res.sendStatus(200);
});

module.exports = router;
