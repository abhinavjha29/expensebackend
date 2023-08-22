const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;
const UserSchema = new Schema({
  name : String ,
  email : {
    type : String ,
    required : true ,
    unique : true
  } ,
  password : {
    type : String ,
    required : true 
  },
  ispremium : Boolean ,
  total_exp: {
    type: Number,
    default: 0 
}
})



module.exports =  mongoose.model('User' , UserSchema) ;