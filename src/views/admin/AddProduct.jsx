const React = require('react');
const Layout = require('../Layout');
const SideBar = require('./SideBar');

module.exports = function AddProduct(props) {
  const { allCategories } = props;
  return (
    <Layout {...props}>
      <main className="add-product-main">
        <SideBar {...props} />
        <div className="add-product-div">
          <form className="add-product-form" name="productForm">
            <div className="product-value-div">
              <select name="parentproductName">
                {allCategories.map((category) => (
                  <option>{category.name}</option>
                ))}
              </select>
              <input name="name" className="product-name-form" type="text" placeholder="Название" />
              <input name="img" className="img-add" type="file" />
              <input
                name="code"
                className="product-name-form"
                type="text"
                placeholder="Код товара"
              />
              <input
                name="manufacturer"
                className="product-name-form"
                type="text"
                placeholder="Производитель"
              />
              <input name="price" className="product-name-form" type="text" placeholder="Цена" />
              <input
                name="inStock"
                className="product-name-form"
                type="text"
                placeholder="Количество в наличии"
              />
              <button className="add-product-form-button" type="submit">
                Добавить
              </button>
            </div>
            <div className="characteristics-add">
              <h2>Характеристики</h2>
              <button type="button" className="edit-btn add-value-characteristics">
                <img className="edit" src="/svg/add.svg" alt="Добавить" />
              </button>
              <div className="characteristics-list" />
            </div>
            <div className="description">
              <h2>Описание</h2>
              <textarea name="description" cols="30" rows="10" />
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};
