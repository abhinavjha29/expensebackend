const Express = require('express') ;
const bodyparser = require('body-parser') ;
const cors = require('cors') 
const mongoose = require('mongoose') ;
//require('dotenv').config() ;
const sequelize = require('./util/table') ;
const compression = require('compression') ;
const expenseroute = require('./router/expenseroute')
const userroute = require('./router/userroute') ;
//const orderroute = require('./router/premiumroute') ;
//const premiumfeature = require('./router/premfeatureroute') ;
//const forgotpass = require('./router/forgotpass') ;

const dotenv = require('dotenv');
const path = require('path');



dotenv.config();

const app = Express() ;
app.use(bodyparser.json()) ;
app.use(cors({
    origin : '*'
})) ;


app.use(compression()) ;
app.use('/expense' , expenseroute) ;
app.use('/user' , userroute) ;
// app.use('/premium' ,orderroute ) ;
// app.use('/premfeature' , premiumfeature) ;
// app.use('/password' , forgotpass) ;
app.use((req , res)=>{
    res.sendFile(path.join(__dirname , `frontend/${req.url}`)) ;
})

// (
//     async ()=>{
//         try {
//          await sequelize.sync() 
//          app.listen(3800 , ()=>{
//             console.log("listening to port 3800")
//          }) 
//         }
//         catch(err) {
        
//             console.log(err) ;
//         }
//     }  
// )
// () 
let dburl =process.env.DBURL ;

mongoose.connect(dburl).then(result=>{
  app.listen(3800);
  console.log("connected") ;
}).catch(err=>{
  console.log(err) ;
})

