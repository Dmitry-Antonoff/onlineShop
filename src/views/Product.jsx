const React = require('react');
const Layout = require('./Layout');

module.exports = function Product(props) {
  const { product, basket, user, likeProducts } = props;
  const characteristic = product.characteristics;
  const allcharacteristic = [];
  for (const key in characteristic) {
    allcharacteristic.push({ key, value: characteristic[key] });
  }
  return (
    <Layout {...props}>
      <main className="product-main">
        <h1>{product.name}</h1>
        <div className="product-div">
          <div className="product-view">
            <h2>
              Код товара: <span>{product.productCode}</span>
            </h2>

            <div className="product-view-img">
              <img src={product.imgPath} alt="" />
            </div>
            <div className="product-block-links">
              <a href="#product-сharacteristics">Характеристики</a>
              <a href="#product-description">Описание</a>
              <a href="#analogues-replacements">Аналоги и замены</a>
            </div>
            <div
              className="product-сharacteristics"
              id="product-сharacteristics"
            >
              <h2>Характеристики</h2>
              <ul>
                {allcharacteristic.map((characteristic) => (
                  <li>
                    <p>{characteristic.key}</p>
                    <span>{characteristic.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="product-description" id="product-description">
              <h2>Описание</h2>
              <span>{product.description}</span>
            </div>

            <table
              className="analogues-replacements"
              id="analogues-replacements"
            >
              <thead>
                <tr>
                  <th>Товар</th>
                  <th className="adanaloguesmin-productName">Название</th>
                  <th>Код</th>
                  <th>Цена</th>
                </tr>
              </thead>
              <tbody>
                {likeProducts.map((product) => (
                  <tr className="analogues-products-tr">
                    <td>
                      <img
                        className="product-img"
                        src={product.imgPath}
                        alt=""
                      />
                    </td>
                    <td className="admin-productsName">
                      <a
                        href={`/products/${product.categoryId}/${product.productCode}`}
                      >
                        {product.name}
                      </a>
                    </td>
                    <td className="admin-products-name">
                      {product.productCode}
                    </td>
                    <td className="admin-products-name">
                      {product.price} Лари/шт
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="product-payment">
            <div className="payment-tresh">
              <p className="product-kod">
                В наличие: <span>{product.quantityInStock} шт</span>
              </p>
              <p>{product.price} Лари/шт</p>
              {user ? (
                <div className="into add-cart">
                  <form
                    name="addBasket"
                    className="into add-cart addBasket"
                    data-productid={product.id}
                  >
                    <input type="number" name="quantity" id="" value={1} />
                    <p>шт</p>
                    {!basket ? (
                      <button type="submit" id={`btn-${product.id}`}>
                        В корзину
                      </button>
                    ) : (
                      <button
                        disabled
                        type="button"
                        style={{ backgroundColor: '#0876cc', color: 'white' }}
                      >
                        Уже в корзине
                      </button>
                    )}
                  </form>
                </div>
              ) : (
                <h3 style={{ color: '#41444c' }}>
                  Чтобы сделать заказ зарегистрируйтесь
                </h3>
              )}
            </div>
            <div className="methods-obtaining">
              <h3>Способы получения</h3>
              <ul>
                <li>Стандартная доставка</li>
                <li>Экспресс-доставка</li>
                <li>Самовывоз ЭТМ</li>
                <li>Самовывоз СДЭК</li>
              </ul>
            </div>
            <div className="pay-info">
              <h3>Оплата</h3>
              <p>По счету, онлайн, наличными, по QR-коду</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};
