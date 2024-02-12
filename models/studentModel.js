const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    instituteId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Institute',
        required: true
    },
    userName:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contact:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    grade:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Student",studentSchema)