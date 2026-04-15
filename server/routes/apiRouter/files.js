const Router = require('express')
const router = new Router
const AuthUserMiddleware = require('../../middleware/AuthUserMiddleware')
const fileController = require('../../controllers/FileController')

router.get('/:folder/:filename',AuthUserMiddleware, fileController.getFile) 

module.exports = router