const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Rota para criar um produto com link para imagem
router.post('/products', async (req, res) => {
    try {
        const { name, type, price, qtd, image } = req.body; // Recebe o link da imagem no campo `image`

        const product = await Product.create({
            name,
            type,
            price,
            qtd,
            image // Salva o link no banco
        });

        res.status(201).json(product);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ error: 'Erro ao criar produto.' });
    }
});

module.exports = router;
