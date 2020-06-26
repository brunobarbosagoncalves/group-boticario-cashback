module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Product", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING
      },
      value: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      descount: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        defaultValue: "00.00",
        allowNull: false
      },
      descountType: {
        type: Sequelize.DataTypes.ENUM,
        values: ["PERCENT", "VALUE"],
        allowNull: false,
        defaultValue: "VALUE"
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
    return queryInterface.dropTable("Product")
  }
}
