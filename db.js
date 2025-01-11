// // db.js
// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('postgres', 'postgres', '12345', {
//     host: 'localhost',
//     dialect: 'postgres' // Altere para 'postgres' se estiver usando PostgreSQL
// });

// sequelize.authenticate()
//     .then(() => console.log('Conexão com banco bem-sucedida!'))
//     .catch(err => console.error('Erro ao conectar ao banco:', err));

// module.exports = sequelize;

require('dotenv').config(); // Adicionado no início do arquivo

const { Sequelize } = require('sequelize');

// Variáveis de ambiente
const database = process.env.DB_NAME || 'postgres';
const username = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASS || '12345';
const host = process.env.DB_HOST || 'localhost';
const dialect = process.env.DB_DIALECT || 'postgres';

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect
});

sequelize.authenticate()
    .then(() => console.log('Conexão com banco bem-sucedida!'))
    .catch(err => console.error('Erro ao conectar ao banco:', err));

module.exports = sequelize;
