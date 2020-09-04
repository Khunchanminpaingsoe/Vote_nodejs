const mongoose = require('mongoose');

const studentScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    section: {
        type: String,
        required: true
    },
    rollno: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: true
    }

});

const student = mongoose.model('studentInformation',studentScheme);
module.exports = student;