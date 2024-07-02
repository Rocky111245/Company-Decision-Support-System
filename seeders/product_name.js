const data = [
    {
      Product_Name: 'ICU Ventilator',
    },
    {
      Product_Name: 'Dialysis Fluid 2.5%',
    },
    {
      Product_Name: 'Dialyzer',
    },
    {
      Product_Name: 'TRC-50DX, Eye Analyzer',
    },
    {
      Product_Name: 'SL-D301, Slit Lamp',
    },
    {
      Product_Name: 'OMS-90,Operation Microscope',
    },
    {
        Product_Name: 'KR-800,Auto Refractometer',
    },
    {
      Product_Name: 'Cardio TreadMill,ECG machine',
  }
    
  ];
  
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('product_names', data, {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('product_names', null, {});
    },
  };
  