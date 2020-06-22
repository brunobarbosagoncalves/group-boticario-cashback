import fs from "fs"
import path from "path"
import Sequelize from "sequelize"
import { DataTypes } from "sequelize"

import config from "../config/config"

const db = {}

const { database, username, password } = config

const sequelize = new Sequelize(database, username, password, { ...config })

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf(".") !== 0 && file !== path.basename(__filename) && file.slice(-3) === ".js"
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

import userModel from "./userModel"
import purchaseModel from "./purchaseModel"
import productModel from "./productModel"
import itemModel from "./itemModel"
import logModel from "./logModel"

db.userModel = userModel(sequelize, DataTypes)
db.purchaseModel = purchaseModel(sequelize, DataTypes)
db.productModel = productModel(sequelize, DataTypes)
db.itemModel = itemModel(sequelize, DataTypes)
db.logModel = logModel(sequelize, DataTypes)

//Relations

//1-1//
db.itemModel.hasOne(db.productModel, { foreignKey: "id", targetKey: "itemId" })
db.productModel.belongsTo(db.itemModel, { foreignKey: "itemId", targetKey: "id" })

//1-0.N//
db.userModel.hasMany(db.purchaseModel, { foreignKey: "id", targetKey: "userId" })
db.purchaseModel.belongsTo(db.userModel, { foreignKey: "userId", targetKey: "id" })

db.purchaseModel.hasMany(db.itemModel, { foreignKey: "id", targetKey: "purchaseId" })
db.itemModel.belongsTo(db.purchaseModel, { foreignKey: "purchaseId", targetKey: "id" })

export default db
