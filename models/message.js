//Dependencies
const mongoose = require("mongoose");

//Create schema
const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        subject: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model("messages", messageSchema);
