module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Purchase", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      date: {
        type: Sequelize.DataTypes.DATETIME
      },
      description: {
        type: Sequelize.DataTypes.STRING
      },
      value: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        defaultValue: "00.00",
        allowNull: false
      },
      cashback: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        defaultValue: "00.00",
        allowNull: false
      },
      status: {
        type: Sequelize.DataTypes.ENUM,
        values: ["IN_VALIDATION", "OK"],
        allowNull: false,
        defaultValue: "IN_VALIDATION"
      },
      isDeleted: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Purchase")
  }
}
