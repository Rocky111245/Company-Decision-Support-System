
// models are tables created by sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class CompanyName extends Model {}

CompanyName.init({
companyID: {
type: DataTypes.INTEGER,
allowNull: false,
primaryKey: true,
autoIncrement: true,
field: 'Company_ID'
},
companyName: {
type: DataTypes.STRING,
allowNull: false,
unique: true,
field: 'Company_Name'
},
}, {
sequelize,
modelName: 'CompanyName',
tableName: 'company_names',
timestamps: false,
});

module.exports = CompanyName;