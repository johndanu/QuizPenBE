const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
    instituteName:{
        type:String,
        required:true,
    },
    instituteAddress:{
        type:String,
        required:true,
    },
    instituteContact:{
        type:Number,
        require:true,
    },   
    
});

module.exports = mongoose.model("Institute",instituteSchema)