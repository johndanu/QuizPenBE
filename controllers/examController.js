const Exam = require('../models/examModel');

//Get all exams
const getAllExams = (async (req, res) => {
    const exams = await Exam.find();
    if(!exams){
        return res.status(400).json({
            message: 'No exams found.'
        });
    }
    res.json(exams);  
});

//Get one exam
const getOneExam = (async (req, res) => {
    const id = req.params['id'];
    const exam = await Exam.findById(id)
    if(!exam){
        return res.status(400).json({
            message: 'No exam found.'
        });
    }
    res.json(exam);
});

//Create new exam
const createNewExam= (async (req, res) => {    
    const {examTitle,subject,examType,numOfQuestions,numOfAnswers} = req.body;
    // Confirm all data fields
    if (!examTitle || !subject || !examType ||!numOfQuestions ||!numOfAnswers) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    // Create and store new grade 
    const newExamObject = {examTitle,subject,examType,numOfQuestions,numOfAnswers}
    const newExam = await Exam.create(newExamObject);
    if (newExam) { 
        res.status(201).json({ message: `New Exam created` });
    } else {
        res.status(400).json({ message: 'Invalid data received' });
    }
});

// edit exam
const editExam = (async (req, res) => {
    const id = req.params['id'];
    if (!id) {
        return res.status(400).json({ message: 'Exam ID Required' })
    }
    const {examTitle,subject,examType} = req.body
    // Confirm data 
    if (!examTitle || !subject || !examType) {
        return res.status(400).json({ message: 'All fields are required' }) }
    // Does the exam exist to update?
    const exam = await Exam.findById(id);
    if (!exam) {
        return res.status(400).json({ message: 'Exam not found' })
    }
    exam.examTitle = examTitle;
    exam.subject = subject;
    exam.examType = examType;
    
    const editedExam= await exam.save();
    res.json({ message: `${editedExam.examTitle} updated` });
});

//delete exam
const deleteExam = (async (req, res) => {
    const id = req.params['id'];
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Exam ID Required' })
    }    
    // Does the institute exist to delete?
    const exam = await Exam.findById(id)
    if (!exam) {
        return res.status(400).json({ message: 'Exam not found' })
    }
    const deletedExam = await exam.deleteOne()
    const result = `Exam with ID ${id} deleted`
    res.json(result)
})

module.exports = {
    getAllExams,
    getOneExam,
    createNewExam,
    editExam,
    deleteExam,
}