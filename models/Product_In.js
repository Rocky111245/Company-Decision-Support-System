const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');
const ProductName = require('./product_names');
const CompanyName = require('./company_name');

class ProductIn extends Model {}

ProductIn.init(
  {
    Product_In_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'Product_In_ID',
    },
    Date_of_Entry: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'Date_of_Entry'
    },
    Product_Name: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: ProductName,
        key: 'Product_Name',
      },
      field: 'Product_Name'
    },
    Company_Name: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: CompanyName,
        key: 'Company_Name',
      },
      field: 'Company_Name'
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'quantity',
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'price',
    },
    invoiceAmountBDT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'invoiceAmountBDT',
    },
    costOfGoods: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'costOfGoods',
    },
  },
  {
    sequelize,
    modelName: 'ProductIn',
    tableName: 'product_in',
    timestamps: false,
  }
);

module.exports = ProductIn;
