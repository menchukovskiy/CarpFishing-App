const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateJWT = (id, login, timezone, email, avatar) => {
    return jwt.sign(
        { id, login, timezone, email, avatar },
        process.env.TOKEN_KEY,
        { expiresIn: '4h' }
    )
}
 
const getDataUser = (user) => {
    return {
        id: user.id,
        login: user.login,
        timezone: user.timezone,
        avatar: user.avatar
    }
}

class UsersController {

    async registration(req, res, next) {

        const { login, password, email, timezone } = req.body

        if (!login || !password) {
            return next(ApiError.invalidData('INCORECT_LOGIN_OR_PASSWORD', 'Incorrect login or password'))
        }

        const findByLogin = await User.findOne({ where: { login } })

        if (findByLogin) {
            return next(ApiError.invalidData('USER_ALREADY_EXISTS', 'A user with this login already exists!'))
        }

        const findByEmail = await User.findOne({ where: { email } })

        if (findByEmail) {
            return next(ApiError.invalidData('USER_EMAIL_ALREADY_EXISTS', 'A user with this email already exists!'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        
        const user = await User.create(
            {
                login,
                password: hashPassword,
                email,
                timezone
            }
        )

        if (!user) {
            return next(ApiError.invalidData('UNEXPECTED_ERROR', 'Registration was not successful!'))
        }

        const token = generateJWT(user.id, user.login, user.timezone, user.email, user.avatar)

        return res.json(
            { token }
        )
    }

    async check(req, res, next) {

        const user = req.user
        
        const token = generateJWT(user.id, user.login, user.timezone, user.email, user.avatar)

        return res.json(
            { token }
        )
    }

    async login(req, res, next) {

        const { login, password } = req.body
        console.log(login, password)

        if (!login || !password) {
            return next(ApiError.invalidData('INCORECT_LOGIN_OR_PASSWORD', 'Incorrect login or password'))
        }

        const user = await User.findOne({ where: { login } })

        if (!user) {
            return next(ApiError.invalidData('USER_NOT_FOUNDED', 'Incorrect login or password'))
        }
 
        let comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword) {
            return next(ApiError.invalidData('INCORRECT_PASSWORD', 'Incorrect login or password'))
        }

        const token = generateJWT(user.id, user.login, user.timezone, user.email, user.avatar)

        return res.json(
            { token }
        )
    }

}

module.exports = new UsersController()