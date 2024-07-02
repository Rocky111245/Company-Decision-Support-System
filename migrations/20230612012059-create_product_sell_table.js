'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_sell', {
      Product_Sell_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Date_of_Selling: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      Product_Name: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'product_in',
          key: 'Product_Name',
        },
      },
      Company_Name: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'product_in',
          key: 'Company_Name',
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ActualcostOfGoods: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Selling_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
     
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_sell');
  }
};
