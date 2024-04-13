const React = require('react');

module.exports = function SideBar(props) {
  const { user } = props;

  // function isActive(path) {
  //   return window.location.pathname === path ? 'active' : '';
  // }
  return (
    <ul className="side-bar">
      <li>
        <a href="/admin/categories">Категории</a>
      </li>
      <li>
        <a href="/admin/products">Товары</a>
      </li>
      <li>
        <a href="/admin/orders">Заказы</a>
      </li>
      {user?.role === 'ADMINISTRATOR' && (
        <li>
          <a href="/admin">Пользователи</a>
        </li>
      )}
    </ul>
  );
};
