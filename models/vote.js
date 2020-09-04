const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    phoneid: {
        type: String,
        required: true
    },
    studentid: {
        type: String,
        required: true
    },
    studentname: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});

const student = mongoose.model('vote', voteSchema);
module.exports = student;