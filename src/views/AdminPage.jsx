const React = require('react');
const Layout = require('./Layout');

module.exports = function AdminPage(props) {
  const { allUsers, page, limit } = props;
  return (
    <Layout {...props}>
      <main className="admin-main">
        <div className="search-div">
          <form className="search-user">
            <img src="/svg/search.svg" alt="search" style={{ height: '25px' }} />
            <input type="text" placeholder="Поиск Пользователей" />
            <button type="button">Найти</button>
          </form>
        </div>
        <ul className="all-users">
          {/* {allUsers.map((user) => (
            <li>
              <p>{user.name}</p> <p>{user.email}</p>
              {user.role === 'ADMIN' ? (
                <button type="button">Убрать Админа</button>
              ) : (
                <button style={{ color: 'red' }} type="button">
                  Сделать Админом
                </button>
              )}
            </li>
          ))} */}
        </ul>
        <div className="back-next">
          <a href={`/admin?page=${+page > 1 ? +page - 1 : +page}`}>
            <img src="/svg/left.svg" alt="back" />
          </a>
          {+page >= 3 && <a href={`/admin?page=${+page - 2}`}>{+page - 2}</a>}
          <span>...</span>
          {+page >= 2 && <a href={`/admin?page=${+page - 1}`}>{+page - 1}</a>}
          {+page === limit || <a href={`/admin?page=${+page + 1}`}>{+page + 1}</a>}
          {+page + 1 >= limit || <a href={`/admin?page=${+page + 2}`}>{+page + 2}</a>}
          <a href={`/admin?page=${+page < limit ? +page + 1 : +page}`}>
            <img src="/svg/right.svg" alt="next" />
          </a>
        </div>
      </main>
    </Layout>
  );
};
