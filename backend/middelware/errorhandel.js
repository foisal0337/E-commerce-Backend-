const errorhandel = (err, req,res,next)=>{
    return res.status(500).json({
        "message" : "Somthing Failddddd "
    })
}

module.exports = errorhandel;