const express = require('express');
const Event = require('../models/eventsSchema');
const router = express.Router();


// Get all
router.get('/', async (req, res) => {
  const dataa = await Event.find();
  res.status(200).json(dataa);
});

//get by ID
router.get('/:id', async (req, res) => {
  try{
    const inputData = await Event.findById(req.params.id);
    res.json(inputData);
  } catch (error) {
    console.log('Error fetching input data:', error);
    res.status(500).json({ error: 'Failed to fetch input data.' });
  }
});

// post
router.post('/', async (req, res) => {
    try {
      const { clientId, templateId, eventId } = req.body;
      const events = new Event({ clientId, templateId, eventId });
      await events.save();
      //console.log(events);
      res.status(201).json(events);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save event.' });
    }
  });

//put
router.put('/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const { clientId, templateId, updatedData } = req.body;

    // Check if the event with the given ID exists
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    // Update the event fields
    if (clientId) event.clientId = clientId;
    if (templateId) event.templateId = templateId;
    if (updatedData) event.updatedData = updatedData;

    // Save the updated event
    await event.save();

    console.log(event);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event.' });
  }
});


//Delete by id
router.delete('/:id', async (req, res) => {
  const itemId = req.params.id; // Extract the item ID from the request parameters

  try {
    const deletedData = await Event.findByIdAndDelete(itemId); // Use findByIdAndDelete to delete by ID
    if (!deletedData) {
      res.status(404).json({ error: 'Input data not found.' });
      return;
    }
    res.json({ message: 'data deleted successfully.' });
  } catch (error) {
    console.error('Error deleting input data:', error);
    res.status(500).json({ error: 'Failed to delete input data.' });
  }
});

module.exports = router;