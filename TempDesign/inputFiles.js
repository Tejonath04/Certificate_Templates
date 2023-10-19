const multer = require('multer');
const PDFDocument = require('pdfkit');

const uploadFieldsConfig = [
    { name: 'BGimg', maxCount: 1 },
    { name: 'Qimg', maxCount: 1 },
    { name: 'Simg1', maxCount: 1 },
    { name: 'Simg2', maxCount: 1 },
    { name: 'Simg3', maxCount: 1 },
    { name: 'Simg4', maxCount: 1 },
    { name: 'Simg5', maxCount: 1 },
    { name: 'Limg1', maxCount: 1 },
    { name: 'Limg2', maxCount: 1 },
    { name: 'Limg3', maxCount: 1 }
];

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = { upload, uploadFieldsConfig };


// const multer = require('multer');
// const PDFDocument = require('pdfkit');
// const path = require('path'); // Import path module

// const uploadFieldsConfig = [
//     { name: 'BGimg', maxCount: 1 },
//     { name: 'Qimg', maxCount: 1 },
//     { name: 'Simg1', maxCount: 1 },
//     { name: 'Simg2', maxCount: 1 },
//     { name: 'Simg3', maxCount: 1 },
//     { name: 'Simg4', maxCount: 1 },
//     { name: 'Simg5', maxCount: 1 },
//     { name: 'Limg1', maxCount: 1 },
//     { name: 'Limg2', maxCount: 1 },
//     { name: 'Limg3', maxCount: 1 }
// ];

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads'); // Specify the destination directory
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname; // Use the original file name
//         cb(null, fileName);
//     }
// });

// const upload = multer({ storage: storage });

// module.exports = { upload, uploadFieldsConfig };
