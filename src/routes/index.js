const router = require('express').Router();
const Home = require('../views/Home');
const Login = require('../views/auth/login');
const Reg = require('../views/auth/reg');
const AdminPage = require('../views/admin/AdminPage');
const Error = require('../views/Error');
const isLogin = require('../middleware/isLogin');
const isMainAdmin = require('../middleware/isMainAdmin');
const { User, Category } = require('../../db/models');
const AddCategories = require('../views/admin/AddCategories');
const Catalog = require('../views/Catalog');
const Products = require('../views/Products');

router.get('/', (req, res) => {
  try {
    res.render(Home);
  } catch (error) {
    res.render(Error, { message: 'Не удалось получить записи из базы данных.', error: {} });
  }
});

router.get('/category', isLogin, (req, res) => {
  try {
    res.render(Catalog);
  } catch (error) {
    res.render(Error, { message: 'Не удалось получить записи из базы данных.', error: {} });
  }
});

router.get('/products', isLogin, (req, res) => {
  try {
    res.render(Products);
  } catch (error) {
    res.render(Error, { message: 'Не удалось получить записи из базы данных.', error: {} });
  }
});

router.get('/auth/login', isLogin, (req, res) => {
  try {
    res.render(Login);
  } catch (error) {
    res.render(Error, { message: 'Не удалось получить записи из базы данных.', error: {} });
  }
});
router.get('/auth/reg', isLogin, (req, res) => {
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
    res.render(Error, { message: 'Не удалось получить записи из базы данных.', error: {} });
  }
});

router.get('/categories/new', async (req, res) => {
  try {
    const allCategories = await Category.findAll();
    res.render(AddCategories, { allCategories });
  } catch (error) {
    res.render(Error, { message: 'Не удалось получить записи из базы данных.', error: {} });
  }
});

module.exports = router;
