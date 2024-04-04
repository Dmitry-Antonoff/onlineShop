const React = require('react');
const Layout = require('./Layout');

module.exports = function Home(props) {
  // const { category } = props;
  return (
    <Layout {...props}>
      <main className="catalog-main"></main>
    </Layout>
  );
};
