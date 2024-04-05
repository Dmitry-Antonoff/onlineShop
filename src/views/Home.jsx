const React = require('react');
const Layout = require('./Layout');

module.exports = function Home(props) {
  const { categories } = props;
  return (
    <Layout {...props}>
      <main className="home-main">
        <div className="slider-container">
          <h2>Категории</h2>
          <button type="button" className="prev" onClick="prevSlide()">
            Назад
          </button>
          <div className="categories slider">
            {categories.map((category) => (
              <a className="category-link slide" href={`/category/${category.name}`}>
                <div className="category">
                  <img src={`${category.photoPath}`} alt="" />
                  <p>{category.name}</p>
                </div>
              </a>
            ))}
          </div>
          <button type="button" className="next" onClick="nextSlide()">
            Вперед
          </button>
          <h2>Хиты продаж</h2>
          <div className="≈">
            <div className="left">
              <button
                type="button"
                className="button circle-btn first-circle portfolio-prev left-right"
              >
                <img alt="arror-left" src="svg/left.svg" />
              </button>
            </div>
            <div className="hit">
              <img src="https://cdn.etm.ru/ipro/164/small_c9f34116_images_926827.jpg" alt="" />
              <a className="hit-info" href="/s">
                Lorem animi aliquam voluptate facilis quaerat odit dolores neque. Saepe, illo.
              </a>
              <div className="buy">
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
            </div>
            <div className="hit">
              <img src="https://cdn.etm.ru/ipro/164/small_c9f34116_images_926827.jpg" alt="" />
              <a className="hit-info" href="/s">
                Lorem animi aliquam voluptate facilis quaerat odit dolores neque. Saepe, illo.
              </a>
              <div className="buy">
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
            </div>
            <div className="hit">
              <img src="https://cdn.etm.ru/ipro/164/small_c9f34116_images_926827.jpg" alt="" />
              <a className="hit-info" href="/s">
                Lorem animi aliquam voluptate facilis quaerat odit dolores neque. Saepe, illo.
              </a>
              <div className="buy">
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
            </div>
            <div className="hit">
              <img src="https://cdn.etm.ru/ipro/164/small_c9f34116_images_926827.jpg" alt="" />
              <a className="hit-info" href="/s">
                Lorem animi aliquam voluptate facilis quaerat odit dolores neque. Saepe, illo.
              </a>
              <div className="buy">
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
            </div>
            <div className="hit">
              <img src="https://cdn.etm.ru/ipro/164/small_c9f34116_images_926827.jpg" alt="" />
              <a className="hit-info" href="/s">
                Lorem animi aliquam voluptate facilis quaerat odit dolores neque. Saepe, illo.
              </a>
              <div className="buy">
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
            </div>
            <div className="hit">
              <img src="https://cdn.etm.ru/ipro/164/small_c9f34116_images_926827.jpg" alt="" />
              <a className="hit-info" href="/s">
                Lorem animi aliquam voluptate facilis quaerat odit dolores neque. Saepe, illo.
              </a>
              <div className="buy">
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
            </div>
            <div className="right">
              <button
                type="button"
                className="button circle-btn last-circle portfolio-next left-right"
              >
                <img alt="arror-right" src="svg/right.svg" />
              </button>
            </div>
          </div>
        </div>
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
