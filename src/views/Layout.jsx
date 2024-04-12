const React = require('react');

module.exports = function Layout({ children, user, showSearchForm = true, searchP }) {
  const services = [
    { name: 'Способы Оплаты', href: '/' },
    { name: 'Доставка', href: '/' },
    { name: 'Гарантия-Возраст', href: '/' },
    { name: 'Правила и Условие', href: '/' },
    { name: 'Политика конфеденциальности', href: '/' },
  ];
  const ContactUs = [
    { name: 'Контакты', href: '/' },
    { name: 'Телефон: ...', href: '/' },
    { name: 'Улица ...', href: '/' },
    { name: 'E-mail', href: '/' },
  ];
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/stylesheets/normalize.css" />
        <link rel="stylesheet" href="/stylesheets/product.css" />
        <link rel="stylesheet" href="/stylesheets/style.css" />
        <link rel="stylesheet" href="/stylesheets/header.css" />
        <link rel="stylesheet" href="/stylesheets/slick/slide.css" />
        <link rel="stylesheet" href="/stylesheets/home.css" />
        <link rel="stylesheet" href="/stylesheets/auth.css" />
        <link rel="stylesheet" type="text/css" href="/stylesheets/slick/slick.css" />
        <link rel="stylesheet" type="text/css" href="/stylesheets/slick/slick-theme.css" />
        <link rel="stylesheet" type="text/css" href="/stylesheets/catalog.css" />
        <link rel="stylesheet" type="text/css" href="/stylesheets/adminStyle/admin.css" />
        <link rel="stylesheet" type="text/css" href="/stylesheets/products.css" />
        <link rel="stylesheet" type="text/css" href="/stylesheets/basket.css" />
        <script defer src="/js/burger.js" />
        <script defer src="/js/auth.js" />
        <script defer src="/js/admin.js" />
        <script defer src="/js/basket.js" />

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
                      {user?.role === 'ADMINISTRATOR' || user?.role === 'ADMIN' ? (
                        <li>
                          <a href="/admin/categories">Админка</a>
                        </li>
                      ) : null}
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
              <form className="search" name="searchProduct" method="GET" action="/products">
                <img src="/svg/search.svg" alt="search" style={{ height: '25px' }} />
                <input type="text" placeholder="Поиск" name="searchP" value={searchP} />
                <button type="submit">Найти</button>
              </form>
            </div>
          )}
        </div>
        {children}
        <footer>
          <img
            src="https://yastatic.net/naydex/yandex-search/T1fp6r297/af453b9dpD/r6ET8Ft_tzl0TmqEDIBBX31pfAhmiysIeF_EbZfXWDBPbZo-bTx9sk6Yzj65wkcGDY4chri53vqI8Jw8wb-XQL-iA7wYPKxgKAt0z0CHSFtiImFAZsw3WnNI32-enlNmRj_PUlEbBMYotagVn7w-HlnVGtSir5m57ps"
            alt="logo"
            className="footer-log"
            style={{ height: '50px' }}
          />

          <div className="social">
            <p>Социальные сети</p>
            <ul>
              <li className="msg">
                <a href="https://t.me/IGOR_5775" target="_blank" rel="noreferrer">
                  <img src="/svg/telegram.svg" alt="telegram" />
                </a>
              </li>
              <li className="msg">
                <a href="https://wa.me/qr/K6N5BJFKOPDGO1" target="_blank" rel="noreferrer">
                  <img style={{ width: '43px' }} src="/svg/whatsapp.svg" alt="whatsapp" />
                </a>
              </li>
            </ul>
          </div>
          <div className="info-footer">
            <p>Сервисы</p>
            <ul className="services">
              {services.map((el) => (
                <li>
                  <a href={el.href}>{el.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="info-footer">
            <p>Связаться с нами</p>
            <ul className="contact-us">
              {ContactUs.map((el) => (
                <li>
                  <a href={el.href}>{el.name}</a>
                </li>
              ))}
            </ul>
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
