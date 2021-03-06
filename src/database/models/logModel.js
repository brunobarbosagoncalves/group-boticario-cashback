import modelOptions from "../config/modelOptions"
export default (sequelize, DataTypes) =>
  sequelize.define(
    "Log",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      userIdRef: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dateTimestamp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      tokenAccess: {
        type: DataTypes.STRING,
        allowNull: false
      },
      request: {
        type: DataTypes.TEXT
      },
      response: {
        type: DataTypes.TEXT
      },
      createdAt: {
        allowNull: false,
        defaultValue: sequelize.fn("now"),
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: sequelize.fn("now"),
        type: DataTypes.DATE
      }
    },

    {
      sequelize,
      modelName: "Log",
      ...modelOptions,
      hooks: {}
    }
  )
