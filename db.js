// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '12345', {
    host: 'localhost',
    dialect: 'postgres' // Altere para 'postgres' se estiver usando PostgreSQL
});

sequelize.authenticate()
    .then(() => console.log('Conexão com banco bem-sucedida!'))
    .catch(err => console.error('Erro ao conectar ao banco:', err));

module.exports = sequelize;
