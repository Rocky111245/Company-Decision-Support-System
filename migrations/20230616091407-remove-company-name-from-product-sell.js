'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('product_sell', 'Company_Name');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('product_sell', 'Company_Name', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'product_in_summary',
        key: 'Company_Name',
      },
      field: 'Company_Name',
    });
  },
};
