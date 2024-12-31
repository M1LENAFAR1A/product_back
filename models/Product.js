// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    qtd: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true // Cria as colunas createdAt e updatedAt automaticamente
});

module.exports = Product;
