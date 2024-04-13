const React = require('react');
const Layout = require('../Layout');
const SideBar = require('./SideBar');

module.exports = function AdminOrders(props) {
  const { allOrders, page, limit, search, all } = props;
  return (
    <Layout {...props}>
      <main className="admin-main">
        <SideBar {...props} />
        <div className="administrator">
          <h2>Заказы</h2>
          <table className="all-products">
            <thead>
              <tr className="all-products-li-name">
                <th>ID Заказа</th>
                <th className="action">Действие</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => (
                <tr className="all-products-li" id={order.id}>
                  <td className="admin-products-name">{order.id}</td>
                  <td className="button-div">
                    <a href={`orders/${order.id}`}>
                      <button type="button" className="edit-btn">
                        <img
                          className="edit"
                          src="/svg/edit.svg"
                          alt="Изменить"
                        />
                      </button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {all.length > 10 && (
            <div className="back-next">
              <a
                href={`/admin/orders?${search ? `search=${search}&` : ''}page=${
                  +page > 1 ? +page - 1 : +page
                }`}
              >
                <img src="/svg/left.svg" alt="back" />
              </a>
              {+page >= 3 && (
                <a
                  href={`/admin/orders?${
                    search ? `search=${search}&` : ''
                  }page=${+page - 2}`}
                >
                  {+page - 2}
                </a>
              )}
              {+page >= 2 && (
                <a
                  href={`/admin/orders?${
                    search ? `search=${search}&` : ''
                  }page=${+page - 1}`}
                >
                  {+page - 1}
                </a>
              )}
              <span>...</span>
              {+page === limit || (
                <a
                  href={`/admin/orders?${
                    search ? `search=${search}&` : ''
                  }page=${+page + 1}`}
                >
                  {+page + 1}
                </a>
              )}
              {+page + 1 >= limit || (
                <a
                  href={`/admin/orders?${
                    search ? `search=${search}&` : ''
                  }page=${+page + 2}`}
                >
                  {+page + 2}
                </a>
              )}
              <a
                href={`/admin/orders?${search ? `search=${search}&` : ''}page=${
                  +page < limit ? +page + 1 : +page
                }`}
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
