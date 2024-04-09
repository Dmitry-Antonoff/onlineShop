const React = require('react');
const Layout = require('../Layout');
const SideBar = require('./SideBar');

module.exports = function AdminPage(props) {
  const { allUsers, page, limit } = props;
  return (
    <Layout {...props}>
      <main className="admin-main">
        <SideBar {...props}/>
        <div className="administrator">
          <div className="search-user-div">
            <form className="search-user" name="searchUser">
              <img src="/svg/search.svg" alt="search" style={{ height: '25px' }} />
              <input type="text" placeholder="Поиск Пользователей" name="userName" />
              <button type="submit">Найти</button>
            </form>
          </div>
          <ul className="all-users">
            {allUsers.map((user) => (
              <li id={user.id}>
                <p>{user.name}</p> <p>{user.email}</p>
                {user.role === 'ADMIN' ? (
                  <button
                    className="btnUndoAdmin"
                    data-id={user.id}
                    id={`${user.id}-undo`}
                    type="button"
                  >
                    Убрать Админа
                  </button>
                ) : user.role !== 'ADMINISTRATOR' ? (
                  <button
                    type="button"
                    className="btnAddAdmin"
                    data-id={user.id}
                    id={`${user.id}-add`}
                  >
                    Сделать Админом
                  </button>
                ) : (
                  <span>Вы</span>
                )}
              </li>
            ))}
          </ul>
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
