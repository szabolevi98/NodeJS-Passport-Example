//Dependencies
const mongoose = require("mongoose");

//Create schema
const messageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
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
