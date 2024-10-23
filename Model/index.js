require('dotenv').config();
const { Sequelize, DataTypes, Model } = require('sequelize');
const {user} = require('./user');



const databaseName = process.env.DB_Name;
const username = process.env.DB_Username;
const password = process.env.DB_Passeord;


const sequelize = new Sequelize(databaseName, username,password, {
    host: process.DB_HostName,
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log("Successfully connected to the database");
}).catch((err) => {
    console.log("Unable to connect", err);
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('./user')(Model,DataTypes,sequelize);

sequelize.sync({force:false},{alter:false});
module.exports = db;