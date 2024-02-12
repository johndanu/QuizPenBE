const Subject = require('../models/subjectModel');

//Get all subjects
const getAllSubjects = (async (req, res) => {
    const subjects = await Subject.find();
    if(!subjects){
        return res.status(400).json({
            message: 'No subjects found.'
        });
    }
    res.json(subjects);  
});

//Get one subject
const getOneSubject = (async (req, res) => {
    const id = req.params['id'];
    const subject = await Subject.findById(id)
    if(!subject){
        return res.status(400).json({
            message: 'No subject found.'
        });
    }
    res.json(subject);
});

//Create new subject
const createNewSubject= (async (req, res) => {
    const {subjectName} = req.body;
    // Confirm all data fields
    if (!subjectName) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    // Create and store new grade 
    const newSubjectObject = {subjectName}
    const newSubject = await Subject.create(newSubjectObject);
    if (newSubject) { 
        res.status(201).json({ message: `New Subject created` });
    } else {
        res.status(400).json({ message: 'Invalid data received' });
    }
});

// edit subject
const editSubject = (async (req, res) => {
    const id = req.params['id'];
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Subject ID Required' })
    }
    const {subjectName} = req.body
    // Confirm data 
    if (!subjectName) {
        return res.status(400).json({ message: 'All fields are required' }) }
    // Does the subject exist to update?
    const subject = await Subject.findById(id);
    if (!subject) {
        return res.status(400).json({ message: 'Subject not found' })
    }
    subject.subjectName = subjectName;
   
    const editedSubject= await subject.save();
    res.json({ message: `${editedSubject.subjectName} updated` });
});

//delete subject
const deleteSubject = (async (req, res) => {
    const id = req.params['id'];
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Subject ID Required' })
    }    
    // Does the institute exist to delete?
    const subject = await Subject.findById(id)
    if (!subject) {
        return res.status(400).json({ message: 'Subject not found' })
    }
    const deletedSubject = await subject.deleteOne()
    const result = `Subject with ID ${id} deleted`
    res.json(result)
})

module.exports = {
    getAllSubjects,
    getOneSubject,
    createNewSubject,
    editSubject,
    deleteSubject,
}