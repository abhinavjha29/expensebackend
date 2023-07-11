const Expense = require('../model/expensemodel') ;
const User = require('../model/userdetail') ;
const sequelize = require('../util/table') ;

exports.postData = async (req , res , next)=>{
    try {
        const t = await sequelize.transaction() ;
        const category = req.body.category ;
        const price = req.body.price ;
        const description = req.body.description ;
        const userId = req.user.id ;
    
       
        const data = await Expense.create({
            category : category ,
            description : description ,
            price : price ,
            userId : userId
           
        } , {transaction : t})
        const total_exp = Number(req.user.total_exp) + Number(price) ;
        await User.update({
            total_exp : total_exp  }
            , {
                where : {id : req.user.id}  ,
                transaction : t
            }
            ) 
            await t.commit() ;
      return  res.status(201).json({newdata : data})
        
    }
catch(error) {
    await t.rollback() ;
    console.log(error) ;
}
}

exports.getData = async (req , res , next)=>{
    try { const users = await Expense.findAll({where : {userId : req.user.id}}) ;
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
const resp = await Expense.findAll({where : {userId : req.user.id}}) 

if(resp) 
{

    const result = await Expense.findByPk(data_id) ;
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