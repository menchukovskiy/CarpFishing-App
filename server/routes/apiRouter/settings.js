const Router = require('express')
const router = new Router()
const AuthUserMiddleware = require('../../middleware/AuthUserMiddleware')
const settingsController = require('../../controllers/SettingsController')

router.get('/user-info', AuthUserMiddleware, settingsController.getUserInfo)

router.put('/user-info', AuthUserMiddleware, settingsController.updateUserInfo)

module.exports = router