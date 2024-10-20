const React = require('react');
const Layout = require('../Layout');
const SideBar = require('./SideBar');

module.exports = function AdminProducts(props) {
  const { allProducts, page, limit, search, all } = props;
  return (
    <Layout {...props}>
      <main className="admin-main">
        <SideBar {...props} />
        <div className="administrator">
          <div className="search-div">
            <form className="search-user" name="searchProduct" method="GET">
              <img
                src="/svg/search.svg"
                alt="search"
                style={{ height: '25px' }}
              />
              <input
                type="text"
                placeholder="Поиск Товара"
                name="search"
                value={search}
              />
              <button type="submit">Найти</button>
            </form>
            <a href="/product/new">
              <button type="button" className="edit-btn">
                <img className="edit" src="/svg/add.svg" alt="Изменить" />
              </button>
            </a>
          </div>
          <h2>Товары</h2>
          <table className="all-products">
            <thead>
              <tr className="all-products-li-name">
                <th>Картинка</th>
                <th className="admin-productsName">Название</th>
                <th>Код</th>
                <th>Производитель</th>
                <th>Цена</th>
                <th>В наличии</th>
                <th className="action">Действие</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((product) => (
                <tr className="all-products-li" id={product.id}>
                  <td className="product-img-td">
                    <img
                      className="product-img"
                      src={product.imgPath}
                      alt={product.name}
                    />
                  </td>
                  <td className="admin-productsName">{product.name}</td>
                  <td className="admin-products-name">{product.productCode}</td>
                  <td className="admin-products-stock">
                    {product.Manufacturer.name}
                  </td>
                  <td className="admin-products-name">{product.price} Лари</td>
                  <td className="admin-products-name">
                    {product.quantityInStock} шт
                  </td>
                  <td className="button-div">
                    <a href={`/product/${product.id}/edit`}>
                      <button type="button" className="edit-btn">
                        <img
                          className="edit"
                          src="/svg/edit.svg"
                          alt="Изменить"
                        />
                      </button>
                    </a>
                    <button
                      type="button"
                      className="trash-btn btn-product-delete"
                      data-id={product.id}
                    >
                      <img
                        data-id={product.id}
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
          {all.length > 10 && (
            <div className="back-next">
              <a
                href={`/admin/products?${
                  search ? `search=${search}&` : ''
                }page=${+page > 1 ? +page - 1 : +page}`}
              >
                <img src="/svg/left.svg" alt="back" />
              </a>
              {+page >= 3 && (
                <a
                  href={`/admin/products?${
                    search ? `search=${search}&` : ''
                  }page=${+page - 2}`}
                >
                  {+page - 2}
                </a>
              )}
              {+page >= 2 && (
                <a
                  href={`/admin/products?${
                    search ? `search=${search}&` : ''
                  }page=${+page - 1}`}
                >
                  {+page - 1}
                </a>
              )}
              <span>...</span>
              {+page === limit || (
                <a
                  href={`/admin/products?${
                    search ? `search=${search}&` : ''
                  }page=${+page + 1}`}
                >
                  {+page + 1}
                </a>
              )}
              {+page + 1 >= limit || (
                <a
                  href={`/admin/products?${
                    search ? `search=${search}&` : ''
                  }page=${+page + 2}`}
                >
                  {+page + 2}
                </a>
              )}
              <a
                href={`/admin/products?${
                  search ? `search=${search}&` : ''
                }page=${+page < limit ? +page + 1 : +page}`}
              >
                <img src="/svg/right.svg" alt="next" />
              </a>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};
