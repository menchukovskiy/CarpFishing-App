const Router = require('express')
const router = new Router
const usersRouter = require('./users')
const filesRouter = require('./files')

router.use('/users', usersRouter)
router.use('/files', filesRouter)

module.exports = router