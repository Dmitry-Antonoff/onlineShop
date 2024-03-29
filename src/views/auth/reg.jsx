const React = require('react');
const Layout = require('../Layout');

module.exports = function Registration(props) {
  return (
    <Layout {...props} showSearchForm={false}>
      <main className="reg-main">
        <h1 className="form-h1">Registration</h1>
        <form className="form" name="registration">
          <input className="form-input" type="text" placeholder="name" name="name" />
          <input className="form-input" type="text" placeholder="email" name="email" />
          <input className="form-input" type="password" placeholder="password" name="password" />
          <div>
            <a href="/auth/login">
              <button className="button form-submit-btn" type="submit">
                Register
              </button>
            </a>
          </div>
          <a className="link-reg" href="/auth/login">
            Войти
          </a>
        </form>
      </main>
    </Layout>
  );
};
