const React = require('react');
const Layout = require('../Layout');
const SideBar = require('./SideBar');

module.exports = function AdminCategories(props) {
  const { allCategories, page, limit, search } = props;
  return (
    <Layout {...props}>
      <main className="admin-main">
        <SideBar {...props} />
        <div className="administrator">
          <div className="search-div">
            <form className="search-user" name="searchCateory" method="GET">
              <img src="/svg/search.svg" alt="search" style={{ height: '25px' }} />
              <input type="text" placeholder="Поиск Категории" name="search" value={search} />
              <button type="submit">Найти</button>
            </form>
            <a href="/categories/new">
              <button type="button" className="edit-btn">
                <img className="edit" src="/svg/add.svg" alt="Изменить" />
              </button>
            </a>
          </div>
          <table className="all-products">
            <thead>
              <tr className="all-products-li-name">
                <th>Имя категории</th>
                <th className="action">Действие</th>
              </tr>
            </thead>
            <tbody>
              {allCategories.map((category) => (
                <tr className="all-products-li" id={category.id}>
                  <td className="admin-products-name">{category.name}</td>
                  <td className="button-div">
                    <a href={`/category/${category.id}/edit`}>
                      <button type="button" className="edit-btn">
                        <img className="edit" src="/svg/edit.svg" alt="Изменить" />
                      </button>
                    </a>
                    <button
                      type="button"
                      className="trash-btn btn-delete-category"
                      data-id={category.id}
                    >
                      <img
                        data-id={category.id}
                        className="trash"
                        src="/svg/trash.svg"
                        alt="Удалить"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="back-next">
            <a
              href={`/admin/categories?${search ? `search=${search}&` : ''}page=${
                +page > 1 ? +page - 1 : +page
              }`}
            >
              <img src="/svg/left.svg" alt="back" />
            </a>
            {+page >= 3 && (
              <a href={`/admin/categories?${search ? `search=${search}&` : ''}page=${+page - 2}`}>
                {+page - 2}
              </a>
            )}
            {+page >= 2 && (
              <a href={`/admin/categories?${search ? `search=${search}&` : ''}page=${+page - 1}`}>
                {+page - 1}
              </a>
            )}
            <span>...</span>
            {+page === limit || (
              <a href={`/admin/categories?${search ? `search=${search}&` : ''}page=${+page + 1}`}>
                {+page + 1}
              </a>
            )}
            {+page + 1 >= limit || (
              <a href={`/admin/categories?${search ? `search=${search}&` : ''}page=${+page + 2}`}>
                {+page + 2}
              </a>
            )}
            <a
              href={`/admin/categories?${search ? `search=${search}&` : ''}page=${
                +page < limit ? +page + 1 : +page
              }`}
            >
              <img src="/svg/right.svg" alt="next" />
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
};
