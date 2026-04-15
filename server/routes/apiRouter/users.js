const Router = require('express')
const router = new Router
const usersController = require('../../controllers/UsersController')
const AuthUserMiddleware = require('../../middleware/AuthUserMiddleware')

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../files/users_avatar'))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 3 * 1024 * 1024 }
})

const uploadAvatar = upload.fields([
    { name: 'avatar', maxCount: 1 },
]);

router.post('/registration', usersController.registration)

router.post('/login', usersController.login)

router.get('/auth', AuthUserMiddleware, usersController.check)

router.post('/update-avatar', AuthUserMiddleware, uploadAvatar, (err, req, res, next) => {
    if (err) {
      console.error('Error for loading avatar:', err);
      return res.status(400).json({ error: err.message });
    }
    next();
  }, usersController.updateAvatar)


module.exports = router