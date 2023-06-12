const {validateCategory , Category} = require('../models/categoryModel');



const createCategory = async (req,res) => {

    const {name} = req.body;
    const {error} = validateCategory({name});
    if(error) {
        return res.status(400).json({
            error : error.details[0].message
        })
    }

    const newCategory = new Category({name});
    const data = await newCategory.save();

    if(data) {
        return res.status(200).json({
            message : "Category created successfully !!",
            Category : data
        })
    }

}

const getCategory = async (req,res) => {

    const category = await Category.find({}).sort({name :1});
    if(category) {
        res.status(200).json({
            category : category 
        })
    }

}

module.exports = {
    createCategory, getCategory
}