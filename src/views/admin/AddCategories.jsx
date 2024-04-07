const React = require('react');
const Layout = require('../Layout');
const SideBar = require('./SideBar');

module.exports = function AddCategories(props) {
  const { allCategories } = props;
  return (
    <Layout {...props}>
      <main className="add-categories-main">
        <SideBar {...props} />
        <div className="add-categories-div">
          <form className="add-categories-form" name="categoriesForm">
            <select name="parentCatgoryName">
              <option>Главная категория</option>
              {allCategories.map((category) => (
                <option>{category.name}</option>
              ))}
            </select>
            <input name="name" className="category-name" type="text" placeholder="Название" />
            <input name="img" className="img-add" type="file" />
            <button type="submit">Добавить</button>
          </form>
        </div>
      </main>
    </Layout>
  );
};
