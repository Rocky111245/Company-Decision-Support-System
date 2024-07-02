const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const ProductName = require('./models/product_names');
const CompanyName = require('./models/company_name');
const ProductIn = require('./models/Product_In');
const ProductSell = require('./models/Product_Sell');
const connection=require('./connection');


app.use(express.json());

// API Routes
app.get('/api/product_names', async (_req, res) => {
  try {
    const productNames = await ProductName.findAll();
    res.json(productNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve product names' });
  }
});

app.get('/api/company_name', async (_req, res) => {
  try {
    const companyNames = await CompanyName.findAll();
    res.json(companyNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve company names' });
  }
});

app.get('/api/product_in', async (_req, res) => {
  try {
    const productIn = await ProductIn.findAll();
    res.json(productIn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve product in data' });
  }
});

app.get('/api/product_sell', async (_req, res) => {
  try {
    const productOut = await ProductSell.findAll();
    res.json(productOut);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve product out data' });
  }
});


app.get('/api/product_names', async (_req, res) => {
  try {
    const productNames = await ProductName.findAll();
    res.json(productNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve product names' });
  }
});

app.get('/api/product_in_summary', async (req, res) => {
  try {
    const productSummaries = await connection.query('SELECT * FROM product_in_summary', 
    { type: connection.QueryTypes.SELECT });
    res.json(productSummaries);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred on the server: ' + err.message);
  }
});

app.get('/api/product_sell_summary', async (req, res) => {
  try {
    const productsellSummaries = await connection.query('SELECT * FROM product_sell_summary', 
    { type: connection.QueryTypes.SELECT });
    res.json(productsellSummaries);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred on the server: ' + err.message);
  }
});



app.get('/api/netstock', async (req, res) => {
  try {
    const netstock = await connection.query('SELECT * FROM net_stock', 
    { type: connection.QueryTypes.SELECT });
    res.json(netstock);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred on the server: ' + err.message);
  }
});


app.post('/api/updateNetStock', async (req, res) => {
  try {
    // Execute the DROP TABLE IF EXISTS statement
    await connection.query('DROP TABLE IF EXISTS net_stock');
    
    // Execute the CREATE TABLE AS SELECT statement
    await connection.query(`
      CREATE TABLE net_stock AS
      SELECT 
        pIn.Product_Name,
        pIn.Company_Name,
        pIn.Total_Quantity AS Quantity_In,
        pSell.Total_Quantity AS Quantity_Sold,
        pIn.Total_Price,
        pIn.Total_InvoiceAmountBDT,
        pIn.Total_CostOfGoods,
        (pIn.Total_InvoiceAmountBDT / NULLIF(pIn.Total_Quantity, 0)) AS Average_buying_price,
        (pIn.Total_CostOfGoods / NULLIF(pIn.Total_Quantity, 0)) AS COG_W_average,
        (pIn.Total_Quantity - IFNULL(pSell.Total_Quantity, 0)) AS Net_Stock,
        ((pIn.Total_CostOfGoods / NULLIF(pIn.Total_Quantity, 0)) * (pIn.Total_Quantity - IFNULL(pSell.Total_Quantity, 0))) AS COG_W_for_Stock
      FROM
        product_in_summary AS pIn
      LEFT JOIN
        product_sell_summary AS pSell
      ON 
        pIn.Product_Name = pSell.Product_Name;
    `);

    res.status(200).send('Net Stock updated successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred on the server: ' + err.message);
  }
});




app.post('/api/product_in', async (req, res) => {
  try {
    const {
      date,
      productName,
      companyName,
      quantity,
      price,
      invoiceAmountBDT,
      costOfGoods,
    } = req.body;

    // Check if the required fields are provided
    if (!date || !productName || !companyName || !quantity || !price) {
      res.status(400).json({ error: 'Please fill in all fields' });
      return;
    }

    // Check if the product and company exist in the database
    const product = await ProductName.findOne({
      where: { Product_Name: productName },
    });
    const company = await CompanyName.findOne({
      where: { Company_Name: companyName },
    });
    if (!product || !company) {
      res.status(400).json({ error: 'Invalid product or company name provided' });
      return;
    }

    // Create a new ProductIn entry in the database
    const productIn = await ProductIn.create({
      Date_of_Entry: date,
      Product_Name: productName,
      Company_Name: companyName,
      quantity,
      price,
      invoiceAmountBDT,
      costOfGoods,
    });

    // Respond with the ID of the newly created row
    res.json({ Product_In_ID: productIn.get('Product_In_ID') });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the data.' });
  }
});

app.post('/api/product_sell', async (req, res) => {
  try {
    const {
      date,
      productName,
      quantity,
      customerName,
      saleValue,
      costOfGoods,
    } = req.body;

    // Check if the required fields are provided
    if (!date || !productName || !quantity || !customerName || !saleValue || !costOfGoods) {
      res.status(400).json({ error: 'Please fill in all fields' });
      return;
    }

    // Check if the product exists in the database
    const product = await ProductIn.findOne({
      where: { Product_Name: productName },
    });
    if (!product) {
      res.status(400).json({ error: 'Invalid product name provided' });
      return;
    }

    // Create a new ProductSell entry in the database
    const productSell = await ProductSell.create({
      Date_of_Selling: date,
      Product_Name: productName,
      Customer_Name: customerName,
      quantity,
      ActualcostOfGoods: costOfGoods,
      Selling_price: saleValue,
    });

    // Respond with the ID of the newly created row
    res.json({ Product_Sell_ID: productSell.get('Product_Sell_ID') });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the data.' });
  }
});


app.delete('/api/product_in/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    
    // Find the row to delete by the Product_In_ID
    const productIn = await ProductIn.findOne({ where: { Product_In_ID: productId } });
    
    if (!productIn) {
      res.status(404).json({ error: 'Row not found' });
      return;
    }

    // Delete the row
    await productIn.destroy();

    res.status(204).send(); // Send a success response with no content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the row' });
  }
});

app.delete('/api/product_sell/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if the row exists in the database
    const productSell = await ProductSell.findOne({ where: { Product_Sell_ID: productId } });
    if (!productSell) {
      res.status(404).json({ error: 'Row not found' });
      return;
    }

    // Delete the row
    await productSell.destroy();

    // Respond with a success message
    res.json({ message: 'Row deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the row' });
  }
});




// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
