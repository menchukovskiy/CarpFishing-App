const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
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

const renameFile = async (oldPath, newName) => {
    const newPath = path.join(path.dirname(oldPath), newName)

    try {
        await fs.promises.access(newPath, fs.constants.F_OK)
        await fs.promises.unlink(newPath)
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error
        }
    }

    await fs.promises.rename(oldPath, newPath)
    return newPath
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

    async updateAvatar(req, res, next) {
        const avatar = req.files?.avatar?.[0]

        if (!avatar) {
            return next(ApiError.invalidData('NO_AVATAR_UPLOADED', 'No avatar uploaded'))
        }

        const user = req.user

        const newNameForFileAvatar = `user_${user.id}_avatar.jpg`
        
        try {
            await renameFile( avatar.path, newNameForFileAvatar )
        } catch (error) {
            console.error('Error renaming avatar file:', error)
            return next(ApiError.invalidData('AVATAR_UPLOAD_ERROR', 'Error uploading avatar'))
        }
        
        user.avatar = newNameForFileAvatar
        await user.save()

        const token = generateJWT(user.id, user.login, user.timezone, user.email, user.avatar)

        return res.json(
            { token }
        )
    }

    async removeAvatar(req, res, next) {
        const user = req.user

        if (!user.avatar) {
            return next(ApiError.invalidData('NO_AVATAR_TO_REMOVE', 'No avatar to remove'))
        }

        const avatarPath = path.resolve(__dirname, "../files/users_avatar", user.avatar)

        try {
            await fs.promises.unlink(avatarPath)
        } catch (error) {
            console.error('Error deleting avatar file:', error)
            return next(ApiError.invalidData('AVATAR_DELETE_ERROR', 'Error deleting avatar'))
        }

        user.avatar = null
        await user.save()

        const token = generateJWT(user.id, user.login, user.timezone, user.email, user.avatar)

        return res.json(
            { token }
        )
    }

}

module.exports = new UsersController()