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

const UserInfo = sequelize.define('users_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, unique: true },
    name: { type: DataTypes.STRING, allowNull: true },
    bio: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    public_email: { type: DataTypes.STRING, allowNull: true },
    birthday: { type: DataTypes.DATEONLY, allowNull: true },
    social_accounts: { type: DataTypes.JSON, allowNull: true } 
}, { 
    timestamps: false
})

const UserSecurity = sequelize.define('users_security', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, unique: true },
    profile_type: { type: DataTypes.ENUM('public', 'private'), allowNull: false, defaultValue: 'public' },
    who_can_see_profile: { type: DataTypes.ENUM('public', 'friends', 'private'), allowNull: false, defaultValue: 'public' },
    who_can_message: { type: DataTypes.ENUM('public', 'friends', 'private'), allowNull: false, defaultValue: 'public' },
    who_can_see_birthday: { type: DataTypes.ENUM('public', 'friends', 'private'), allowNull: false, defaultValue: 'public' },
    who_can_see_phone: { type: DataTypes.ENUM('public', 'friends', 'private'), allowNull: false, defaultValue: 'public' },
    who_can_see_email: { type: DataTypes.ENUM('public', 'friends', 'private'), allowNull: false, defaultValue: 'public' },
    who_can_see_social_accounts: { type: DataTypes.ENUM('public', 'friends', 'private'), allowNull: false, defaultValue: 'public' }
}, {
    timestamps: false
})  

User.hasOne(UserInfo, { foreignKey: 'user_id', onDelete: 'CASCADE' });
UserInfo.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(UserSecurity, { foreignKey: 'user_id', onDelete: 'CASCADE' });
UserSecurity.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
    User,
    UserInfo,
    UserSecurity
}