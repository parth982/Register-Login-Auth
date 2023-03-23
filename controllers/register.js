const DB = require('../Database/db-config');
const bcrypt = require('bcryptjs');

const register = async (req,res)=>{
    const {email, password: Norm_Pswrd} = req.body;
    if(!email || !Norm_Pswrd){
        return res.json({status:'error_R', error:'Please Enter Both Email & Password'});
    }else{
        DB.query('SELECT email FROM users WHERE email=?',[email],
        async (err1,result1)=>{
            if(err1){throw err1;}
            if(result1.length==1){res.json({status:'error_R', error:'Email Has Already Been Registered'});}
            else{
                const hash_Pswrd = await bcrypt.hash(Norm_Pswrd,9);
                DB.query('INSERT INTO users SET ?',{email: email, password:hash_Pswrd},
                (err2,result2)=>{
                    if(err2){throw err2;}
                    return res.json({status:'Success_R', success:'User Has Been Registered!!!'});
                });
            }
        });
    }
};

module.exports = register;