const mongoose = require('mongoose');

//poll model
const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    votes: {
        type: Number,
        default: 0
    }
});

const pollSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    options: {
        type: [optionSchema],
    },
    voters: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll;
