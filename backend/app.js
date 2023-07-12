const Express = require('express') ;
const bodyparser = require('body-parser') ;
const cors = require('cors') 
//require('dotenv').config() ;
const sequelize = require('./util/table')

const expenseroute = require('./router/expenseroute')
const userroute = require('./router/userroute') ;
const orderroute = require('./router/premiumroute') ;
const premiumfeature = require('./router/premfeatureroute') ;
const forgotpass = require('./router/forgotpass') ;
const expmodel = require('./model/expensemodel') ;
const usermodel = require('./model/userdetail') ;
const ordermodel = require('./model/order') ;
const Forgotpassword = require('./model/forgotpasswordmodel') ;
const dotenv = require('dotenv');


dotenv.config();

const app = Express() ;
app.use(bodyparser.json()) ;
app.use(cors({
    origin : '*'
})) ;


app.use('/expense' , expenseroute) ;
app.use('/user' , userroute) ;
app.use('/premium' ,orderroute ) ;
app.use('/premfeature' , premiumfeature) ;
app.use('/password' , forgotpass) ;
usermodel.hasMany(expmodel) ;
expmodel.belongsTo(usermodel) ;
usermodel.hasMany(Forgotpassword);
Forgotpassword.belongsTo(usermodel);



usermodel.hasMany(ordermodel) ;
ordermodel.belongsTo(usermodel) ;

(
    async ()=>{
        try {
         await sequelize.sync() 
         app.listen(3800 , ()=>{
            console.log("listening to port 3800")
         }) 
        }
        catch(err) {
            await res.status(500) ;
            console.log(err) ;
        }
    }  
)
() 

