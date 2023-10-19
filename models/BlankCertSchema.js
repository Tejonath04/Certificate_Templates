const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
});

const BlankCertSchema = new mongoose.Schema({
  tid: {
    type: String,
    required: true,
  },
  header: {
    type: contentSchema,
    required: true,
  },
  subheader: {
    type: contentSchema,
    required: true,
  },
  text: {
    type: contentSchema,
    required: true,
  },
  BGimg: {
    type: String,
    required: true,
  },
  images: [
    {
      imageName: {
        type: String,
        required: true,
      },
      x: {
        type: Number,
        required: true,
      },
      y: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('BlankCertSchema', BlankCertSchema);

