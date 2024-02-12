const mongoose = require('mongoose');

const gardeSchema = new mongoose.Schema({
    gradeName:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("Grade",gardeSchema)