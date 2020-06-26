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
        type: Sequelize.DataTypes.DATE
      },
      description: {
        type: Sequelize.DataTypes.STRING
      },
      value: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
        allowNull: false
      },
      cashback: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
        allowNull: false
      },
      credits: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0
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
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "User",
          referencesKey: "id",
          onDelete: "CASCADE"
        }
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
    return queryInterface.dropTable("Purchase")
  }
}
