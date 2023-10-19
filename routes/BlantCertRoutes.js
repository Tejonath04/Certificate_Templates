
const express = require('express');
const router = express.Router();
const BlankCertSchema = require('../models/BlankCertSchema'); // Importing your Mongoose model

router.post('/', async (req, res) => {
  try {
    const {
      tid,
      header,
      subheader,
      text,
      BGimg,
      images
    } = req.body;

    // Creating a new BlankCertSchema instance
    const newCertificate = new BlankCertSchema({
      tid,
      header,
      subheader,
      text,
      BGimg,
      images
    });

    // Saving the new certificate to the database
    await newCertificate.save();

    // Sending a success response
    res.status(201).json({ message: 'Template data saved successfully', certificate: newCertificate });
  } catch (error) {
    // Handling any errors that occur during the process
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT route to update data by ID
router.put('/:id', async (req, res) => {
  try {
    const { tid, header, subheader, text, BGimg, images } = req.body;
    const updatedCertificate = await BlankCertSchema.findByIdAndUpdate(req.params.id, {
      tid,
      header,
      subheader,
      text,
      BGimg,
      images
    }, { new: true });
    res.status(200).json({ message: 'Template data updated successfully', certificate: updatedCertificate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PATCH route to partially update data by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedCertificate = await BlankCertSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Template data partially updated successfully', certificate: updatedCertificate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET route to retrieve data by ID
router.get('/:id', async (req, res) => {
  try {
    const certificate = await BlankCertSchema.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: 'Template data not found' });
    }
    res.status(200).json({ certificate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route to delete data by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCertificate = await BlankCertSchema.findByIdAndDelete(req.params.id);
    if (!deletedCertificate) {
      return res.status(404).json({ message: 'Template data not found' });
    }
    res.status(200).json({ message: 'Template data deleted successfully', certificate: deletedCertificate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET route to retrieve all data
router.get('/', async (req, res) => {
  try {
    const certificates = await BlankCertSchema.find();
    res.status(200).json({ certificates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
