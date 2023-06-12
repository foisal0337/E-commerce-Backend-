const express = require("express");
const router = express.Router();

const { createProduct,
     getProducts,
     getProductById,
    updateProductById
} = require("../controllers/productController");

const adminauth = require("../middelware/admin");
const auth = require("../middelware/authorize");

router.post('/',auth, adminauth, createProduct);
router.get('/',getProducts);
router.put('/:id' , auth,adminauth, updateProductById);
router.get("/:id" ,auth , adminauth, getProductById);

module.exports = router;

// 1685185536376-289692191.png