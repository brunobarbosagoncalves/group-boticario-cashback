require("../../services/environment")

const {
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_DIALECT,
  DATABASE_OPERATORS_ALIASE
} = process.env

module.exports = {
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  host: DATABASE_HOST,
  dialect: DATABASE_DIALECT,
  operatorsAliases: DATABASE_OPERATORS_ALIASE,
  dialectOptions: {
    dateStrings: true,
    typeCast: true
  }
}
