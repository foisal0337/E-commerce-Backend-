const { Product, validateProduct } = require('../models/productModel');
const { Category } = require('../models/categoryModel');

const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Set the destination folder for storing images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext); // Set the filename for the uploaded image
  },
});
// Filter to accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed.'), false);
  }
};
// Initialize multer upload
const upload = multer({ storage, fileFilter });




const createProduct = async (req, res) => {
  try {
    upload.single('photo')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { name, description, price, category, quantity } = req.body;

      // Validate product data
      const { error } = validateProduct({
        name,
        description,
        price,
        category,
        quantity,
        photo: req.file.filename, // Save the filename as photo
      });

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Check if the category exists
      const existingCategory = await Category.findById(category);

      console.log(data);
      if (!existingCategory) {
        return res.status(400).json({ error: 'Invalid category.' });
      }

      const newProduct = new Product({
        name,
        description,
        price,
        category,
        quantity,
        photo: req.file.filename, // Save the filename as photo
      });

      const savedProduct = await newProduct.save();

      return res.status(201).json({
        message: 'Product created successfully',
        product: savedProduct,
      });
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const id  = req.params.id;
    console.log(id);
    const product = await Product.findById(id).populate('category');
   console.log(product);

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    return res.status(200).json({
      message: "Successfully fetched...",
      data: product
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProductById = async (req, res) => {
  try {
    upload.single('photo')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }

      const productId = req.params.id;
      const { name, description, price, category, quantity } = req.body;

      // Validate product data
      const { error } = validateProduct({
        name,
        description,
        price,
        category,
        quantity,
      });

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Check if the product exists
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found.' });
      }

      // Update the product fields
      existingProduct.name = name || existingProduct.name;
      existingProduct.description = description || existingProduct.description;
      existingProduct.price = price || existingProduct.price;
      existingProduct.category = category || existingProduct.category;
      existingProduct.quantity = quantity || existingProduct.quantity;

      // If an image is uploaded, update the photo field
      if (req.file) {
        existingProduct.photo = req.file.filename;
      }

      const updatedProduct = await existingProduct.save();

      return res.status(200).json({
        message: 'Product updated successfully',
        product: updatedProduct,
      });
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getProducts = async (req,res) =>{

  try { 

      const {name,sort,select} = req.query;
    
      
      // queary with name company featured price 
      let quearyObj = {};

      if(name) {
          quearyObj.name = { $regex : name , $options : 'i'}
      }

      let data =  Product.find(quearyObj);
      
      // sortting operation 
      if(sort){
          const sortlist = sort.replace(',', " ");
          data = data.sort(sortlist);     
      }

      // select operation 
      if(select){
          const selectList = select.replace(','," ");
          data = data.select(selectList);
      }
      
      // Pagination operation 
      let page = Number(req.query.page) || 1;
      let limit = Number(req.query.limit) || 5;
      let skip = (page-1) * limit;


      const dataRes = await data;

      if(dataRes) {
          res.status(201).json({product : dataRes})
      } else {
          res.status(401).json({error : "Somthing went wrong"})
      }



      } catch (error) {
          res.status(401).json({error : "can not fetch all products"})
      }
}


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProductById
}

