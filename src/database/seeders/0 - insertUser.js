"use strict"
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert("User", [
      {
        name: "Bruno Barbosa",
        email: "bruno@gmail.com",
        password: "d3a3bdb4e760f30c4d93a869b0f64af5a579a432c4ff6f81a49a1d25659bd349",
        document: "79334521082",
        credits: 0.0,
        isDeleted: 0
      },
      {
        name: "Rafael Costa",
        document: "15350946056",
        email: "rafael@gmail.com",
        password: "d3a3bdb4e760f30c4d93a869b0f64af5a579a432c4ff6f81a49a1d25659bd349",
        credits: 100.39,
        isDeleted: false
      }
    ]),

  down: queryInterface => queryInterface.bulkDelete("User", null, {})
}
