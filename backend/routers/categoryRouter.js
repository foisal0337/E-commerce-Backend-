const express = require("express");
const router = express.Router();

const adminauth = require("../middelware/admin");
const auth = require("../middelware/authorize");


const { createCategory , getCategory  } = require("../controllers/categoryController");

router.post('/' , auth, adminauth, createCategory );
router.get('/', getCategory);

module.exports = router;