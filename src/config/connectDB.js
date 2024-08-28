import { query } from 'express';

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false,        
        timezone: "+07:00"
    })

const connectionDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to db successfully!!!');
    } catch (error) {
        console.error('Connection to db Failed', error);
    }
}

export default connectionDB;