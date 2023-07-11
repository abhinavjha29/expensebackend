const User = require('../model/userdetail') ;
const bcrypt = require('bcrypt') ;
const jwt = require('jsonwebtoken') ;

function generateaccesstoken(id) {
    return jwt.sign({ userId : id} , 'Secretpassword12131')
}
// exports.getlogindata = async(req , res , next)=>{
//     return res.status(200).json({ token: generateaccesstoken(reqdata[0].id)})
//}

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
                 password : hash
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
    //console.log(reqdata) ;
    if ( reqdata.length==0) {
        return res.status(404).json({ success : false, messege : "user not found"})
    }
    if(reqdata.length>0) {
       bcrypt.compare( password , reqdata[0].password , (err , result)=>{
            console.log(password +"main") ;
            console.log(reqdata[0].password) ;
            if(err) {
                console.log(err) ;
                return res.status(500).json({messege : "something went wrong"})
            }
            if(result=== false)
            {
                console.log(result) ;
 
              return res.status(401).json({success :false, messege : "incorrect password"})
            }
                   else { 
                    console.log("true") ;
        return res.status(200).json({success : true , messege : "user logged succesfully" , token: generateaccesstoken(reqdata[0].id)})
       }
        })

       
       }
    }
    
    catch(err) {
        console.log(err) ;
    }
    
}
        
