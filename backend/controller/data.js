const User = require('../model/database') ;

exports.savedata = async (req , res , next)=>{
    try {
        const name = req.body.name ;
        const email = req.body.email ;
        const password = req.body.password ;
       const data =  await User.create({
            name ,
            email ,
            password
        })
        res.status(201).json({detail:data}) ;
    }
    catch(err)  {
        console.log(err) ;
        res.status(500) ;
    }
}
   
        
