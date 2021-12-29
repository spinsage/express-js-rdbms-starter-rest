const { DataTypes } = require('sequelize')

const contactsModel = (db) => {
    db.define('contacts', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: DataTypes.STRING(45),
        lastName: DataTypes.STRING(45),
        email: DataTypes.STRING(45),
        uid: DataTypes.STRING(45)
    }, {
        tableName: 'contacts',
        timestamps: true
    })
}

module.exports = contactsModel
