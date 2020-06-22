"use strict"
//descountType: ["PERCENT", "VALUE"]
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Product",
      [
        {
          name: "Produto A",
          value: "10,00",
          descount: "00.00",
          descountType: "VALUE"
        },
        {
          name: "Produto B",
          value: "15,00",
          descount: "00.00",
          descountType: "VALUE"
        },
        {
          name: "Produto C",
          value: "20,00",
          descount: "00.00",
          descountType: "VALUE"
        },
        {
          name: "Produto D",
          value: "25,00",
          descount: "00.00",
          descountType: "VALUE"
        },
        {
          name: "Produto E",
          value: "30,00",
          descount: "00.00",
          descountType: "VALUE"
        },
        {
          name: "Produto F",
          value: "35,00",
          descount: "00.00",
          descountType: "VALUE"
        },
        {
          name: "Produto G",
          value: "200,00",
          descount: "00.00",
          descountType: "VALUE"
        },
        {
          name: "Produto H",
          value: "400,00",
          descount: "00.00",
          descountType: "VALUE"
        }
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete("Product", null, {})
}
