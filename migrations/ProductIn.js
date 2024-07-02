'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Product_In', {
      Product_In_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Date_of_Entry: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      Product_Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Company_Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Product_In');
  },
};
