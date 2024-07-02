/*const { ProductListing, CompanyName, ProductName } = require('../models');

router.get('/product_listing', async (req, res) => {
  try {
    const productListing = await ProductListing.findAll({
      include: [
        { model: CompanyName, attributes: ['Company_Name'] },
        { model: ProductName, attributes: ['Product_Name'] }
      ]
    });
    res.json(productListing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving product listing' });
  }
});
*/