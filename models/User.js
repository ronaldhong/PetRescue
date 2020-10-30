const mongoose = require("mongoose")


// type User{
//     _id: ID
//     name: String
//     email: String
//     picture: String

// }

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    picture: String

})

module.exports = mongoose.model("User", UserSchema)