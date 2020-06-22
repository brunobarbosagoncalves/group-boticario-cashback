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
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Log")
  }
}
