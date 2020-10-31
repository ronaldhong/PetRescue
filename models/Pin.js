const mongoose = require("mongoose")

// type Pin{
//     _id: ID
//     createdAt: String
//     title: String
//     content: String
//     image: String
//     lat: Float
//     long: Float
//     author: User
//     comments: [Comment]
// }

const PinSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    lat: Number,
    long: Number,
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    comments: [
        {
            text: String,
            createdAt: {type: Date, default: Date.now},
            author: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
        }
    ]
}, {timestamps:true})

module.exports = mongoose.model("Pin", PinSchema)