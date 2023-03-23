const DB = require('../Database/db-config');
const jwt = require('jsonwebtoken');

const loggedIn = (req,res,next)=>{
    if(!req.cookies.UserLogin_Cookie_Token) return next();
    try{
        const decoded_token = jwt.verify(req.cookies.UserLogin_Cookie_Token, process.env.JWT_SECRET);
        DB.query('SELECT * FROM users WHERE id = ?',
        [decoded_token.id],
        (err,result)=>{
            if(err) {return next();}
            req.user = result[0];
            return next();
        });
    }catch(err){if(err) {return next();}}
}; 

module.exports = loggedIn;