const Express = require('express') ;
const order = require('../controller/premium') ;
const auth = require('../middleware/authenticate') ;

router = Express.Router() ;



router.get('/premiummembership' , auth.authenticate ,order.purchasepremium ) ;
 
router.post('/updatestatus' , auth.authenticate , order.updatestatus) ;

module.exports = router ;