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
        type: DataTypes.DATE
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
      credits: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0
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
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          referencesKey: "id",
          onDelete: "CASCADE"
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
      }
    },

    {
      sequelize,
      modelName: "Purchase",
      ...modelOptions,
      hooks: {}
    }
  )
