// const Error = require('../views/Error');

module.exports = function isAdmin(req, res, next) {
  const userRole = req.session?.user?.role;
  if (userRole === 'ADMIN') {
    next();
  } else {
    // res.render(Error, {
    //   message: 'You are already authorized',
    //   error: {},
    // });
    res.send('У вас нет доступа');
  }
};
