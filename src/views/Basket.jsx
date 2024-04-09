const React = require('react');
const Layout = require('./Layout');

module.exports = function AdminProducts(props) {
  const { allProducts, page, limit } = props;
  return (
    <Layout {...props}>
      <main className="trash-main">
        <h1>Ваша корзина</h1>
        <div className="btn-trashEmpty">
          <button type="button">
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
            {/* {allProducts.map((product) => (
                <tr className="all-products-li">
                  <td className="img-td">
                    <img className="product-img" src={product.imgPath} alt={product.name} />
                  </td>
                  <td className="admin-productsName">{product.name}</td>
                  <td className="admin-products-name">{product.productCode}</td>
                  <td className="admin-products-stock">{product.quantityInStock}</td>
                   <td className="admin-products-into">
                <input className="into" type="number" name="" id="" />
                <p className="thing">шт</p>
              </td>
              <td className="admin-products-name">{product.price}</td>
                  <td className="button-div">
                    <button type="button" className="trash-btn trash-button">
                      <img className="trash" src="/svg/trash.svg" alt="Удалить" />
                    </button>
                  </td>
                </tr>
              ))} */}
          </tbody>
        </table>
      </main>
    </Layout>
  );
};
