const React = require('react');
const Layout = require('../Layout');

module.exports = function Login(props) {
  return (
    <Layout {...props} showSearchForm={false}>
      <main className="reg-main">
        <h1 className="form-h1">Login</h1>
        <form className="form" name="login">
          <input className="form-input" type="text" placeholder="email" name="email" />
          <input className="form-input" type="password" placeholder="password" name="password" />
          <button className="button form-submit-btn" type="submit">
            Login
          </button>
          <a className="link-reg" href="/auth/reg">
            Регистрация
          </a>
        </form>
      </main>
    </Layout>
  );
};
