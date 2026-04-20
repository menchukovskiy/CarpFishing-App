const Router = require('express')
const router = new Router
const usersRouter = require('./users')
const filesRouter = require('./files')
const settingsRouter = require('./settings')

router.use('/users', usersRouter)
router.use('/files', filesRouter)
router.use('/settings', settingsRouter)

module.exports = router