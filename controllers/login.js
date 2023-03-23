const jwt = require('jsonwebtoken');
const DB = require('../Database/db-config');
const bcrypt = require('bcryptjs');

const login = async (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.json({status:'error_L', error:'Please Enter Both Email & Password'});
    }else{
        DB.query('SELECT * FROM users WHERE email = ?',[email],
        async (err3,result3)=>{
            if(err3){throw err3;}
            if(result3.length==0 || !await bcrypt.compare(password,result3[0].password)){
                return res.json({status:'error_L', error:'Incorrect Email OR Password'});
            }else{
                const jwt_Token = jwt.sign({id: result3[0].id}, process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_EXPIRES,
                });
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIES_EXPIRES * 24 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie('UserLogin_Cookie_Token', jwt_Token, cookieOptions);
                return res.json({status:'Success_L', success:'User Has Been Logged In'});
            }
        });
    }
};

module.exports = login;