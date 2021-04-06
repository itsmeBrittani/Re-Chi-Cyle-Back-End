const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {type: String, required: true},
    location: {type: String, required: true},
    date: {type: String, required: true},
    startTime: {type: String, required: true},
    endTime: {type: String, required: true},
    description: {type: String, default: ''}
},
{ timestamps: true });

module.exports = mongoose.model('Event', eventSchema)