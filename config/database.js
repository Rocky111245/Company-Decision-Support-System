//connection with mysql database
// config/database.js
module.exports = {
  dialect: 'mysql',
  host: 'localhost',  //localhost
  port: 3306,        //port no.
  username: 'root',
  password: '',
  database: 'nts',
  define: {
    timestamps: true,
    underscored: true,
  },
};