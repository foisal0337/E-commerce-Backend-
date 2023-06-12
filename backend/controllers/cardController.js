const CardItem = require("../models/cardItemModel");

const createCardItem = async (req,res) => {
    const {price , product} = req.body;
    const checkProduct = await CardItem.findOne({
        user : req.user._id,
        product : product
    })

    if(checkProduct) {
        res.status(400).json({
            error : "Item is alredy exits in Card"
        })
    }
    const carditem = new CardItem({
        product : product,
        price : price,
        user : req.user._id
    })

    const result = await carditem.save();

    res.status(201).json({
        message : "Added to card successfully",
        data : result
    })

}

const getCardItem = async(req,res) =>{
    const carditem = await CardItem.find({
        user : req.user._id
    })
    .populate("product" , "name")
    .populate('user', 'name');

    return res.status(200).json(carditem);

}

const updateCardItem = async(req,res) =>{

    const {_id , count} = req.body;
    userId = req.user._id;
    await CardItem.updateOne({_id : _id, user : userId}, { count : count});
 
    return res.status(200).json({
        message : "Item updated successfully !!"
    })
}

const deleteCardItem = async(req,res) => {
    const _id = req.params.id;
    userId = req.user_id;
    await CardItem.deleteOne({_id : _id , user : userID});

    return res.status(200).json({
        message : "Item deteted successfully !! "
    })

}

module.exports = {
    createCardItem,
    getCardItem,
    updateCardItem,
    deleteCardItem
}