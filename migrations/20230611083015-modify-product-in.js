'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Product_In', 'price', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addColumn('Product_In', 'invoiceAmountBDT', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addColumn('Product_In', 'costOfGoods', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Product_In', 'price');
    await queryInterface.removeColumn('Product_In', 'invoiceAmountBDT');
    await queryInterface.removeColumn('Product_In', 'costOfGoods');
  },
};
