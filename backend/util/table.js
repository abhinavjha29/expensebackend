const Sequelize = require('sequelize') ;
require('dotenv').config() ;
const password =process.env.DATABASE_PASSWORD
const username = process.env.DB_USERNAME ;
const host = process.env.DB_HOST ;

const sequelize = new Sequelize('user' , username , password , {
    dialect: 'mysql' ,
    host: host
}) ;
module.exports = sequelize ; 
