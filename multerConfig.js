const multer = require('multer');
const path = require('path');

// Configuração do armazenamento para imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pasta onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único para o arquivo
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        // Apenas aceita imagens PNG ou JPEG
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(new Error('Apenas arquivos PNG ou JPEG são permitidos'), false);
        }
    }
});

module.exports = upload;
