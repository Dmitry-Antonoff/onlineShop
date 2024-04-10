const React = require('react');
const Layout = require('./Layout');

module.exports = function Products(props) {
  const { category, parentCategories, page, limit, products } = props;
  return (
    <Layout {...props}>
      <main className="products-main">
        <h1>category name</h1>
        <div className="products-div">
          <div className="products-filter">
            <h2>Фильтр</h2>
            <ul>
              {parentCategories.reverse().map((cat) => (
                <li>
                  <a href={`/products/${cat.id}`}>{cat.name}</a>
                </li>
              ))}
              <li>{category.name}</li>
              {category.children.map((cat) => (
                <li>
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
            {products.map((product) => (
              <div className="product">
                <img src="https://cdn.etm.ru/ipro/164/small_c9f34116_images_926827.jpg" alt="" />
                <a className="product-name" href="/s">
                  {product.name}
                </a>
                <p className="product-kod">
                  Код товара: <span>{product.productCode}</span>
                </p>
                <p className="product-kod">
                  Упаковка: <span>zzz</span>
                </p>
                <p className="product-kod">
                  Производитель: <span>Oreal</span>
                </p>
                <p className="product-kod">
                  В наличие: <span>{product.quantityInStock} шт</span>
                </p>
                <div className="buy">
                  <div className="price">
                    <p className="first-price">{product.price}</p>
                  </div>
                  <div className="into">
                    <input type="number" name="" id="" />
                    <p>шт</p>
                    <button type="button">В корзину</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="back-next-product">
          <a href={`/admin?page=${+page > 1 ? +page - 1 : +page}`}>
            <img src="/svg/left.svg" alt="back" />
          </a>
          {+page >= 3 && <a href={`/admin?page=${+page - 2}`}>{+page - 2}</a>}
          {+page >= 2 && <a href={`/admin?page=${+page - 1}`}>{+page - 1}</a>}
          <span>...</span>
          {+page === limit || <a href={`/admin?page=${+page + 1}`}>{+page + 1}</a>}
          {+page + 1 >= limit || <a href={`/admin?page=${+page + 2}`}>{+page + 2}</a>}
          <a href={`/admin?page=${+page < limit ? +page + 1 : +page}`}>
            <img src="/svg/right.svg" alt="next" />
          </a>
        </div>
      </main>
    </Layout>
  );
};
