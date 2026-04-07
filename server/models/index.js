const { registration } = require('../../../SER_API/server/controllers/UsersController');
const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, unique: true },
    login: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    registration_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    last_login: { type: DataTypes.DATE, allowNull: true },
    avatar: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    timezone: {
        type: DataTypes.STRING(50), allowNull: false, defaultValue: 'Europe/Kiev',
        validate: {
            isValidTimezone(value) {
                try {
                    Intl.DateTimeFormat(undefined, { timeZone: value });
                } catch (e) {
                    throw new Error('Invalid timezone');
                }
            }
        }
    }
    },

    {
        timestamps: false
    })

module.exports = {
    User
}