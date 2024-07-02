/*const connection = require('./connection');
const CompanyName = require('./models/company_name');
const ProductName = require('./models/product_names');
const ProductListing = require('./models/product_listing'); // Import the newly created model

connection
  .authenticate()
  .then(async () => {
    console.log('Connection to the database has been established successfully.');

    await CompanyName.sync();
    await ProductName.sync();
    await ProductListing.sync(); // Sync the newly created model

    console.log('Database synced successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  }); */
