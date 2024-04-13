const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { Sequelize } = require('sequelize');
const { User, Product, Manufacturer, Category } = require('../../db/models');

router.post('/:id/add', async (req, res) => {
  try {
    const { id } = req.body;
    await User.update({ role: 'ADMIN' }, { where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.post('/:id/remove', async (req, res) => {
  try {
    const { id } = req.body;
    await User.update({ role: 'USER' }, { where: { id } });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.get('/:userName', async (req, res) => {
  const keyword = req.params.userName;
  const users = await User.findAll({
    where: {
      [Sequelize.Op.or]: [
        {
          name: {
            [Sequelize.Op.iLike]: `%${keyword}%`,
          },
        },
        {
          email: {
            [Sequelize.Op.iLike]: `%${keyword}%`,
          },
        },
      ],
    },
  });
  res.json(users);
});

router.get('/products/:productName', async (req, res) => {
  const keyword = req.params.productName;
  const products = await Product.findAll({
    where: {
      [Sequelize.Op.or]: [
        {
          name: {
            [Sequelize.Op.iLike]: `%${keyword}%`,
          },
        },
        {
          productCode: {
            [Sequelize.Op.iLike]: `%${keyword}%`,
          },
        },
      ],
    },
    include: [{ model: Manufacturer }],
  });
  res.json(products);
});

router.get('/categories/:categoryName', async (req, res) => {
  const keyword = req.params.categoryName;
  const categories = await Category.findAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: `%${keyword}%`,
      },
    },
  });
  res.json(categories);
});

router.put('/category/:id', async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    await Category.update({ name }, { where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'public/photos'));
  },
  filename(req, file, cb) {
    const photoName = req.body.name.replace(/\s/g, '-');
    console.log(photoName);
    const filename = photoName + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.put('/products/:id', upload.single('img'), async (req, res) => {
  try {
    const { name, code, manufacturer, price, inStock, description, keyValues } = req.body;
    let manufactur = await Manufacturer.findOne({ where: { name: manufacturer } });
    if (!manufactur) {
      manufactur = await Manufacturer.create({ name: manufacturer });
    }

    const product = await Product.findOne({ where: { id: req.params.id } });

    if (req.file && name !== product.name) {
      fs.unlinkSync(
        path.join(__dirname, '..', '..', 'public/photos', product.imgPath.split('/').pop()),
      );
      await Product.update(
        {
          name,
          productCode: code,
          manufacturerId: manufactur.id,
          price,
          quantityInStock: inStock,
          description,
          imgPath: `/photos/${req.file?.filename}`,
          characteristics: JSON.parse(keyValues),
        },
        { where: { id: req.params.id } },
      );
    } else if (!req.file && name !== product.name) {
      const oldImagePath = path.join(
        __dirname,
        '..',
        '..',
        'public/photos',
        product.imgPath.split('/').pop(),
      );
      const newImageName = req.body.name.replace(/\s/g, '-') + path.extname(product.imgPath);
      const newImagePath = path.join(__dirname, '..', '..', 'public/photos', newImageName);
      fs.renameSync(oldImagePath, newImagePath);

      await Product.update(
        {
          name,
          productCode: code,
          manufacturerId: manufactur.id,
          price,
          quantityInStock: inStock,
          description,
          imgPath: `/photos/${newImageName}`,
          characteristics: JSON.parse(keyValues),
        },
        { where: { id: req.params.id } },
      );
    } else {
      await Product.update(
        {
          name,
          productCode: code,
          manufacturerId: manufactur.id,
          price,
          quantityInStock: inStock,
          description,
          imgPath: `/photos/${req.file?.filename}`,
          characteristics: JSON.parse(keyValues),
        },
        { where: { id: req.params.id } },
      );
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    fs.unlinkSync(
      path.join(__dirname, '..', '..', 'public/photos', product.imgPath.split('/').pop()),
    );
    product.destroy();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.delete('/category/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.id },
      include: [{ model: Category, as: 'children' }],
    });

    category.children?.forEach((catChild) => {
      fs.unlinkSync(
        path.join(__dirname, '..', '..', 'public/photos', catChild.photoPath?.split('/').pop()),
      );
    });

    if (category.photoPath !== null) {
      fs.unlinkSync(
        path.join(__dirname, '..', '..', 'public/photos', category.photoPath?.split('/').pop()),
      );
    }

    category.destroy();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

module.exports = router;
