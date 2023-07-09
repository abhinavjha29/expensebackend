const  Sequelize  = require('sequelize') ;
const sequelize = require('../util/table') ;

const User = sequelize.define('User' ,{
    id : {
        type: Sequelize.INTEGER ,
        allowNull : false ,
        autoIncrement : true ,
        primaryKey : true
        
    } ,
    category : {
type: Sequelize.STRING ,
allowNull : false     
} ,
description : {
    type : Sequelize.STRING ,
    allowNull : false
} ,
price : {
    type: Sequelize.DOUBLE ,
    allowNull : false
} ,
userId : {
    type : Sequelize.INTEGER
} 

} , {
tableName : 'Expense_Table'
}) ;

module.exports = User ;
