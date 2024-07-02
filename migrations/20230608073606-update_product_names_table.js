module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('Product_Names', 'product_names');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('product_names', 'Product_Names');
  }
};
