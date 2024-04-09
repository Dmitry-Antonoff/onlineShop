const router = require('express').Router();
const path = require('path');
const multer = require('multer');
// const fs = require('fs');
const { Category } = require('../../db/models');

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
  const { parentCatgoryName, name } = req.body;
  try {
    const photoPath = req.file ? `/photos/${req.file?.filename}` : null;
    const parentCategory = await Category.findOne({ where: { name: parentCatgoryName } });
    await Category.create({
      name,
      parentCategoryId: parentCategory?.id,
      photoPath,
    });
    res.sendStatus(200);
    // }
  } catch (error) {
    console.error(error);
    res.json({ message: 'Something went wrong...', error: { error } }, 500);
  }
});

module.exports = router;
