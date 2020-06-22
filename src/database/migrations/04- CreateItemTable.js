module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Item", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Item",
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
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Item")
  }
}
