const mongoose = require("mongoose");

const eventsSchema = mongoose.Schema(
  {
    clientId: String,
    templateId: String,
    eventId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Events', eventsSchema);
