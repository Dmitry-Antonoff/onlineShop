const Error = require('../views/Error');

module.exports = function isAuth(req, res, next) {
  const user = req.session?.user?.name;
  if (user) {
    next();
  } else {
    res.render(Error, {
      message: 'Вы не вошли в аккаунт!',
      error: {},
    });
  }
};
