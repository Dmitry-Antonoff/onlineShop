const React = require('react');
const Layout = require('./Layout');

module.exports = function Basket(props) {
  const { basList } = props;

  const getTotalPrice = (product) => product.quantity * product.Product.price;

  let totalSum = 0;
  basList?.forEach((product) => {
    totalSum += getTotalPrice(product);
  });

  return (
    <Layout {...props}>
      <main className="trash-main">
        <h1>Ваша корзина</h1>
        <div className="btn-trashEmpty">
          <button type="button" className="delAllBasket">
            <img src="/svg/trash.svg" alt="Корзина" /> Очистить корзину
          </button>
        </div>
        <table className="all-products">
          <thead>
            <tr className="all-products-li-name">
              <th>Картинка</th>
              <th className="admin-productsName">Название</th>
              <th>Код</th>
              <th>В наличии</th>
              <th>Кол-во</th>
              <th>Цена</th>
              <th>Сумма</th>
              <th className="action">Действие</th>
            </tr>
          </thead>
          <tbody>
            {basList.map((product) => (
              <tr className="all-products-li" id={`tr-${product.Product.id}`}>
                <td className="img-td">
                  <img
                    className="product-img"
                    src={product.Product.imgPath}
                    alt={product.Product.name}
                  />
                </td>
                <td className="admin-productsName">{product.Product.name}</td>
                <td className="admin-products-name">{product.Product.productCode}</td>
                <td className="admin-products-stock">{product.Product.quantityInStock}</td>
                <td className="admin-products-into">
                  <input
                    className="into-basket-products"
                    type="number"
                    name=""
                    id={product.Product.id}
                    value={product.quantity}
                  />
                  <p className="thing">шт</p>
                </td>
                <td className="admin-products-name" id={`price-${product.Product.id}`}>
                  {product.Product.price}
                </td>
                <td className="admin-products-name sum" id={`sum-${product.Product.id}`}>
                  {getTotalPrice(product)}
                </td>
                <td className="button-div">
                  <button type="button" id={product.Product.id} className="trash-btn trash-button">
                    <img
                      className="trash"
                      id={product.Product.id}
                      src="/svg/trash.svg"
                      alt="Удалить"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <form method="post" name="getOrder">
          <div className="clearance">
            <div className="clearance-dilivery form-container">
              <h2>Адрес доставки</h2>
              <label htmlFor="name">Имя:</label>
              <input type="text" id="name" name="name" required />

              <label htmlFor="address">Адрес:</label>
              <input type="text" id="address" name="address" required />

              <label htmlFor="city">Город:</label>
              <input type="text" id="city" name="city" required />

              <label htmlFor="zip">Почтовый индекс:</label>
              <input type="text" id="zip" name="zip" required />

              <label htmlFor="country">Страна:</label>
              <input type="text" id="country" name="country" required />
            </div>
            <div className="clearance-goods">
              <div>
                <span>Сумма для оплаты:</span>
                <span id="totalSum">{totalSum}</span>
                <input type="hidden" name="total" value={totalSum} />
              </div>
              <button type="submit">Перейти к оформлению</button>
            </div>
          </div>
        </form>
      </main>
    </Layout>
  );
};
