const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Username: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    AccessToken: {
        type: String,
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
