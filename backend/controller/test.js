const Sib = require('@getbrevo/brevo') ;
 require('dotenv').config() ;
 console.log("key is " +process.env.SMTP_KEY_ID) ;
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
console.log(JSON.stringify(apiKey)+'  THIS IS CONF') ;
apiKey.apiKey = process.env.SMTP_KEY_ID ;

const tranEmailApi = new Sib.TransactionalEmailsApi()
const sender = {
email: 'abhi3.sneha@gmail.com'
}
const receivers = [
{
email: "abhinav_29@outlook.com"
}
]
tranEmailApi.sendTransacEmail({
sender,
to: receivers,
subject: 'forgot password',
textContent: 'hello' 

}).then(res=>{console.log('succes')})
.catch(err=>{
    console.log(err)
})
