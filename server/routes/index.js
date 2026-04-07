const Router = require('express')
const router = new Router
const apiRouter = require('./apiRouter')

router.use('/v1', apiRouter )

module.exports = router  