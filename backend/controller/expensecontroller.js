const User = require('../model/expensemodel') ;

exports.postData = async (req , res , next)=>{
    try {
        const category = req.body.category ;
        const price = req.body.price ;
        const description = req.body.description ;
        const userId = req.user.id ;
        console.log("DONE"+userId) ;
       
        const data = await User.create({
            category : category ,
            description : description ,
            price : price ,
            userId : userId
           
        })
        res.status(201).json({newdata : data})
        
    }
catch(error) {
    console.log(error) ;
}
}

exports.getData = async (req , res , next)=>{
    try { const users = await User.findAll({where : {userId : req.user.id}}) ;
        console.log("users are"+users) ;
        res.status(200).json({details : users})
        
    }
    catch(err) {
        console.log(err) ;
        //alert("error showing data")
    }
}

exports.deletedata = async(req , res ,next)=>{
    try {
        
const data_id = req.params.id ;
console.log(req.user.id) ;
const resp = await User.findAll({where : {userId : req.user.id}}) 

if(resp) 
{

    const result = await User.findByPk(data_id) ;
    await result.destroy()
    return res.status(200).json({delete:result , messege : "expense deleted succesfylly"}) ;
}
else return res.status(404).json({
    messege: "user not found"
})
 
    }
    catch(err) {
        console.log(err) ;
    }
}