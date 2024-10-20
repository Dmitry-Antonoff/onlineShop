const React = require('react');
const Layout = require('./Layout');

module.exports = function Products(props) {
  const { category, parentCategories, page, limit, products, search, all, basket, user } = props;
  return (
    <Layout {...props}>
      <main className="products-main">
        <h1>{category?.name}</h1>
        <div className="products-div">
          <div className="products-filter">
            <h2>Фильтр</h2>
            <ul className="product-ul-filter">
              <h3>Категории</h3>
              {parentCategories?.reverse().map((cat) => (
                <li className="product-parent" key={cat.id}>
                  <a href={`/products/${cat.id}`}>&lt; {cat.name}</a>
                </li>
              ))}
              <li>{category?.name}</li>
              {category?.children.map((cat) => (
                <li className="product-children" key={cat.id}>
                  <a href={`/products/${cat.id}`}>{cat.name}</a>
                </li>
              ))}
            </ul>
            <form className="products-form">
              <div className="with-discount">
                <p>Акции и скидки</p>
                <input type="checkbox" name="" id="" />
                <span>Со скидкой</span>
              </div>
              <div className="fabricator">
                <p className="fabricator-p">Производители</p>
                <div className="fabricator-enter">
                  <input type="text" placeholder="Начните вводить" />
                  <img src="/svg/search.svg" alt="" />
                </div>
                <ul className="fabricator-ul">
                  <li>
                    <input type="checkbox" />
                    <span>ЗМ</span>
                  </li>
                </ul>
              </div>
              <div className="apply-btns">
                <button type="submit" className="reset">
                  Сбросить все
                </button>
                <button type="submit" className="apply">
                  Применить
                </button>
              </div>
            </form>
          </div>
          <div className="products">
            {products.map((product) => {
              const productIdsInBasket = basket?.map((basketP) => basketP.productId);
              const isInBasket = productIdsInBasket.includes(product.id);

              return (
                <div className="product" key={product.id}>
                  <div>
                    <img src={product.imgPath} alt={product.name} />
                    <a
                      className="product-name"
                      href={`/products/${product.categoryId}/${product.productCode}`}
                    >
                      {product.name}
                    </a>
                    <p className="product-kod">
                      Код товара: <span>{product.productCode}</span>
                    </p>
                    <p className="product-kod">
                      Производитель: <span>{product.Manufacturer.name}</span>
                    </p>
                    <p className="product-kod">
                      В наличие: <span>{product.quantityInStock} шт</span>
                    </p>
                  </div>
                  <div className="buy">
                    <div className="price">
                      <p className="first-price">{product.price} Лари</p>
                    </div>
                    {user ? (
                      <div className="into add-cart">
                        <form
                          name="addBasket"
                          className="into add-cart addBasket"
                          data-productid={product.id}
                        >
                          <input type="number" name="quantity" id="" value={1} />
                          <p>шт</p>
                          {!isInBasket ? (
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
                      <h3 style={{ color: '#41444c' }}>Чтобы сделать заказ зарегистрируйтесь</h3>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {all.length > 12 && (
          <div className="back-next-product">
            <a
              href={`/products/${category ? category.id : ''}?${
                search ? `search=${search}&` : ''
              }page=${+page > 1 ? +page - 1 : +page}`}
            >
              <img src="/svg/left.svg" alt="back" />
            </a>
            {+page >= 3 && (
              <a
                href={`/products/${category ? category.id : ''}?${
                  search ? `search=${search}&` : ''
                }page=${+page - 2}`}
              >
                {+page - 2}
              </a>
            )}
            {+page >= 2 && (
              <a
                href={`/products/${category ? category.id : ''}?${
                  search ? `search=${search}&` : ''
                }page=${+page - 1}`}
              >
                {+page - 1}
              </a>
            )}
            <span>...</span>
            {+page === limit || (
              <a
                href={`/products/${category ? category.id : ''}?${
                  search ? `search=${search}&` : ''
                }page=${+page + 1}`}
              >
                {+page + 1}
              </a>
            )}
            {+page + 1 >= limit || (
              <a
                href={`/products/${category ? category.id : ''}?${
                  search ? `search=${search}&` : ''
                }page=${+page + 2}`}
              >
                {+page + 2}
              </a>
            )}
            <a
              href={`/products/${category ? category.id : ''}?${
                search ? `search=${search}&` : ''
              }page=${+page < limit ? +page + 1 : +page}`}
            >
              <img src="/svg/right.svg" alt="next" />
            </a>
          </div>
        )}
      </main>
    </Layout>
  );
};
