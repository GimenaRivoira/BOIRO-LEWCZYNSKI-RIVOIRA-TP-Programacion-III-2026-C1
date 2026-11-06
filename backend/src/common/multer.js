const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback( null, 'img');
    },
    filename: (req, file, callback) => {
        const esImagen = file.mimetype.includes('image');

        if (!esImagen) {
            callback(new Error('No es una imagen'));
            return;
        }

        const extensions = file.mimetype.split('/')[1];
        const nombreFinal = `${Date.now()}-producto.${extensions}`;
        callback(null, nombreFinal);
    }
});

const upload = multer({ storage:storage, limits: { fileSize: 1025 * 1024 } });

module.exports = upload;