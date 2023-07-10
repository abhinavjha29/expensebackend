const jwt = require('jsonwebtoken') ;
const User = require('../model/userdetail') ;

const authenticate = async (req , res , next)=>{
    try {
const token = await req.header('Authorization') ; 
const user = jwt.verify(token , 'Secretpassword12131') ;
console.log("userid>>>>"+user.userId )
const response =  await User.findByPk(user.userId) ;

req.user = response ;
console.log("hey"+req.user) ;
next() ;
    }
    catch(err) {
        console.log(err) ;
        return res.status(404).json({err : "user not found"})
    }
}

module.exports = { authenticate }  ;