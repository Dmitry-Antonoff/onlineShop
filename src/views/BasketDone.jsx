const React = require('react');
const Layout = require('./Layout');

module.exports = function Basket(props) {
  return (
    <Layout {...props}>
      <main className="trash-main">
        <h1>Ваша заказ успешно оформлен</h1>
      </main>
    </Layout>
  );
};
