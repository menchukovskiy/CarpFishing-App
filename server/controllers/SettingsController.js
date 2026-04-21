
const ApiError = require('../error/ApiError');
const { UserInfo } = require('../models');

class SettingsController {

    async getUserInfo(req, res, next) {
        const userId = req.user.id

        try {
            const userInfo = await UserInfo.findOne({ where: { user_id: userId } })

         

            res.json({
                data: {
                    name: userInfo?.name || '',
                    bio: userInfo?.bio || '',
                    phone: userInfo?.phone || '',
                    public_email: userInfo?.public_email || '',
                    birthday: userInfo?.birthday || null,
                    social_accounts: userInfo?.social_accounts || {
                        facebook: null,
                        instagram: null,
                        youtube: null
                    }
                }
            })

        } catch (error) {
            next(ApiError.internal('INTERNAL_SERVER_ERROR', 'An error occurred while fetching user information'))
        }
    }

    async updateUserInfo(req, res, next) {
        const userId = req.user.id
        const { name, bio, phone, public_email, birthday, social_accounts } = req.body

        try {
            await UserInfo.upsert({
                social_accounts: social_accounts,
                user_id: userId,
                name: name || null,
                bio: bio || null,
                phone: phone || null,
                public_email: public_email || null,
                birthday: birthday || null
            });

            const userInfo = await UserInfo.findOne({ where: { user_id: userId } });

            res.json({
                data: {
                    name: userInfo?.name || '',
                    bio: userInfo?.bio || '',
                    phone: userInfo?.phone || '',
                    public_email: userInfo?.public_email || '',
                    birthday: userInfo?.birthday || null,
                    social_accounts: userInfo?.social_accounts || {
                        facebook: null,
                        instagram: null,
                        youtube: null
                    }
                }
            })
        } catch (error) {
            next(ApiError.internal('INTERNAL_SERVER_ERROR', 'An error occurred while updating user information'))
        }

    }


}

module.exports = new SettingsController()