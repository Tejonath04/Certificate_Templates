const express = require('express');
const router = express.Router();
const generatePDFModule = require('../TempDesign/inputFiles');
const generatePDF = generatePDFModule.generatePDF;
const upload = generatePDFModule.upload;
const uploadFieldsConfig = generatePDFModule.uploadFieldsConfig;
const InputData = require('../models/TempSchema');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
//app.use(express.json());

//Get all
router.get('/', async (req, res) => {
    const dataa = await InputData.find();
    res.status(200).json(dataa);
});

//Get One by id
router.get('/:id', async (req, res) => {
  try{
    const inputData = await InputData.findById(req.params.id);
    res.json(inputData);
  } catch (error) {
    console.log('Error fetching input data:', error);
    res.status(500).json({ error: 'Failed to fetch input data.' });
  }
});

//post route code here
// router.post('/aa', upload.fields(uploadFieldsConfig), async (req, res) => {
//   const tid = req.body.tid;
//   const clientid = req.body.clientid;
//   const data = req.body;
//   const images = req.files;

//   const imageNamesWithKeys = {};
// for (const [key, imageArray] of Object.entries(images)) {
//     imageNamesWithKeys[key] = imageArray.map(image => `images/${image.originalname}`);
// }

//   const generatePDFModule = require(`../TempDesign/${tid}.js`);
//   const generatePDF = generatePDFModule.generatePDF;

//   const doc = generatePDF(data, images);

//   // Save the input data to MongoDB
//   try {
//       const inputData = new InputData({
//           clientid:clientid,
//           tid: tid,
//           data: data,
//           images: imageNamesWithKeys
//       });
//       await inputData.save();
//       console.log(inputData);
//   } catch (error) {
//       console.error('Error saving input data:', error);
//   }

//   res.setHeader('Content-Disposition', `attachment; filename=${tid}.pdf`);
//   res.setHeader('Content-Type', 'application/pdf');

//   doc.pipe(res);
//   doc.end();
// });

//----------------------------------------------------------------------------------------
router.post('/', upload.fields(uploadFieldsConfig), async (req, res) => {
  const tid = req.body.tid;
  const clientid = req.body.clientid;
  const data = req.body;
  const images = req.files;

  const imageNamesWithKeys = {};
for (const [key, imageArray] of Object.entries(images)) {
    imageNamesWithKeys[key] = imageArray.map(image => `images/${image.originalname}`);
}

  const generatePDFModule = require(`../TempDesign/${tid}.js`);
  const generatePDF = generatePDFModule.generatePDF;

  const doc = generatePDF(data, images);

  // Save the input data to MongoDB
  try {
      const inputData = new InputData({
          clientid:clientid,
          tid: tid,
          data: data,
          images: imageNamesWithKeys
      });
      await inputData.save();
      console.log(inputData);
  } catch (error) {
      console.error('Error saving input data:', error);
  }

  res.setHeader('Content-Disposition', `attachment; filename=${tid}.pdf`);
  res.setHeader('Content-Type', 'application/pdf');

  doc.pipe(res);
  doc.end();

const imageNamesWithKeyss = {};

for (const [key, imageArray] of Object.entries(images)) {
    imageNamesWithKeyss[key] = imageArray.map(image => `images/${image.originalname}`);

    for (const image of imageArray) { // Define 'image' within this loop
        // Save files to the 'uploads' directory
        const destinationPath = path.join(__dirname, '..', 'images', image.originalname);
        fs.writeFileSync(destinationPath, image.buffer);
    }
}

});

//------------------------------------------------------------------------------------------------------------

// Update by id
router.put('/:id', upload.fields(uploadFieldsConfig), async (req, res) => {
  const id = req.params.id;
  const tid = req.body.tid;
  const data = req.body;
  const images = req.files;

  const imageNamesWithKeys = {};
  for (const [key, imageArray] of Object.entries(images)) {
      imageNamesWithKeys[key] = imageArray.map(image => image.originalname);
  }

  const generatePDFModule = require(`../${tid}.js`);
  const generatePDF = generatePDFModule.generatePDF;

  const doc = generatePDF(data, images);

  // Update the input data in MongoDB
  try {
      const updatedData = {
          tid: tid,
          data: data,
          images: imageNamesWithKeys
      };
      const result = await InputData.findOneAndUpdate({ _id: id }, updatedData, { new: true });

      if (!result) {
          res.status(404).json({ error: 'Input data not found.' });
          return;
      }

      console.log('Updated input data:', result);
  } catch (error) {
      console.error('Error updating input data:', error);
      res.status(500).json({ error: 'Failed to update input data.' });
      return;
  }

  res.setHeader('Content-Disposition', `attachment; filename=${tid}.pdf`);
  res.setHeader('Content-Type', 'application/pdf');

  doc.pipe(res);
  doc.end();
});


//Delete by id
router.delete('/:id', async (req, res) => {
  const itemId = req.params.id; // Extract the item ID from the request parameters

  try {
    const deletedData = await InputData.findByIdAndDelete(itemId); // Use findByIdAndDelete to delete by ID
    if (!deletedData) {
      res.status(404).json({ error: 'Input data not found.' });
      return;
    }
    res.json({ message: 'Input data deleted successfully.' });
  } catch (error) {
    console.error('Error deleting input data:', error);
    res.status(500).json({ error: 'Failed to delete input data.' });
  }
});


module.exports = router;