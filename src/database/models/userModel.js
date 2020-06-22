import { encrypt } from "services/encrypt"
import modelOptions from "../config/modelOptions"
import validationCPF from "services/cpfValidator"
export default (sequelize, DataTypes) =>
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      },
      document: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: "User",
      ...modelOptions,
      hooks: {
        async beforeCreate(instance, options) {
          if (!instance.name || !instance.name.length) {
            return Promise.reject(new Error("Name required"))
          }
          if (!instance.email || !instance.email.length) {
            return Promise.reject(new Error("Email required"))
          }
          if (!instance.password || !instance.password.length) {
            return Promise.reject(new Error("Password required"))
          }
          if (!instance.document || !instance.document.length) {
            return Promise.reject(new Error("Cpf required"))
          }
          if (!validationCPF(instance.document)) {
            return Promise.reject(new Error("Cpf invalid"))
          }

          instance.password = await encrypt(instance.password)
        },
        async beforeBulkUpdate(instance, options) {
          if (instance.attributes.password) {
            instance.attributes.password = await encrypt(instance.attributes.password)
          }
        },
        async beforeValidate(instance, options) {}
      }
    }
  )
