// const Sequelize = require('sequelize') ;
// const sequelize = require('../util/table') ; 

// const Forgotpassword = sequelize.define('forgotpassword' , {
//     id : {
//         type : Sequelize.UUID ,
//         allowNull: false,
//         primaryKey: true
//     } ,
//     active: Sequelize.BOOLEAN,
//     UserID : Sequelize.DOUBLE ,
//     expiresby: Sequelize.DATE
// } ,
// {
//     tableName : 'Forgotpassword'
// })

// module.exports = Forgotpassword;
const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    active: Boolean,
    UserID: Number,
    expiresby: Date
}, { collection: 'Forgotpassword' });

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema);

module.exports = ForgotPassword;
