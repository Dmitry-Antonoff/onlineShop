const React = require('react');
const Layout = require('./Layout');

module.exports = function Products(props) {
  // const { category } = props;
  return (
    <Layout {...props}>
      <main className="products-main">
        <h1>category name</h1>
        <div className="products-div">
          <div className="products-filter"></div>
          <div className="products">
            <div className="product">
              <img src="https://cdn.etm.ru/ipro/164/small_c9f34116_images_926827.jpg" alt="" />
              <a className="products-name" href="/s">
                name
              </a>
              <p className="products-kod">
                Код товара: <span>ETM7027283</span>
              </p>
              <p>
                Упаковка: <span>Упаковка</span>
              </p>
              <div className="buy">
                <div className="price">
                  <p className="first-price">цена</p>
                  <p className="roz-price">прошлая цена</p>
                </div>
                <div className="add-cart">
                  <input type="number" name="" id="" />
                  <p>шт</p>
                  <button type="button">В корзину</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};
