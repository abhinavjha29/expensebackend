const Express = require('express') ;
const auth = require('../middleware/authenticate') ;
const premfeature = require('../controller/premfeaturescontroller') ;
router = Express.Router() ;

router.get('/leaderboard',auth.authenticate ,premfeature.leaderboard ) ;

module.exports = router ;