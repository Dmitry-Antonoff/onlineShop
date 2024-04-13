const router = require('express').Router();

const { BasketList, OrderProduct, Order } = require('../../db/models');

function sendTelegramMessage(botToken, chatId, message) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const body = JSON.stringify({
    chat_id: chatId,
    parse_mode: 'HTML',
    text: message,
  });

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Message sent successfully:', data);
    })
    .catch((error) => {
      console.error('Error sending message:', error);
    });
}

router.post('/', async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { total, ...diliveryAddres } = req.body;

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
    const botToken = '6456254161:AAGLQrEzVUwkkugsRBeUbZvfME0Mw1xETeg'; // Замените на ваш токен
    const chatId = '6214283281'; // Замените на ваш ID чата
    const message = `Привет! Новый заказ на сайте: #${order.id}\n Ссылка: http://localhost:3000/admin/orders/${order.id}`;

    sendTelegramMessage(botToken, chatId, message);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
