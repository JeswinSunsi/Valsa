// Our Database Schema

const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  id: String,
  url: {type: String, required: true},
});

module.exports = mongoose.model('Url', urlSchema);

