var jwt = require('jsonwebtoken');
const JWT_SECRET = "QWERTYUIOPASDFGHJKLZXCVBNM"
const fetchUser = (req, res, next)=>{
    //Get the user from jwt token and add id to req
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"authenticate valid token"})
    }
    
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        
        next();
    } catch (error) {
        res.status(401).send({error:"authenticated valid token"})
    }
    
}

module.exports = fetchUser