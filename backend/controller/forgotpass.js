
 const User = require('../model/userdetail') ;
 const sequelize = require('../util/table') ;
 const Sib = require('@getbrevo/brevo') ;
 const uuid = require('uuid') ;
 const bcrypt = require('bcrypt');
 const Forgotpassword = require('../model/forgotpasswordmodel') ;
 require('dotenv').config() ;

const getmail = async (req , res , next)=>{
    try {
        console.log(req.body) ;
const email = req.body.email ;
console.log(email+"mail is ") ;
const user = await User.findOne({where : {email : email}}) ;
if(!user) {
    return res.status(404).json({message : "user not found/email not correct"})
}
if(user) {
    const id = uuid.v4() ;
   await user.createForgotpassword({ id , active: true })
    .catch(err => {
 console.log(err)
 throw new Error(err);
})
    
console.log(user.email) ;
 
console.log("key is " +process.env.SMTP_KEY_ID) ;
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
console.log(JSON.stringify(apiKey)+'  THIS IS CONF') ;
apiKey.apiKey =process.env.SMTP_KEY_ID ;
const forgotPasswordLink  = `http://localhost:3800/password/resetpassword/${id}`;

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
htmlContent: `<p> <a href="${forgotPasswordLink}">here</a> to reset your password.</p>`,

}).then((response)=>{console.log('succes')
return res.status(200).json({message: 'Link to reset password sent to your mail ', sucess: true})})
.catch(err=>{
   console.log(err)
   throw new Error(err);
})



}

    }
    catch(err) {
        console.log(err) ;
     return res.status(401).json({messege : "user not found"}) ;
    }
}

const resetpassword = (req, res) => {
    const id =  req.params.id;
    Forgotpassword.findOne({ where : { id }}).then(forgotpasswordrequest => {
        if(forgotpasswordrequest){
            forgotpasswordrequest.update({ active: false});
            res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>

                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
            res.end()

        }
    })
}

 
const updatepassword = async (req, res) => {
    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        const resetpasswordrequest = await Forgotpassword.findOne({ where: { id: resetpasswordid } });
        if (resetpasswordrequest) {
            const user = await User.findOne({ where: { id: resetpasswordrequest.UserId } });
            if (user) {
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const hash = await bcrypt.hash(newpassword, salt);
                await user.update({ password: hash });
                return res.status(201).json({ message: 'Successfully updated the new password' });
            } else {
                return res.status(404).json({ error: 'No user exists', success: false });
            }
        }
    } catch (error) {
        console.log(error) ;
        return res.status(403).json({ error, success: false });
    }
};

 
module.exports = {
resetpassword ,
getmail ,
updatepassword
}
