const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const xlsx = require('xlsx');
const Template = require('../models/TempSchema'); 
const Event = require('../models/eventsSchema');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('excelFile'), async (req, res) => {
    try {
        const { eventId } = req.body;
        const excelFilePath = req.file.path;

        const event = await Event.findOne({ eventId }).exec();
        if (!event || !event.templateId) {
            return res.status(404).json({ message: 'Event or templateId not found' });
        }

        const templateData = await Template.findOne({ tid: event.templateId }).exec();
        if (!templateData) {
            return res.status(404).json({ message: 'Template not found' });
        }

        const workbook = xlsx.readFile(excelFilePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        const generatePDF = require(`../Templates/${event.templateId}`);

        const pdfPromises = jsonData.map((row) => {
            return new Promise((resolve) => {
                const { data,images } = templateData;
                let needd=data.textt;
                //console.log(needd);
                let replacedText = data.textt;

                for (const column in row) {
                    const tag = column.trim();
                    replacedText = replacedText.replace(`<<${tag}>>`, row[column]);
                }

                data.textt = replacedText;
                //console.log(replacedText);
                // console.log(data.textt);
                // console.log(row.name);
                // console.log(row.course);
                // console.log(row.startDate);
                // console.log(row.endDate);
                const pdfDoc = generatePDF(data,images);
                //const pdfPath = path.join(__dirname, '..', `generated_${row.name}.pdf`);
                const pdfPath = `certificates/${row.name}.pdf`;
                const pdfStream = fs.createWriteStream(pdfPath);

                pdfDoc.pipe(pdfStream);
                pdfDoc.end();

                data.textt=needd;
                //console.log(data.textt);

                pdfStream.on('finish', () => {
                    // Delete the generated PDF file
                    // fs.unlinkSync(excelFilePath);
                    resolve(); // Resolve the promise when PDF is finished
                });
            
            });
        });

        // Wait for all PDF promises to resolve
        await Promise.all(pdfPromises);
        fs.unlinkSync(excelFilePath);

        // Send a success response to the client
        res.status(200).json({ message: 'PDF generation and download completed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;