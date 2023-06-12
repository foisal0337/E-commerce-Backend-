const adminauth = (req,res,next) =>{
    if(req.user.role !='admin') {
        return res.status(400).json({
            error : "Forbidden !"
        })
    }
    next();
}

module.exports = adminauth;