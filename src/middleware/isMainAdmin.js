const Error = require('../views/Error');

module.exports = function isMainAdmin(req, res, next) {
  const userRole = req.session?.user?.role;
  if (userRole === 'ADMINISTRATOR') {
    next();
  } else {
    res.render(Error, {
      message: 'У вас нет доступа',
      error: {},
    });
  }
};
