const React = require('react');
const Layout = require('../Layout');

module.exports = function AddProduct(props) {
  const { allCategories } = props;
  return (
    <Layout {...props}>
      <main className="add-product-main">
        <form className="add-product-form" name="productForm">
          <select name="parentproductName">
            <option>Главная категория</option>
            {/* {allCategories.map((category) => (
              <option>{category.name}</option>
            ))} */}
          </select>
          <input name="name" className="product-name" type="text" placeholder="Название" />
          <input name="img" className="img-add" type="file" />
          <input name="code" className="product-name-form" type="text" placeholder="Код товара" />
          <input
            name="manufacturer"
            className="product-name"
            type="text"
            placeholder="Производитель"
          />
          <input name="price" className="product-name" type="text" placeholder="Цена" />
          <input
            name="inStock"
            className="product-name"
            type="text"
            placeholder="Количество в наличии"
          />
          <button type="submit">Добавить</button>
        </form>
      </main>
    </Layout>
  );
};
