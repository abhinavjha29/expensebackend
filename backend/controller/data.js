const User = require('../model/database') ;
const bcrypt = require('bcrypt') ;

exports.savedata = async (req , res , next)=>{
    try {
        const name = req.body.name ;
        const email = req.body.email ;
        const password = req.body.password ;
        const salt = 10 ;
        bcrypt.hash(password , salt , async (err , hash)=>{
            const data =  await User.create({
                 name ,
                 email ,
                 password
             })
             res.status(201).json({detail:data}) ;

        })

    }
    catch(err)  {
        console.log(err) ;
        res.status(500) ;
    }
}

exports.GetData = async (req , res, next)=>{
    try {
        const users = await User.findAll() 
        res.status(200).json({getdata : users}) ;
    }
    catch(err) {
        console.log(err) ;
    }
}
   
exports.postLoginData = async (req , res , next) =>{
    try {
       const {email , password} = req.body ;
     console.log("ans is " +email) ;
    
    const reqdata = await User.findAll({where : {email}}) ;
    if ( !reqdata) {
         res.status(404).json({error : "user not found"})
    }
    if(reqdata.length>0) {
        if(await reqdata[0].password !== password) {
            res.status(400).json({error : "incorrect password"}) ;
   
       }
       res.status(201).json({messege : "user logged succesfully"})
       }
    }
    
    catch(err) {
        console.log(err) ;
    }
    
}
        
