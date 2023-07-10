const Expense = require('../model/expensemodel') 
const User = require('../model/userdetail') ;
exports.leaderboard  = async (req , res , next)=>{
    try {
        
        const expdetail = await Expense.findAll() ;
        const users =  await User.findAll() ;
        
        const sum = {} ;
        expdetail.forEach((expense)=>{
            if(sum[expense.userId]) {
                sum[expense.userId] = sum[expense.userId]+ expense.price ;
        
            }
            else {
                sum[expense.userId] = expense.price ;
            }
        })     
            let leaderboarddetail = [] ;
            users.forEach((user)=>{
                leaderboarddetail.push({name : user.name , total_expense : sum[user.id]})
            }) 
        
        return res.status(200).json({user_det : leaderboarddetail}) ;
    }
catch(err) {
    console.log(err) ;
}

}