const Router = require('express')
const router = new Router()
const AuthUserMiddleware = require('../../middleware/AuthUserMiddleware')
const settingsController = require('../../controllers/SettingsController')

router.get('/user-info', AuthUserMiddleware, settingsController.getUserInfo)

router.put('/user-info', AuthUserMiddleware, settingsController.updateUserInfo)

router.get('/user-securities', AuthUserMiddleware, settingsController.getUserSecurities)

router.put('/user-securities', AuthUserMiddleware, settingsController.updateUserSecurities)

module.exports = router