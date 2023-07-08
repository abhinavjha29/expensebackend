const Express = require('express') ;
const bodyparser = require('body-parser') ;
const cors = require('cors') 
const sequelize = require('./util/table')
const User = require('./controller/data')
const app = Express() ;
app.use(bodyparser.json()) ;
app.use(cors({
    origin : '*'
})) ;

app.post('/save' , User.savedata ) ;
app.get('/getdata' , User.GetData ) ;
app.post('/login' , User.postLoginData) ;
//app.get('/login' , User.getlogindata) ;

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

