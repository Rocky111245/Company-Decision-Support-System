module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('Company_Names', 'company_names');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('company_names', 'Company_Names');
  }
};
