const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    examTitle:{
        type:String,
        required:true,
    },
    examType:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true
    },
    numOfQuestions:{
        type:Number,
        required:true
    },
    numOfAnswers:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model("Exam",examSchema)