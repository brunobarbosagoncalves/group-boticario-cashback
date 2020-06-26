module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("User", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING
      },
      document: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      credits: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0
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
    return queryInterface.dropTable("User")
  }
}
