const express = require('express');

const server = express();

server.use(express.json());

const flores = ['Vinicolor', 'Rubra', 'Coerulea'];

//retorna flores
server.get('/flores/:index', (req, res) => {

    const { index } = req.params;

    return res.json(flores[index]);
});

//retornar todas as flores

server.get('/flores', (req, res) => {
    return res.json(flores);
});

// criar nova flor

server.post('/flores', (req, res) => {
    const {name} = req.body;
    flores.push(name);

    return res.json(flores);
});

//atualizar flor

server.put('/flores/:index', (req, res) => {
    const {index} = req.params;
    const {name} = req.body;

    flores[index] = name;

    return res.json(flores);
});

//excluir flor

server.delete('/flores/:index', (req, res) => {
    const {index} = req.params;

    flores.splice(index, 1);

    return res.json({message: "A flor foi deletada com sucesso!"});
});


server.listen(3000);
