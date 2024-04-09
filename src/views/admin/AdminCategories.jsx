const React = require('react');
const Layout = require('../Layout');
const SideBar = require('./SideBar');

module.exports = function AdminCategories(props) {
  const { allUsers, page, limit } = props;
  return (
    <Layout {...props}>
      <main className="admin-main">
        <SideBar {...props} />
      
      </main>
    </Layout>
  );
};
