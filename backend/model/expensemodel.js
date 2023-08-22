const  Sequelize  = require('sequelize') ;
const sequelize = require('../util/table') ;

const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;

const expenseSchema = new Schema({
    category : {
        type : String ,
        required : true ,
    } ,
    description : {
        type : String ,
        required : true 
    },
    price : {
        type : Number ,
        required : true
    } ,
    userId : {
        type : Schema.Types.ObjectId ,
        required : true ,
        //ref : User
    }
})




module.exports = mongoose.model('Expense' , expenseSchema)
