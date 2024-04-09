const React = require('react');
const Layout = require('../Layout');
const SideBar = require('./SideBar');

module.exports = function EditCategory(props) {
  const { category } = props;
  return (
    <Layout {...props}>
      <main className="add-categories-main">
        <SideBar {...props} />
        <div className="add-categories-div">
          <form className="add-categories-form" name="categoryEditForm" data-id={category.id}>
            {/* <select name="parentCatgoryName">
              <option>Главная категория</option>
              {allCategories.map((category) => (
                <option>{category.name}</option>
              ))}
            </select> */}
            <input name="name" className="category-name" type="text" value={category.name} />
            <input name="img" className="img-add" type="file" />
            <button type="submit">Изменить</button>
          </form>
        </div>
      </main>
    </Layout>
  );
};
