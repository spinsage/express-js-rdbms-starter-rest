const Sequelize = require("sequelize")
const contactsModel = require('./model/contacts')

const sequelizeConfig = {
    autoConnect: true,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: 'mysql',
}

const db = new Sequelize(sequelizeConfig)

const init = async () => {
    contactsModel(db)
    await db.sync()
}

module.exports = {
    db,
    init
}