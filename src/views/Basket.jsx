const React = require('react');
const Layout = require('./Layout');

module.exports = function Basket(props) {
  const { basList } = props;
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
              <th className="action">Действие</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr className="all-products-li">
              <td className="img-td">
                <img
                  className="product-img"
                  src="https://cdn.etm.ru/ipro/814/small_vvg_3_ploskij_nezalit.jpg"
                  alt=""
                />
              </td>
              <td className="admin-productsName">Название</td>
              <td className="admin-products-name">Код</td>
              <td className="admin-products-stock">В наличии</td>
              <td className="admin-products-into">
                <input className="into" type="number" name="" id="" />
                <p className="thing">шт</p>
              </td>
              <td className="admin-products-name">Цена</td>
              <td className="button-div">
                <button type="button" className="trash-btn trash-button">
                  <img className="trash" src="/svg/trash.svg" alt="Удалить" />
                </button>
              </td>
            </tr> */}
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
                  <input className="into" type="number" name="" id="" value={product.quantity} />
                  <p className="thing">шт</p>
                </td>
                <td className="admin-products-name">{product.Product.price}</td>
                <td className="button-div">
                  <button type="button" id={product.Product.id} className="trash-btn trash-button">
                    <img className="trash" id={product.Product.id} src="/svg/trash.svg" alt="Удалить" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </Layout>
  );
};
