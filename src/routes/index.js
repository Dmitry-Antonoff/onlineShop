const router = require('express').Router();
const { Sequelize } = require('sequelize');
const Home = require('../views/Home');
const Login = require('../views/auth/login');
const Reg = require('../views/auth/reg');
const AdminPage = require('../views/admin/AdminPage');
const Error = require('../views/Error');
const isLogin = require('../middleware/isLogin');
const isMainAdmin = require('../middleware/isMainAdmin');
const isAdmin = require('../middleware/isAdmin');
const isAuth = require('../middleware/isAuth');
const {
  User,
  Category,
  Product,
  Manufacturer,
  BasketList,
  Order,
  OrderProduct,
} = require('../../db/models');
const AddCategories = require('../views/admin/AddCategories');
const Catalog = require('../views/Catalog');
const Products = require('../views/Products');
const ProductPage = require('../views/Product');
const AddProduct = require('../views/admin/AddProduct');
const AdminProducts = require('../views/admin/AdminProducts');
const AdminCategories = require('../views/admin/AdminCategories');
const AdminOrders = require('../views/admin/AdminOrders');
const AdminOrder = require('../views/admin/AdminOrder');
const EditProduct = require('../views/admin/EditProduct');
const Basket = require('../views/Basket');
const BasketDone = require('../views/BasketDone');
const EditCategory = require('../views/admin/EditCategory');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { parentCategoryId: null },
    });
    res.render(Home, { categories });
  } catch (error) {
    res.render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
});

router.get('/basket', isAuth, async (req, res) => {
  try {
    const userId = req.session.user?.id ?? 0;
    const basList = await BasketList.findAll({
      where: { userId },
      include: [Product],
    });
    res.render(Basket, { basList });
  } catch (error) {
    console.log(error);
    res.render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
});

router.get('/basket/done', async (req, res) => {
  try {
    res.render(BasketDone);
  } catch (error) {
    console.log(error);
    res.render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
});

router.get('/category/:categoryName', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { name: req.params.categoryName },
      include: [
        {
          model: Category,
          as: 'children',
          include: [{ model: Category, as: 'children' }],
        },
      ],
    });
    res.render(Catalog, { category });
  } catch (error) {
    console.log(error);
    res.render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
});
// test

async function getParentCategories(cat, result = []) {
  if (cat) {
    result.push(cat);
    if (cat.parentCategoryId) {
      const parentCategory = await Category.findOne({
        where: { id: cat.parentCategoryId },
      });
      await getParentCategories(parentCategory, result);
    }
  }
  return result;
}
async function getAllChildCategories(categoryId) {
  const children = await Category.findAll({
    where: { parentCategoryId: categoryId },
  });

  let allChildren = [...children];
  for (const child of children) {
    const childChildren = await getAllChildCategories(child.id);
    allChildren = [...allChildren, ...childChildren];
  }

  return allChildren;
}
router.get('/products/:catId', async (req, res) => {
  try {
    const { page, search } = req.query;
    const category = await Category.findOne({
      where: { id: req.params.catId },
      include: [
        {
          model: Category,
          as: 'parent',
        },
        {
          model: Category,
          as: 'children',
        },
      ],
    });

    const childCategories = await getAllChildCategories(req.params.catId);
    const categoryIds = [
      req.params.catId,
      ...childCategories.map((cat) => cat.id),
    ];

    const where = search
      ? {
          [Sequelize.Op.or]: [
            {
              name: {
                [Sequelize.Op.iLike]: `%${search}%`,
              },
            },
          ],
        }
      : { categoryId: { [Sequelize.Op.in]: categoryIds } };

    const parentCategories = await getParentCategories(category.parent);
    parentCategories.pop();

    const allProducts = await Product.findAll({ where });
    const limit = Math.ceil(allProducts.length / 12);

    const products = await Product.findAll({
      include: [Category, Manufacturer],
      limit: 12,
      offset: +page ? (+page - 1) * 12 : 0,
      order: [['name', 'ASC']],
      where,
    });
    const userId = req.session.user?.id ?? 0;

    const basket = await BasketList.findAll({
      where: { userId },
    });

    res.render(Products, {
      category,
      parentCategories,
      products,
      page: page || 1,
      limit,
      search,
      all: allProducts,
      basket,
    });
  } catch (error) {
    console.log(error);
    res.render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
});

router.get('/products', async (req, res) => {
  try {
    const { page, searchP } = req.query;

    const where = searchP
      ? {
          [Sequelize.Op.or]: [
            {
              name: {
                [Sequelize.Op.iLike]: `%${searchP}%`,
              },
            },
          ],
        }
      : {};

    const allProducts = await Product.findAll({ where });
    const limit = Math.ceil(allProducts.length / 12);

    const products = await Product.findAll({
      include: [Manufacturer],
      limit: 12,
      offset: +page ? (+page - 1) * 12 : 0,
      order: [['name', 'ASC']],
      where,
    });

    const basket = await BasketList.findAll({
      where: { userId: req.session.user.id },
    });

    res.render(Products, {
      products,
      page: page || 1,
      limit,
      searchP,
      all: allProducts,
      basket,
    });
  } catch (error) {
    console.log(error);
    res.render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
});

router.get('/products/:catId/:code', async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { productCode: req.params.code },
    });
    const userId = req.session.user?.id ?? 0;
    const basket = await BasketList.findOne({
      where: { userId, productId: product.id },
    });
    const likeProducts = await Product.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${product.name.split(' ')[0]}%`,
        },
        id: { [Sequelize.Op.not]: product.id },
      },
    });

    res.render(ProductPage, { product, basket, likeProducts });
  } catch (error) {
    console.log(error);
    res.render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
});

router.get('/auth/login', isLogin, (req, res) => {
  try {
    res.render(Login);
  } catch (error) {
    res.render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
});
router.get('/auth/reg', isLogin, (req, res) => {
  try {
    res.render(Reg);
  } catch (error) {
    res.render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
});

router.get('/admin', isMainAdmin, async (req, res) => {
  try {
    const { page, search } = req.query;
    const where = search
      ? {
          [Sequelize.Op.or]: [
            {
              name: {
                [Sequelize.Op.iLike]: `%${search}%`,
              },
            },
            {
              email: {
                [Sequelize.Op.iLike]: `%${search}%`,
              },
            },
          ],
        }
      : {};
    const allUser = await User.findAll({ where });
    const limit = Math.ceil(allUser.length / 10);
    const allUsers = await User.findAll({
      limit: 10,
      offset: +page ? (+page - 1) * 10 : 0,
      order: [['name', 'ASC']],
      where,
    });
    res.render(AdminPage, {
      allUsers,
      page: page || 1,
      limit,
      search,
      all: allUser,
    });
  } catch (error) {
    console.error(error);
    res.render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
});

router.get('/admin/products', isAdmin, async (req, res) => {
  try {
    const { page, search } = req.query;
    const where = search
      ? {
          [Sequelize.Op.or]: [
            {
              name: {
                [Sequelize.Op.iLike]: `%${search}%`,
              },
            },
            {
              productCode: {
                [Sequelize.Op.iLike]: `%${search}%`,
              },
            },
          ],
        }
      : {};
    const products = await Product.findAll({ where });
    const limit = Math.ceil(products.length / 10);
    const allProducts = await Product.findAll({
      limit: 10,
      offset: +page ? (+page - 1) * 10 : 0,
      order: [['name', 'ASC']],
      include: [{ model: Manufacturer }],
      where,
    });
    res.render(AdminProducts, {
      allProducts,
      page: page || 1,
      limit,
      search,
      all: products,
    });
  } catch (error) {
    console.log(error);
    res.render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
});

router.get('/admin/categories', isAdmin, async (req, res) => {
  try {
    const { page, search } = req.query;
    const where = search
      ? {
          name: {
            [Sequelize.Op.iLike]: `%${search}%`,
          },
        }
      : {};
    const categories = await Category.findAll({ where });
    const limit = Math.ceil(categories.length / 10);
    const allCategories = await Category.findAll({
      limit: 10,
      offset: +page ? (+page - 1) * 10 : 0,
      order: [['name', 'ASC']],
      where,
    });
    res.render(AdminCategories, {
      allCategories,
      page: page || 1,
      limit,
      search,
      all: categories,
    });
  } catch (error) {
    res.render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
});

router.get('/admin/orders', isAdmin, async (req, res) => {
  try {
    const { page, search } = req.query;

    const orders = await Order.findAll();
    const limit = Math.ceil(orders.length / 10);
    const allOrders = await Order.findAll({
      limit: 10,
      offset: +page ? (+page - 1) * 10 : 0,
      order: [['id', 'DESC']],
    });
    res.render(AdminOrders, {
      allOrders,
      page: page || 1,
      limit,
      search,
      all: orders,
    });
  } catch (error) {
    console.log(error);
    res.render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
});
router.get('/admin/orders/:orderId', isAdmin, async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({
      where: {
        id: orderId,
      },
      include: [
        {
          model: OrderProduct,
          include: [
            {
              model: Product,
              include: [
                {
                  model: Manufacturer,
                },
              ],
            },
          ],
        },
      ],
    });
    res.render(AdminOrder, {
      order,
    });
  } catch (error) {
    console.error(error);
    res.render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
});

router.get('/categories/new', isAdmin, async (req, res) => {
  try {
    const allCategories = await Category.findAll();
    res.render(AddCategories, { allCategories });
  } catch (error) {
    res.render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
});

router.get('/product/new', isAdmin, async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      where: {
        parentCategoryId: {
          [Sequelize.Op.not]: null,
        },
      },
    });
    res.render(AddProduct, { allCategories });
  } catch (error) {
    console.log(error);
    res.render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
});

router.get('/product/:id/edit', isAdmin, async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id },
      include: [{ model: Manufacturer }],
    });
    res.render(EditProduct, { product });
  } catch (error) {
    console.log(error);
    res.render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
});

router.get('/category/:id/edit', isAdmin, async (req, res) => {
  try {
    const category = await Category.findOne({ where: { id: req.params.id } });
    res.render(EditCategory, { category });
  } catch (error) {
    res.render(Error, {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
});

module.exports = router;
