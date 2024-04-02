const React = require('react');
const Layout = require('../Layout');

module.exports = function AddCategories(props) {
  const { allCategories } = props;
  return (
    <Layout {...props}>
      <main className="add-categories-main">
        <form className="add-categories-form" name="categoriesForm">
          <select name="parentCatgoryName">
            <option>Главная категория</option>
            {/* {allCategories.map((category) => (
              <option'>{category.name}</option>
            ))} */}
          </select>
          <input name="name" className="category-name" type="text" placeholder="Название" />
          <input name="imgPath" className="img-add" type="file" />
          <button type="button">Добавить</button>
        </form>
      </main>
    </Layout>
  );
};
