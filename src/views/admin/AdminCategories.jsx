const React = require('react');
const Layout = require('../Layout');
const SideBar = require('./SideBar');

module.exports = function AdminCategories(props) {
  const { allUsers, page, limit } = props;
  return (
    <Layout {...props}>
      <main className="admin-main">
        <SideBar {...props} />
        <div className="administrator">
          <div className="search-div">
            <form className="search-user" name="searchProduct">
              <img src="/svg/search.svg" alt="search" style={{ height: '25px' }} />
              <input type="text" placeholder="Поиск Товара" name="product" />
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
              {/* {allProducts.map((product) => (
                <tr className="all-products-li">
                  <td className="admin-products-name">выфафвыа фвыафыва</td>
                  <td className="button-div">
                    <a href={`/product/edit`}>
                      <button type="button" className="edit-btn">
                        <img className="edit" src="/svg/edit.svg" alt="Изменить" />
                      </button>
                    </a>
                    <button type="button" className="trash-btn">
                      <img className="trash" src="/svg/trash.svg" alt="Удалить" />
                    </button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
          <div className="back-next">
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
        </div>
      </main>
    </Layout>
  );
};
