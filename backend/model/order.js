const Sequlize = require('sequelize') ;
const sequlize = require('../util/table') ;

const Order = sequlize.define('order' , {
    id : {
        type : Sequelize.INTEGER ,
        autoIncrement : true ,
        allowNull : false ,
        primaryKey : true 
    } ,
    paymentid : Sequlize.STRING ,
    orderid : Sequlize.STRING ,
    status : Sequlize.STRING
} ,
{
    tableName : 'razorpayorder'
}) ;
module.exports = Order ;