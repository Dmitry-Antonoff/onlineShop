const router = require('express').Router();
const Home = require('../views/Home');
const Login = require('../views/auth/login');
const Reg = require('../views/auth/reg');
const AdminPage = require('../views/AdminPage');
const Error = require('../views/Error');
const isLogin = require('../middleware/isLogin');
const isMainAdmin = require('../middleware/isMainAdmin');
const { User } = require('../../db/models');

router.get('/', (req, res) => {
  try {
    res.render(Home);
  } catch (error) {
    res.render(Error, { message: 'Не удалось получить записи из базы данных.', error: {} });
  }
});


router.get('/auth/login', (req, res) => {
  try {
    res.render(Login);
  } catch (error) {
    res.render(Error, { message: 'Не удалось получить записи из базы данных.', error: {} });
  }
});
router.get('/auth/reg', (req, res) => {
  try {
    res.render(Reg);
  } catch (error) {
    res.render(Error, { message: 'Не удалось получить записи из базы данных.', error: {} });
  }
});

router.get('/admin', isMainAdmin, async (req, res) => {
  try {
    const { page } = req.query;
    const allUser = await User.findAll();
    const limit = Math.ceil(allUser.length / 10);
    const allUsers = await User.findAll({
      limit: 10,
      offset: +page ? (+page - 1) * 10 : 0,
      order: [['name', 'ASC']],
    });
    res.render(AdminPage, { allUsers, page: page || 1, limit });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
