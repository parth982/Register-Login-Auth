
const logout = (req,res)=>{
    res.clearCookie('UserLogin_Cookie_Token');
    res.redirect('/');
}

module.exports = logout;