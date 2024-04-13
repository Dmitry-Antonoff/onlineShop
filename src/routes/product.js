const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const { Sequelize } = require('sequelize');
const { Product, Manufacturer, Category } = require('../../db/models');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'public/photos'));
  },
  filename(req, file, cb) {
    const photoName = req.body.name.replace(/\s/g, '-');
    const filename = photoName + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('img'), async (req, res) => {
  const { parentproductName, name, code, manufacturer, price, inStock, description, keyValues } =
    req.body;
  try {
    let manufactur = await Manufacturer.findOne({ where: { name: manufacturer } });
    if (!manufactur) {
      manufactur = await Manufacturer.create({ name: manufacturer });
    }
    const existingProduct = await Product.findOne({
      where: {
        [Sequelize.Op.or]: [{ name }, { productCode: code }],
      },
    });

    if (existingProduct) {
      return res.status(400).json({ error: 'DuplicateNameOrCode' });
    }

    if (!name || !code || !manufacturer || !price || !inStock) {
      return res.status(400).json({ error: 'IncompleteFields' });
    }
    const category = await Category.findOne({ where: { name: parentproductName } });
    await Product.create({
      categoryId: category.id,
      name,
      productCode: code,
      manufacturerId: manufactur.id,
      price,
      quantityInStock: inStock,
      description,
      imgPath: `/photos/${req.file?.filename}`,
      characteristics: JSON.parse(keyValues),
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
    console.log(error);
  }
});

module.exports = router;
