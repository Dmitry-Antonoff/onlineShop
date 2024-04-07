const React = require('react');

module.exports = function SideBar(props) {
  const { allCategories, user } = props;

  function isActive(path) {
    return window.location.pathname === path ? 'active' : '';
  }
  return (
    <ul className="side-bar">
      <li>
        <a href="/categories/new">Категории</a>
      </li>
      <li>
        <a href="/product/new">Товары</a>
      </li>
      {user?.role === 'ADMINISTRATOR' && (
        <li>
          <a href="/admin">Пользователи</a>
        </li>
      )}
    </ul>
  );
};
