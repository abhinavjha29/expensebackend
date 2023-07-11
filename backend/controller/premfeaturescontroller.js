const Expense = require('../model/expensemodel') 
const User = require('../model/userdetail') ;
const sequelize = require('sequelize') ;
exports.leaderboard  = async (req , res , next)=>{
    try {
        
        // const expdetail = await Expense.findAll({
        //     attributes : ['userId' , [sequelize.fn('sum' , sequelize.col(Expense.price)), 'total_exp']] ,
        //     group : ['userId']
        // }) ;
        // const users =  await User.findAll({
        //     attributes : ['id' , 'name' , [sequelize.fn('sum' , sequelize.col('price')), 'total_exp']] ,
        //     include : [ {
        //         model : Expense ,
        //         attributes : [] 
        //     }],
        //     group : ['id'] ,
        //     order : [['total_exp' , 'DESC']]
        // }) ;
const users = await User.findAll({
    order : [['total_exp' , 'DESC']]
})
        
       

        // expdetail.forEach((expense)=>{
        //     if(sum[expense.userId]) {
        //         sum[expense.userId] = sum[expense.userId]+ expense.price ;
        
        //     }
        //     else {
        //         sum[expense.userId] = expense.price ;
        //     }
        // })     
           
        return res.status(200).json({user_det : users}) ;
    }
catch(err) {
    console.log(err) ;
    res.status(500).json({messege : 'something went wrong '})
}

}