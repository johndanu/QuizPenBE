const Question = require('../models/questionModel');

//Get all questions
const getAllQuestions = (async (req, res) => {
    const examId = req.params.examId;
    if (!examId) {
        return res.status(400).json({ message: 'Exam Id Required' }) }
    const questions = await Question.find({examId});
    if(!questions){
        return res.status(400).json({
            message: 'No questions found.'
        });
    }
    res.json(questions);  
});

//Get one question
const getOneQuestion = async (req, res) => {
    const examId = req.params.examId;
    const questionId = req.params.id;

    if (!examId || !questionId) {
        return res.status(400).json({ message: 'Exam ID and Question ID are required' });
    }

    const question = await Question.findOne({ examId: examId, _id: questionId });

    if (!question) {
        return res.status(404).json({ message: 'Question not found for this exam' });
    }

    res.json(question);
};


//Create new question
const createNewQuestion= (async (req, res) => {
   
    const {examId,questionText,options,correctOptionIndex} = req.body;
    // Confirm all data fields
    if (!examId || !questionText || !options || correctOptionIndex === undefined) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    // Create and store new grade 
    const newQuestionObject = {examId,questionText,options,correctOptionIndex}
    const newQuestion = await Question.create(newQuestionObject);
    if (newQuestion) { 
        res.status(201).json({ message: `New Question created` });
    } else {
        res.status(400).json({ message: 'Invalid data received' });
    }
});

// edit question
const editQuestion = (async (req, res) => {
    const examId = req.params.examId;
    const questionId = req.params.id;
    if (!examId || !questionId) {
        return res.status(400).json({ message: 'Exam ID and Question ID are required' });
    }
    const {questionText,options,correctOptionIndex} = req.body
    // Confirm data 
    // if (! examId || !questionText || !options || !correctOptionIndex) {
    //     return res.status(400).json({ message: 'All fields are required' }) }
    // Does the question exist to update?
    const question = await Question.findOne({ examId: examId, _id: questionId });
    if (!question) {
        return res.status(400).json({ message: 'Question not found' })
    }
    question.questionText = questionText;
    question.options = options;
    question.correctOptionIndex = correctOptionIndex;   
    const editedQuestion= await question.save();
    res.json({ message: ` Question ID ${editedQuestion.id} updated` });
});

//delete question
const deleteQuestion = (async (req, res) => {
    const examId = req.params.examId;
    const questionId = req.params.id;

    if (!examId || !questionId) {
        return res.status(400).json({ message: 'Exam ID and Question ID are required' });
    }
    const question = await Question.findOne({ examId: examId, _id: questionId });
    if (!question){
        return res.status(400).json({ message: 'Question Not Found' });
    }
    const deletedQuestion = await question.deleteOne();
    const result = `Question ${deletedQuestion} with ID ${questionId} deleted`
    res.json(result)
})

module.exports = {
    getAllQuestions,
    getOneQuestion,
    createNewQuestion,
    editQuestion,
    deleteQuestion,
}