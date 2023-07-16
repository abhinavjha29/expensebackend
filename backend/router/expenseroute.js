const Express = require('express') ;
const expense = require('../controller/expensecontroller')
const auth = require('../middleware/authenticate') ;

router = Express.Router() ;

router.post('/postexpense' , auth.authenticate, expense.postData) ;

router.get('/getexpense' , auth.authenticate ,expense.getData) ;

router.delete('/deleteexpense/:id', auth.authenticate , expense.deletedata) ; 
router.get('/download' , auth.authenticate , expense.postFile  ) ;
router.get('/gettotal' , auth.authenticate , expense.usertotaldata) ;

module.exports = router ;