const Router = require('express')
const router = new Router
const usersController = require('../../controllers/UsersController')
const AuthUserMiddleware = require('../../middleware/AuthUserMiddleware')

router.post('/registration', usersController.registration)

router.get('/auth', AuthUserMiddleware, usersController.check)


module.exports = router