const React = require('react');
const Layout = require('../Layout');
const SideBar = require('./SideBar');

module.exports = function AdminOrder(props) {
  const { order } = props;
  const dil = JSON.parse(order.delivery);

  return (
    <Layout {...props}>
      <main className="admin-main">
        <SideBar {...props} />
        <div className="administrator">
          <h3>Заказ #{order.id}</h3>
          <table className="all-products">
            <thead>
              <tr className="all-products-li-name">
                <th>Картинка</th>
                <th className="admin-productsName">Название</th>
                <th>Код</th>
                <th>Производитель</th>
                <th>Цена</th>
                <th>Количество</th>
              </tr>
            </thead>
            <tbody>
              {order.OrderProducts.map((product) => (
                <tr className="all-products-li" id={product.Product.id}>
                  <td className="product-img-td">
                    <img
                      className="product-img"
                      src={product.Product.imgPath}
                      alt={product.Product.name}
                    />
                  </td>
                  <td className="admin-productsName">{product.Product.name}</td>
                  <td className="admin-products-name">
                    {product.Product.productCode}
                  </td>
                  <td className="admin-products-stock">
                    {product.Product.Manufacturer.name}
                  </td>
                  <td className="admin-products-name">
                    {product.Product.price}
                  </td>
                  <td className="admin-products-name">{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="clearance">
            <div
              className="clearance-dilivery form-container"
              style={{ width: '50%' }}
            >
              <h2>Адрес доставки</h2>
              <div className="filds">Имя: {dil.name}</div>
              <div className="filds">Адрес: {dil.address}</div>
              <div className="filds">Город: {dil.city}</div>
              <div className="filds">Почтовый индекс: {dil.zip}</div>
              <div className="filds">Страна: {dil.country}</div>
            </div>
            <div className="clearance-goods">
              <div>
                <span>Сумма оплаты:</span>
                <span id="totalSum">{order.total}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};
