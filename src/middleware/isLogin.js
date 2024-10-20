const Error = require('../views/Error');

module.exports = function isLogin(req, res, next) {
  const user = req.session?.user?.name;
  if (!user) {
    next();
  } else {
    res.render(Error, {
      message: 'Вы уже авторизованы!',
      error: {},
    });
  }
};
