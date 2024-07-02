// models/product_names.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class ProductName extends Model {}

ProductName.init({
  productID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'Product_ID'
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'Product_Name'
  },
}, {
  sequelize,
  modelName: 'ProductName',
  tableName: 'product_names',
  timestamps: false,
});

module.exports = ProductName;
