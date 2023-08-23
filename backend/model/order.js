// const Sequelize = require('sequelize') ;
// const sequelize = require('../util/table') ;

// const Order = sequelize.define('order' , {
//     id : {
//         type : Sequelize.INTEGER ,
//         autoIncrement : true ,
//         allowNull : false ,
//         primaryKey : true 
//     } ,
//     paymentid : Sequelize.STRING ,
//     orderid : Sequelize.STRING ,
//     status : Sequelize.STRING
// } ,
// {
//     tableName : 'razorpayorder'
// }) ;
// module.exports = Order ;

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    paymentid: String,
    orderid: String,
    status: String
}, { collection: 'razorpayorder' });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
