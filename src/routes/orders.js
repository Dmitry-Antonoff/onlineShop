const router = require('express').Router();

const e = require('express');
const { BasketList, OrderProduct, Order } = require('../../db/models');

router.post('/', async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { total, ...diliveryAddres } = req.body;
    console.log(diliveryAddres);

    const order = await Order.create({
      userId,
      total,
      status: 'NEW',
      delivery: JSON.stringify(diliveryAddres),
    });

    const currentBasket = await BasketList.findAll({
      where: {
        userId,
      },
    });
    currentBasket.forEach((element) => {
      OrderProduct.create({
        orderId: order.id,
        productId: element.productId,
        quantity: element.quantity,
      });
      element.destroy();
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
