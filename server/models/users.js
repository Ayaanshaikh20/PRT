const mongoose = require('mongoose');

// logged in users poll
const usersSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", usersSchema);
module.exports = User;