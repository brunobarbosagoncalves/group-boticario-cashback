module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Log", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      userIdRef: {
        type: Sequelize.DataTypes.STRING
      },
      date: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      dateTimestamp: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      tokenAccess: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      request: {
        type: Sequelize.DataTypes.TEXT
      },
      response: {
        type: Sequelize.DataTypes.TEXT
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
    return queryInterface.dropTable("Log")
  }
}
