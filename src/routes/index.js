const router = require('express').Router();
const Home = require('../views/Home');
const Login = require('../views/auth/login');
const Reg = require('../views/auth/reg');
const AdminPage = require('../views/AdminPage');
const isLogin = require('../middleware/isLogin');
const isMainAdmin = require('../middleware/isMainAdmin');
const { User } = require('../../db/models');

router.get('/', (req, res) => {
  res.render(Home);
});

router.get('/auth/login', isLogin, (req, res) => {
  res.render(Login);
});

router.get('/auth/reg', isLogin, (req, res) => {
  res.render(Reg);
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
