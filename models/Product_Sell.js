const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');
const ProductIn = require('./Product_In');

class ProductSell extends Model {}

ProductSell.init(
  {
    Product_Sell_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'Product_Sell_ID',
    },
    Date_of_Selling: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'Date_of_Selling',
    },
    Product_Name: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: ProductIn,
        key: 'Product_Name',
      },
      field: 'Product_Name',
    },
    Customer_Name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'Customer_Name',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'quantity',
    },
    ActualcostOfGoods: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ActualcostOfGoods',
    },
    Selling_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Selling_Price',
    },
  },
  {
    sequelize,
    modelName: 'ProductSell',
    tableName: 'product_sell',
    timestamps: false,
  }
);

module.exports = ProductSell;
