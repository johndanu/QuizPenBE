const Grade = require('../models/gradeModel');

//Get all grades
const getAllGrades = (async (req, res) => {
    const grades = await Grade.find();
    if(!grades){
        return res.status(400).json({
            message: 'No grades found.'
        });
    }
    res.json(grades);
});

//Get one grade
const getOneGrade = (async (req, res) => {
    const id = req.params['id'];
    const grade = await Grade.findById(id)
    if(!grade){
        return res.status(400).json({
            message: 'No grade found.'
        });
    }
    res.json(grade);
});

//Create new grade
const createNewGrade= (async (req, res) => {
    const {gradeName} = req.body;
    // Confirm all data fields
    if (!gradeName) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    // Create and store new grade 
    const newGradeObject = {gradeName}
    const newGrade = await Grade.create(newGradeObject);
    if (newGrade) { 
        res.status(201).json({ message: `New grade created` });
    } else {
        res.status(400).json({ message: 'Invalid data received' });
    }
});

// edit grade
const editGrade = (async (req, res) => {
    const id = req.params['id'];
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Grade ID Required' })
    }  
    const {gradeName} = req.body
    // Confirm data 
    if (!gradeName) {
        return res.status(400).json({ message: 'All fields are required' }) }
    // Does the grade exist to update?
    const grade = await Grade.findById(id);
    if (!grade) {
        return res.status(400).json({ message: 'Grade not found' })
    }
    grade.gradeName = gradeName;
    const editedGrade= await grade.save();
    res.json({ message: `${editedGrade.gradeName} updated` });
});

//delete grade
const deleteGrade = (async (req, res) => {
    const id = req.params['id'];
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Grade ID Required' })
    }    
    // Does the institute exist to delete?
    const grade = await Grade.findById(id)
    if (!grade) {
        return res.status(400).json({ message: 'Grade not found' })
    }
    const deletedGrade = await grade.deleteOne()
    const result = `Grade with ID ${id} deleted`
    res.json(result)
})

module.exports = {
    getAllGrades,
    getOneGrade,
    createNewGrade,
    editGrade,
    deleteGrade,
}