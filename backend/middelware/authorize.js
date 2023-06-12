const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  
    let token = req.headers.authorization;
  
    if (!token) {
        return res.status(400).json({ 
            error: "Unauthorized" 
        });
    }

    token = token.split(' ')[1].trim();
    console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    

    if(!decoded){
        return res.status(400).json({ 
            error: "Unauthorized token" 
        });
    }
    console.log(decoded);
    
    req.user = decoded;

    console.log(req.user._id , req.user.userEmail);
    next();

}

module.exports = auth;