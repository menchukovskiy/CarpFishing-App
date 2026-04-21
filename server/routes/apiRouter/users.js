const Router = require('express')
const router = new Router
const usersController = require('../../controllers/UsersController')
const AuthUserMiddleware = require('../../middleware/AuthUserMiddleware')
const { createUploadMiddleware } = require("../../middleware/createUploadMiddleware");
const multerErrorHandler = require("../../error/multerErrorHandler");
const path = require('path')

const uploadAvatar = createUploadMiddleware({
  destination: path.resolve(__dirname, "../../files/users_avatar"),
  fields: [{ name: "avatar", maxCount: 1 }],
  maxFileSizeMb: 3,
});

router.post('/registration', usersController.registration)

router.post('/login', usersController.login)

router.get('/auth', AuthUserMiddleware, usersController.check)

router.post('/update-avatar', AuthUserMiddleware, uploadAvatar, multerErrorHandler, usersController.updateAvatar)

router.delete('/remove-avatar', AuthUserMiddleware, usersController.removeAvatar)

router.put('/update-email-password', AuthUserMiddleware, usersController.updateEmailAndPassword)


module.exports = router