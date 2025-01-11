const express = require('express');
const sequelize = require('./db'); // Conexão com o banco
const Product = require('./models/Product'); // Modelo do produto
const productRoutes = require('./routes/products'); // Rotas
const app = express();

// Middleware para lidar com JSON
app.use(express.json());

// Middleware para servir arquivos estáticos (imagens enviadas)
app.use('/uploads', express.static('uploads'));

// Rotas de produtos
app.use('/api', productRoutes);

// Função para verificar e sincronizar o banco de dados
const startServer = async () => {
    try {
        // Sincronizar o banco de dados (cria tabelas se não existirem)
        await sequelize.sync(); // Remove `{ force: true }` para não recriar tabelas existentes
        console.log('Banco de dados sincronizado!');

        // Iniciar o servidor na porta 3000
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
};

// Iniciar o servidor
startServer();
