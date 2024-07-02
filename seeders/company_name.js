
//npx sequelize seed company_name.js
const data = [
  {
    Company_Name: 'Topcon,Japan',
  },
  {
    Company_Name: 'Belmont,Japan',
  },
  {
      Company_Name: 'Baxter,USA',
  },
  {
      Company_Name: 'Newport,USA',
  },
    // more company objects can be added here
  ];
  
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('company_names', data, {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('company_names', {
        Company_Name: ['Topcon,Japan', 'Baxter,USA'] // Delete specific rows matching the company names
      });
    },
    
  };
  