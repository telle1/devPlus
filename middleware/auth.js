const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
    //Get token from header
    const token = req.header('x-auth-token');
    //Check if no token 
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied.'});
    }
    //Very token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch(err){
        res.status(401).json({msg:'Token is not valid'})
        console.log('Error:', err.message)
    }
}
//next is a callback we have to run to move to the next piece of middleware