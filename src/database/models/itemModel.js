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
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          referencesKey: "id",
          onDelete: "CASCADE"
        }
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Product",
          referencesKey: "id",
          onDelete: "CASCADE"
        }
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },

    {
      sequelize,
      modelName: "Item",
      ...modelOptions,
      hooks: {}
    }
  )
