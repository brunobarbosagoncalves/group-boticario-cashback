import modelOptions from "../config/modelOptions"
export default (sequelize, DataTypes) =>
  sequelize.define(
    "Item",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
      },
      valueUnit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
      },
      purchaseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Purchase",
          referencesKey: "id",
          onDelete: "CASCADE"
        }
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Product",
          referencesKey: "id",
          onDelete: "CASCADE"
        }
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
      modelName: "Item",
      ...modelOptions,
      hooks: {}
    }
  )
