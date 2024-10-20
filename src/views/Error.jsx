const React = require('react');
const Layout = require('./Layout');

module.exports = function Error(props) {
  const { message, error } = props;
  return (
    <Layout {...props}>
      <main className="Error-main">
        <h1>{message}</h1>
        <h2>{error.status}</h2>
        <pre>{error.stack}</pre>
      </main>
    </Layout>
  );
};
