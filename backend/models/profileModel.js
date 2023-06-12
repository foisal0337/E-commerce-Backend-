const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({

    user : {
        type : Schema.Types.ObjectId,
        unique : true,
        required : true,
        ref : "User"
    },

    phone : {
        type : String,
        required : true,
    },

    address1 : {
        type : String
    },

    address2 : {
        type : String
    },

    city : {
        type : String
    },

    state : {
        type : String
    },

    postcode : {
        type : String 
    },

    country : {
        type : String 
    }



});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;