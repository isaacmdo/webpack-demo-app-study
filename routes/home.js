const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const multer = require('multer');
const multerConfig = multer();

router.route('/', home.index)
      .get(home.index)
      .post(multerConfig.single("file"), home.autorizacao)

module.exports = router;
