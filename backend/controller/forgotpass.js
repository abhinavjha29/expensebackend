
 const User = require('../model/userdetail') ;
 const sequelize = require('../util/table')

const getmail = async (req , res , next)=>{
    try {
        console.log(req.body) ;
const email = req.body.email ;
console.log(email+"mail is ") ;
const user = await User.findOne({where : {email : email}}) ;
const Sib = require('sib-api-v3-sdk') ;
console.log(user.email) ;
 require('dotenv').config() ;
 console.log("key is " +process.env.SMTP_KEY_ID) ;
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
console.log(JSON.stringify(apiKey)+'  THIS IS CONF') ;
apiKey.apiKey =   process.env.SMTP_KEY_ID ;

const tranEmailApi = new Sib.TransactionalEmailsApi()
const sender = {
email: 'abhi3.sneha@gmail.com'
}
const receivers = [
{
email: user.email
}
]
await tranEmailApi.sendTransacEmail({
sender,
to: receivers,
subject: 'forgot password',
textContent: 'hello' 

}).then(res=>{console.log('succes')})
.catch(err=>{
    console.log(err)
})


    }
    catch(err) {
        console.log(err) ;
     return res.status(401).json({messege : "user not found"}) ;
    }
}
 
const forgotpasswordmail = async (req , res , next)=>{
    try {
        const client = Sib.ApiClient.instance
        const apiKey = client.authentications['api-key']
        console.log(JSON.stringify(apiKey)+'  THIS IS CONF') ;
        apiKey.apiKey = process.env.SMTP_KEY_ID
        
        const tranEmailApi = new Sib.TransactionalEmailsApi()
        const sender = {
        email: 'abhi3.sneha@gmail.com'
        }
        const receivers = [
        {
        email: 'abhinav_29@outlook.com'
        }
        ]
        tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: 'forgot password',
        textContent: 'hello' 
        
        })
    }
    catch(err) {
        console.log(err) ;
        res.status(500) ;
    }
}
 
module.exports = {
forgotpasswordmail ,
getmail
}
