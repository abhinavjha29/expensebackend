const express = require('express') ;
const user = require('../controller/forgotpass') ;
const auth = require('../middleware/authenticate');
router = express.Router() ;

router.post('/forgotpassword' , user.getmail) ;

module.exports = router ;