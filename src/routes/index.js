const router = require('express').Router();
const Home = require('../views/Home');
const Login = require('../views/auth/login');
const Reg = require('../views/auth/reg');
const AdminPage = require('../views/AdminPage');

router.get('/', (req, res) => {
  res.render(Home);
});

router.get('/auth/login', (req, res) => {
  res.render(Login);
});
router.get('/auth/reg', (req, res) => {
  res.render(Reg);
});

router.get('/admin', (req, res) => {
  res.render(AdminPage);
});

module.exports = router;
