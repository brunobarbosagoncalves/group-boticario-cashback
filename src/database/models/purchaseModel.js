import modelOptions from "../config/modelOptions"
export default (sequelize, DataTypes) =>
  sequelize.define(
    "Purchase",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      date: {
        type: DataTypes.DATETIME
      },
      description: {
        type: DataTypes.STRING
      },
      value: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: "00.00",
        allowNull: false
      },
      cashback: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: "00.00",
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM,
        values: ["IN_VALIDATION", "OK"],
        allowNull: false,
        defaultValue: "IN_VALIDATION"
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: "Purchase",
      ...modelOptions,
      hooks: {}
    }
  )
