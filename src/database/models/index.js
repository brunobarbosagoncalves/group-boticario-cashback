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

/*Relations 1-1*/
//product.id => item.productId
db.productModel.hasOne(db.itemModel, { foreignKey: "productId" })
db.itemModel.belongsTo(db.productModel, { foreignKey: "productId" })

/*Relations 1-0.N*/
//user.id => item.userId
db.userModel.hasMany(db.purchaseModel, { foreignKey: "userId" })
db.purchaseModel.belongsTo(db.userModel, { foreignKey: "userId" })

//purchase.id => item.purchaseId
db.purchaseModel.hasMany(db.itemModel, { foreignKey: "purchaseId" })
db.itemModel.belongsTo(db.purchaseModel, { foreignKey: "purchaseId" })

export default db
