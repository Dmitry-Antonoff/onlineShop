const router = require('express').Router();
const path = require('path');
const multer = require('multer');
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
  const { parentproductName, name, code, manufacturer, price, inStock } = req.body;
  console.log(parentproductName);
  try {
    let manufactur = await Manufacturer.findOne({ where: { name: manufacturer } });
    if (!manufactur) {
      manufactur = await Manufacturer.create({ name: manufacturer });
    }
    const category = await Category.findOne({ where: { name: parentproductName } });
    await Product.create({
      categoryId: category.id,
      name,
      productCode: code,
      manufacturerId: manufactur.id,
      price,
      quantityInStock: inStock,
      imgPath: `/photos/${req.file?.filename}`,
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
