const React = require('react');
const Layout = require('./Layout');

module.exports = function Home(props) {
  const { categories } = props;
  return (
    <Layout {...props}>
      <main className="home-main">
        <h2>Категории</h2>
        <ul className="categories categories-slider">
          {categories.map((category) => (
            <a className="category-link" href={`/category/${category.name}`}>
              <li>
                <img className="category-img" src={`${category.photoPath}`} alt="" />
                <p>{category.name}</p>
              </li>
            </a>
          ))}
        </ul>
        <h2>Хиты продаж</h2>
        <ul className="categories categories-slider">
          {/* <div className="left">
            <button
              type="button"
              className="button circle-btn first-circle portfolio-prev left-right"
            >
              <img alt="arror-left" src="svg/left.svg" />
            </button>
          </div> */}
          <li className="hit">
            <img src="https://cdn.etm.ru/ipro/164/small_c9f34116_images_926827.jpg" alt="" />
            <a className="hit-info" href="/s">
              Lorem animi aliquam voluptate facilis quaerat odit dolores neque. Saepe, illo.
            </a>

            <div className="buy-hit">
              <div className="price">
                <p className="first-price">цена</p>
                <p className="past-price">прошлая цена</p>
              </div>
              <div className="add-cart">
                <form name="addBasket" className="into add-cart addBasket">
                  <input type="number" name="quantity" id="" />
                  <p>шт</p>
                  <button type="submit">В корзину</button>
                </form>
              </div>
            </div>
          </li>
          <li className="hit">
            <img src="https://cdn.etm.ru/ipro/164/small_c9f34116_images_926827.jpg" alt="" />
            <a className="hit-info" href="/s">
              Lorem animi aliquam voluptate facilis quaerat odit dolores neque. Saepe, illo.
            </a>
            <div className="buy-hit">
              <div className="price">
                <p className="first-price">цена</p>
                <p className="past-price">прошлая цена</p>
              </div>
              <div className="add-cart">
                <input type="number" name="" id="" />
                <p>шт</p>
                <button type="button">В корзину</button>
              </div>
            </div>
          </li>
          <li className="hit">
            <img src="https://cdn.etm.ru/ipro/164/small_c9f34116_images_926827.jpg" alt="" />
            <a className="hit-info" href="/s">
              Lorem animi aliquam voluptate facilis quaerat odit dolores neque. Saepe, illo.
            </a>
            <div className="buy-hit">
              <div className="price">
                <p className="first-price">цена</p>
                <p className="past-price">прошлая цена</p>
              </div>
              <div className="add-cart">
                <input type="number" name="" id="" />
                <p>шт</p>
                <button type="button">В корзину</button>
              </div>
            </div>
          </li>
          <li className="hit">
            <img src="https://cdn.etm.ru/ipro/164/small_c9f34116_images_926827.jpg" alt="" />
            <a className="hit-info" href="/s">
              Lorem animi aliquam voluptate facilis quaerat odit dolores neque. Saepe, illo.
            </a>
            <div className="buy-hit">
              <div className="price">
                <p className="first-price">цена</p>
                <p className="past-price">прошлая цена</p>
              </div>
              <div className="add-cart">
                <input type="number" name="" id="" />
                <p>шт</p>
                <button type="button">В корзину</button>
              </div>
            </div>
          </li>
          <li className="hit">
            <img src="https://cdn.etm.ru/ipro/164/small_c9f34116_images_926827.jpg" alt="" />
            <a className="hit-info" href="/s">
              Lorem animi aliquam voluptate facilis quaerat odit dolores neque. Saepe, illo.
            </a>
            <div className="buy-hit">
              <div className="price">
                <p className="first-price">цена</p>
                <p className="past-price">прошлая цена</p>
              </div>
              <div className="add-cart">
                <input type="number" name="" id="" />
                <p>шт</p>
                <button type="button">В корзину</button>
              </div>
            </div>
          </li>
          <li className="hit">
            <img src="https://cdn.etm.ru/ipro/164/small_c9f34116_images_926827.jpg" alt="" />
            <a className="hit-info" href="/s">
              Lorem animi aliquam voluptate facilis quaerat odit dolores neque. Saepe, illo.
            </a>
            <div className="buy-hit">
              <div className="price">
                <p className="first-price">цена</p>
                <p className="past-price">прошлая цена</p>
              </div>
              <div className="add-cart">
                <input type="number" name="" id="" />
                <p>шт</p>
                <button type="button">В корзину</button>
              </div>
            </div>
          </li>
          {/* <div className="right">
            <button
              type="button"
              className="button circle-btn last-circle portfolio-next left-right"
            >
              <img alt="arror-right" src="svg/right.svg" />
            </button>
          </div> */}
        </ul>

        <div>
          <h2>Преимущества работы снами</h2>
          <div className="benefit" />
          <div className="benefit" />
          <div className="benefit" />
          <div className="benefit" />
        </div>
      </main>
    </Layout>
  );
};
