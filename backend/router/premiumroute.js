const Express = require('express') ;
const order = require('../controller/premium')
const auth = require('../middleware/authenticate') ;

router = Express.Router() ;

router.post('/premmembership' , auth.authenticate ,order.purchasepremium ) ;

module.exports = router ;