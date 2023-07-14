const express = require('express') ;
const user = require('../controller/usercontroller') ;
const auth = require('../middleware/authenticate') ; 
router = express.Router() ;



router.post('/save' ,user.savedata ) ;
 router.get('/get' , auth.authenticate ,user.GetData ) ;
router.post('/login' , user.postLoginData) ;


module.exports = router ;