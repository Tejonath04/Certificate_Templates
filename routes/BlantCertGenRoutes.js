const express = require('express');
const router = express.Router();
const BlankCertSchema = require('../models/BlankCertSchema'); // Importing your Mongoose model
const Event = require('../models/eventsSchema');
const {generatePDFL, generatePDFP} = require('../TempDesign/BlankCertDesign');
const fs = require('fs');
const path = require('path');

//--------------------------------------------------------------------------------------

router.post('/GenL', async (req, res) => {
    try {
        const { eventId, dynamicData } = req.body;
        const event = await Event.findOne({ eventId }).exec();

        // Fetch template data from the database based on tid

        if (!event || !event.templateId) {
            return res.status(404).json({ message: 'Event or templateId not found' });
        }


        const templateData = await BlankCertSchema.findOne({ tid: event.templateId }).exec();

        if (!templateData) {
            return res.status(404).json({ message: 'Template not found' });
        }

        let replacedText = templateData.text.content;
        for (const tag in dynamicData) {
            replacedText = replacedText.replace(`<<${tag}>>`, dynamicData[tag]);
        }

        // Update the data object with the replaced text
        templateData.text.content = replacedText;

        // Generate PDF using the fetched template data with replaced tags
        const pdfDoc = generatePDFL(templateData);

        // Create a writable stream for the PDF file
        const pdfPath = path.join(__dirname, '..', 'generated.pdf');
        const pdfStream = fs.createWriteStream(pdfPath);
        pdfDoc.pipe(pdfStream);

        // Close the PDF document
        pdfDoc.end();

        pdfStream.on('finish', () => {
            // Send the PDF file as a downloadable response
            res.download(pdfPath, 'generated.pdf', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Failed to download PDF' });
                }
                // Delete the generated PDF file
                fs.unlinkSync(pdfPath);
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/GenP', async (req, res) => {
  try {
      const { eventId, dynamicData } = req.body;
      const event = await Event.findOne({ eventId }).exec();

      // Fetch template data from the database based on tid

      if (!event || !event.templateId) {
          return res.status(404).json({ message: 'Event or templateId not found' });
      }


      const templateData = await BlankCertSchema.findOne({ tid: event.templateId }).exec();

      if (!templateData) {
          return res.status(404).json({ message: 'Template not found' });
      }

      let replacedText = templateData.text.content;
      for (const tag in dynamicData) {
          replacedText = replacedText.replace(`<<${tag}>>`, dynamicData[tag]);
      }

      // Update the data object with the replaced text
      templateData.text.content = replacedText;

      // Generate PDF using the fetched template data with replaced tags
      const pdfDoc = generatePDFP(templateData);

      // Create a writable stream for the PDF file
      const pdfPath = path.join(__dirname, '..', 'generated.pdf');
      const pdfStream = fs.createWriteStream(pdfPath);
      pdfDoc.pipe(pdfStream);

      // Close the PDF document
      pdfDoc.end();

      pdfStream.on('finish', () => {
          // Send the PDF file as a downloadable response
          res.download(pdfPath, 'generated.pdf', (err) => {
              if (err) {
                  console.error(err);
                  res.status(500).json({ message: 'Failed to download PDF' });
              }
              // Delete the generated PDF file
              fs.unlinkSync(pdfPath);
          });
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
//--------------------------------------------------------------------------------------

module.exports = router;
