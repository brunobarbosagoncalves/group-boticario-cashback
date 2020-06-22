import modelOptions from "../config/modelOptions"
export default (sequelize, DataTypes) =>
  sequelize.define(
    "Product",
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
      value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      descount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: "00.00",
        allowNull: false
      },
      descountType: {
        type: DataTypes.ENUM,
        values: ["PERCENT", "VALUE"],
        allowNull: false,
        defaultValue: "VALUE"
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: "Product",
      ...modelOptions,
      hooks: {}
    }
  )
