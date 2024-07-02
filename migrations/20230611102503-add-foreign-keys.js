'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_in', {
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
        references: {
          model: 'product_names',
          key: 'Product_Name',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Company_Name: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'company_names',
          key: 'Company_Name',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      invoiceAmountBDT: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      costOfGoods: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('product_in', {
      fields: ['Company_Name'],
      type: 'foreign key',
      name: 'fk_product_in_company_names',
      references: {
        table: 'company_names',
        field: 'Company_Name',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('product_in', 'fk_product_in_company_names');
    await queryInterface.dropTable('product_in');
  },
};
