const React = require('react');
const Layout = require('./Layout');

module.exports = function Catalog(props) {
  const { category } = props;
  return (
    <Layout {...props}>
      <main className="catalog-main">
        <h2>{category.name}</h2>

        <ul className="catalogs">
          {category.children.map((catalog) => (
            <li className="catalog">
              <a href="/">
                <div className="catalog-img">
                  <img src={`${catalog.photoPath}`} alt="" />
                </div>
                <a href="/" className="catalog-link">
                  {catalog.name}
                </a>
                <ul className="catalog-ul">
                  {catalog.children.map((categry) => (
                    <li>
                      <a href="/">{categry.name}</a>
                    </li>
                  ))}
                </ul>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};
