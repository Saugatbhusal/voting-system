const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    position:{type:String, required:true},
    email: { type: String, required: true, unique: true},
    imgPath: { type: String } // Store the path of the uploaded image
});

const User = mongoose.model("User", userSchema);

module.exports = User;
