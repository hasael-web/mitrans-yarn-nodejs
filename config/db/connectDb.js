require("dotenv").config()
const { Sequelize } = require('sequelize');


const {DB_USERNAME,DB_HOST,DB_PASSWORD,DB_TYPE,DB_NAME} = process.env



// Option 3: Passing parameters separately (other dialects)
const connectDb = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_TYPE
});


module.exports = connectDb