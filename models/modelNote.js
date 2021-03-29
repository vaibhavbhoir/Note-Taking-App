const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    newNote:{
        type:String,
        required: true
    },
    noteDate:{
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Note',noteSchema);