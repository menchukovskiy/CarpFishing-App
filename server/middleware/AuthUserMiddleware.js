const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
class AuthUserMiddleware {

    static async checkToken(req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }

        try {

            const token = req.headers.authorization.split(' ')[1]

            if (!token) {
                res.status(401).json({ message: 'Not authorized!' })
            }

            const decode = jwt.verify(token, process.env.TOKEN_KEY)

            const user = await User.findByPk(decode.id)

            if (!user) {
                return res.status(401).json({ message: 'User not found!' })

            }
            req.user = user

            next()

        } catch (e) {

            res.status(401).json({ message: 'Not authorized!!' })
        }
    }
}

module.exports = AuthUserMiddleware.checkToken