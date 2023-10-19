const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const xlsx = require('xlsx');
const Template = require('../models/BlankCertSchema');
const Event = require('../models/eventsSchema');
const {generatePDFL, generatePDFP} = require('../TempDesign/BlankCertDesign');

const upload = multer({ dest: 'uploads/' });

router.post('/GenL', upload.single('excelFile'), async (req, res) => {
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

        // const generatePDF = require(`../Templates/${event.templateId}`);

        const pdfPromises = jsonData.map((row) => {
            return new Promise((resolve) => {
                //const { data,images } = templateData;
                let needd=templateData.text.content;
                //console.log(needd);
                let replacedText = templateData.text.content;

                for (const column in row) {
                    const tag = column.trim();
                    replacedText = replacedText.replace(`<<${tag}>>`, row[column]);
                }

                templateData.text.content = replacedText;
                const pdfDoc = generatePDFL(templateData);
                //const pdfPath = path.join(__dirname, '..', `generated_${row.name}.pdf`);
                const pdfPath = `certificates/${row.name}.pdf`;
                const pdfStream = fs.createWriteStream(pdfPath);

                pdfDoc.pipe(pdfStream);
                pdfDoc.end();

                templateData.text.content=needd;
                //console.log(templateData.text.content);

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

router.post('/GenP', upload.single('excelFile'), async (req, res) => {
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

        // const generatePDF = require(`../Templates/${event.templateId}`);

        const pdfPromises = jsonData.map((row) => {
            return new Promise((resolve) => {
                //const { data,images } = templateData;
                let needd=templateData.text.content;
                //console.log(needd);
                let replacedText = templateData.text.content;

                for (const column in row) {
                    const tag = column.trim();
                    replacedText = replacedText.replace(`<<${tag}>>`, row[column]);
                }

                templateData.text.content = replacedText;
                //console.log(replacedText);
                // console.log(templateData.text.content);
                // console.log(row.name);
                // console.log(row.course);
                // console.log(row.startDate);
                // console.log(row.endDate);
                const pdfDoc = generatePDFP(templateData);
                //const pdfPath = path.join(__dirname, '..', `generated_${row.name}.pdf`);
                const pdfPath = `certificates/${row.name}.pdf`;
                const pdfStream = fs.createWriteStream(pdfPath);

                pdfDoc.pipe(pdfStream);
                pdfDoc.end();

                templateData.text.content=needd;
                //console.log(templateData.text.content);

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