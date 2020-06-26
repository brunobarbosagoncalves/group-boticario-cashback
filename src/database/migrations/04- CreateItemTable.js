module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Item", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      quantity: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      value: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
      },
      valueUnit: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
      },
      purchaseId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Purchase",
          referencesKey: "id",
          onDelete: "CASCADE"
        }
      },
      productId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Product",
          referencesKey: "id",
          onDelete: "CASCADE"
        }
      },
      isDeleted: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DataTypes.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Item")
  }
}
