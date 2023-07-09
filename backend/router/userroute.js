const express = require('express') ;
const user = require('../controller/usercontroller') ;
router = express.Router() ;



router.post('/save' ,user.savedata ) ;
// router.get('/getdata' , user.GetData ) ;
router.post('/login' , user.postLoginData) ;

module.exports = router ;