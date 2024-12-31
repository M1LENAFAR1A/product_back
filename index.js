// const express = require('express');

// const server = express();

// server.use(express.json());

// const flores = ['Vinicolor', 'Rubra', 'Coerulea'];

// //retorna flores
// server.get('/flores/:index', (req, res) => {

//     const { index } = req.params;

//     return res.json(flores[index]);
// });

// //retornar todas as flores

// server.get('/flores', (req, res) => {
//     return res.json(flores);
// });

// // criar nova flor

// server.post('/flores', (req, res) => {
//     const {name} = req.body;
//     flores.push(name);

//     return res.json(flores);
// });

// //atualizar flor

// server.put('/flores/:index', (req, res) => {
//     const {index} = req.params;
//     const {name} = req.body;

//     flores[index] = name;

//     return res.json(flores);
// });

// //excluir flor

// server.delete('/flores/:index', (req, res) => {
//     const {index} = req.params;

//     flores.splice(index, 1);

//     return res.json({message: "A flor foi deletada com sucesso!"});
// });


// server.listen(3000);

const express = require('express');
const sequelize = require('./db');
const Product = require('./models/Product');

const server = express();
server.use(express.json());

// ✅ Teste de Conexão com o Banco de Dados
sequelize.sync()
    .then(() => console.log('✅ Banco de dados sincronizado com Sequelize'))
    .catch(err => console.error('❌ Erro ao sincronizar banco:', err));

// ✅ Rota para retornar um produto por ID
server.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        return res.json(product);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar produto' });
    }
});

// ✅ Rota para retornar todos os produtos
server.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.json(products);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});

// ✅ Rota para criar um novo produto
server.post('/products', async (req, res) => {
    try {
        const { name, type, price, qtd } = req.body;
        const product = await Product.create({ name, type, price, qtd });
        return res.status(201).json(product);
    } catch (err) {
        return res.status(400).json({ error: 'Erro ao criar produto' });
    }
});

// ✅ Rota para atualizar um produto por ID
server.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, price, qtd } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        await product.update({ name, type, price, qtd });
        return res.json(product);
    } catch (err) {
        return res.status(400).json({ error: 'Erro ao atualizar produto' });
    }
});

// ✅ Rota para excluir um produto por ID
server.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        await product.destroy();
        return res.json({ message: 'Produto deletado com sucesso!' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao deletar produto' });
    }
});

// ✅ Iniciar o Servidor
server.listen(3000, () => {
    console.log('🚀 Servidor rodando na porta 3000');
});
