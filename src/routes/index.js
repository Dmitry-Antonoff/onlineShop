const router = require('express').Router();
const Home = require('../views/Home');
const Login = require('../views/auth/login');
const Reg = require('../views/auth/reg');
const AdminPage = require('../views/admin/AdminPage');
const Error = require('../views/Error');
const isLogin = require('../middleware/isLogin');
const isMainAdmin = require('../middleware/isMainAdmin');
const isAdmin = require('../middleware/isAdmin');
const { User, Category, Product } = require('../../db/models');
const AddCategories = require('../views/admin/AddCategories');
const Catalog = require('../views/Catalog');
const Products = require('../views/Products');
const AddProduct = require('../views/admin/AddProduct');
const AdminProducts = require('../views/admin/AdminProducts');
const AdminCategories = require('../views/admin/AdminCategories');
const EditProduct = require('../views/admin/EditProduct');
const Basket = require('../views/Basket');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ where: { parentCategoryId: null } });
    res.render(Home, { categories });
  } catch (error) {
    res.render(Error, { message: 'Не удалось получить записи из базы данных.', error: {} });
  }
});

router.get('/basket', async (req, res) => {
  try {
    res.render(Basket, {});
  } catch (error) {
    res.render(Error, { message: 'Не удалось получить записи из базы данных.', error: {} });
  }
});

router.get('/category', (req, res) => {
  try {
    res.render(Catalog);
  } catch (error) {
    console.log(error);
    res.render(Error, { message: 'Не удалось получить записи из базы данных.', error: {} });
  }
});

router.get('/products', (req, res) => {
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
    console.error(error);
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
    res.render(Error, { message: 'Не удалось получить записи из базы данных.', error: {} });
  }
});

router.get('/admin/products', isAdmin, async (req, res) => {
  try {
    res.render(AdminProducts, {});
  } catch (error) {
    res.render(Error, { message: 'Не удалось получить записи из базы данных.', error: {} });
  }
});

router.get('/admin/categories', isAdmin, async (req, res) => {
  try {
    res.render(AdminCategories, {});
  } catch (error) {
    res.render(Error, { message: 'Не удалось получить записи из базы данных.', error: {} });
  }
});

router.get('/categories/new', isAdmin, async (req, res) => {
  try {
    const allCategories = await Category.findAll();
    res.render(AddCategories, { allCategories });
  } catch (error) {
    res.render(Error, { message: 'Не удалось получить записи из базы данных.', error: {} });
  }
});

router.get('/product/new', isAdmin, async (req, res) => {
  try {
    res.render(AddProduct, {});
  } catch (error) {
    res.render(Error, { message: 'Не удалось получить записи из базы данных.', error: {} });
  }
});

router.get('/product/:id/new', isAdmin, async (req, res) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    res.render(EditProduct, { product });
  } catch (error) {
    res.render(Error, { message: 'Не удалось получить записи из базы данных.', error: {} });
  }
});

module.exports = router;
