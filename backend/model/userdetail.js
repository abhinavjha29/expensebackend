const sequelize = require('../util/table') ;
const Sequelize = require('sequelize') ;

const User = sequelize.define('User', {
    id : {
        type : Sequelize.INTEGER ,
        autoIncrement : true ,
        allowNull : false ,
        primaryKey : true 
    } ,
    name :Sequelize.STRING 
    ,
    email : {
        type : Sequelize.STRING ,
        allowNull : false , 
        unique : {
            msg : 'Email already exist'
        } ,
        validate : {
          isEmail : {
            msg : "Put correct Username"
          }
        }
    } ,
    password : {
type : Sequelize.STRING ,
allowNull : false ,
validate: {
    notNull: {
      msg: 'Please enter your password'
    }
  }
    } ,
    ispremium : Sequelize.BOOLEAN
,
total_exp : {
  type : Sequelize.INTEGER ,
  defaultValue : 0 ,
}
} 
, {
  tableName : "user_detail"
})

module.exports = User ;