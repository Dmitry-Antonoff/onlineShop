const React = require('react');

module.exports = function Layout({ children, user, showSearchForm = true }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="/stylesheets/normalize.css" />
        <link rel="stylesheet" href="/stylesheets/style.css" />
        <link rel="stylesheet" href="/stylesheets/header.css" />
        <link rel="stylesheet" href="/stylesheets/home.css" />
        <link rel="stylesheet" href="/stylesheets/auth.css" />
        <link rel="stylesheet" type="text/css" href="/stylesheets/slick.css" />
        <link rel="stylesheet" type="text/css" href="/stylesheets/slick-theme.css" />
        <script defer src="/js/burger.js" />
        <script defer src="/js/auth.js" />

        <title>Project</title>
      </head>

      <body>
        <div className="header">
          <header className="header-1">
            <nav className="navbar">
              <div className="container">
                <div className="navbar__wrap">
                  <div className="hamb">
                    <div className="hamb__field" id="hamb">
                      <span className="bar" /> <span className="bar" />
                      <span className="bar" />
                    </div>
                  </div>
                  <a href="/" className="logo">
                    <img
                      src="https://yastatic.net/naydex/yandex-search/T1fp6r297/af453b9dpD/r6ET8Ft_tzl0TmqEDIBBX31pfAhmiysIeF_EbZfXWDBPbZo-bTx9sk6Yzj65wkcGDY4chri53vqI8Jw8wb-XQL-iA7wYPKxgKAt0z0CHSFtiImFAZsw3WnNI32-enlNmRj_PUlEbBMYotagVn7w-HlnVGtSir5m57ps"
                      alt=""
                      style={{ height: '50px' }}
                    />
                  </a>
                  {user?.name ? (
                    <ul className="menu" id="menu">
                      <li>
                        <a href="/basket">
                          <img src="/svg/cart.svg" alt="cart" style={{ height: '30px' }} />
                        </a>
                      </li>
                      <li>
                        <a href="/auth/logout">Выйти</a>
                      </li>
                    </ul>
                  ) : (
                    <ul style={{ padding: '0px 40px' }} className="menu" id="menu">
                      <li>
                        <a href="/auth/login">Вход / Регистрация</a>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </nav>
            <div className="popup" id="popup" />
          </header>
          {showSearchForm && (
            <div className="header-2">
              <form className="search">
                <img src="/svg/search.svg" alt="search" style={{ height: '25px' }} />
                <input type="text" placeholder="Поиск" />
                <button type="button">Найти</button>
              </form>
            </div>
          )}
        </div>
        {children}
        <footer>
          <img
            src="https://yastatic.net/naydex/yandex-search/T1fp6r297/af453b9dpD/r6ET8Ft_tzl0TmqEDIBBX31pfAhmiysIeF_EbZfXWDBPbZo-bTx9sk6Yzj65wkcGDY4chri53vqI8Jw8wb-XQL-iA7wYPKxgKAt0z0CHSFtiImFAZsw3WnNI32-enlNmRj_PUlEbBMYotagVn7w-HlnVGtSir5m57ps"
            alt=""
            style={{ height: '50px' }}
          />
          <div>
            <p>Социальные сети</p>
            <div>
              <img src="" alt="" />
              <img src="" alt="" />
              <img src="" alt="" />
            </div>
          </div>
        </footer>
        <script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js" />
        <script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js" />
        <script type="text/javascript" src="/js/slick.min.js" />
        <script type="text/javascript" src="/js/slider.js" />
      </body>
    </html>
  );
};
