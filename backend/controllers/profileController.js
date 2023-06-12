const Profile = require("../models/profileModel");


const getProfile =  async( req,res) => {

    const profile = await Profile.findOne({user : req.user._id});
    return res.status(200).json({profile});

}

const setProfile = async ( req,res) => {
    const {phone} = req.body;
    const profile = await Profile.create({...req.body , phone});
    req.status(200).json({profile})
}


module.exports = {
    getProfile,
    setProfile
}
