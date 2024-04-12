const React = require('react');
const Layout = require('./Layout');

module.exports = function Basket(props) {
  const { basList } = props;

  const getTotalPrice = (product) => product.quantity * product.Product.price;

  let totalSum = 0;
  basList.forEach((product) => {
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
                <td className="admin-products-name" id={`sum-${product.Product.id}`}>
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
        <div className="clearance-goods">
          <div>
            <span>Сумма для оплаты:</span>
            <span id="totalSum">{totalSum}</span>
          </div>
          <button type="button">Перейти к оформлению</button>
        </div>
      </main>
    </Layout>
  );
};
