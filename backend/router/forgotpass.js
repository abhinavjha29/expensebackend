const express = require('express') ;
const user = require('../controller/forgotpass') ;
const auth = require('../middleware/authenticate');
router = express.Router() ;

router.post('/forgotpassword' , user.getmail) ;
router.get('/updatepassword/:resetpasswordid', user.updatepassword)

router.get('/resetpassword/:id', user.resetpassword)

module.exports = router ;