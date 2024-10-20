const Error = require('../views/Error');

module.exports = function isAdmin(req, res, next) {
  const userRole = req.session?.user?.role;
  if (userRole === 'ADMIN' || userRole === 'ADMINISTRATOR') {
    next();
  } else {
    res.render(Error, {
      message: 'У вас нет доступа',
      error: {},
    });
  }
};
