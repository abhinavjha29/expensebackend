const Sequelize = require('sequelize') ;
const sequelize = require('../util/table') ; 

const Forgotpassword = sequelize.define('forgotpassword' , {
    id : {
        type : Sequelize.UUID ,
        allowNull: false,
        primaryKey: true
    } ,
    active: Sequelize.BOOLEAN,
    UserID : Sequelize.DOUBLE ,
    expiresby: Sequelize.DATE
} ,
{
    tableName : 'Forgotpassword'
})

module.exports = Forgotpassword;
