const React = require('react');
const Layout = require('../Layout');

module.exports = function Login(props) {
  return (
    <Layout {...props} showSearchForm={false}>
      <main className="reg-main">
        <h1 className="form-h1">Login</h1>
        <form className="form" name="login">
          <input className="form-input" type="text" placeholder="email" name="email" required />
          <input
            className="form-input"
            type="password"
            placeholder="password"
            name="password"
            required
          />
          <button className="button form-submit-btn" type="submit">
            Login
          </button>
          <a className="link-reg" href="/auth/reg">
            Регистрация
          </a>
          <p className="or">Или</p>
          <a className="src-google" href="/auth/google">
            <img src="/svg/google.svg" alt="google" /> Продолжить с Google
          </a>
        </form>
      </main>
    </Layout>
  );
};
