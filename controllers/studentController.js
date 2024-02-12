const Student = require('../models/studentModel');

//Get all students
const getAllStudents = (async (req, res) => {
    const students = await Student.find();
    if(!students){
        return res.status(400).json({
            message: 'No students found.'
        });
    }
    res.json(students);  
});

//Get one student
const getOneStudent = (async (req, res) => {
    const id = req.params['id'];
    const student = await Student.findById(id)
    if(!student){
        return res.status(400).json({
            message: 'No student found.'
        });
    }
    res.json(student);
});

//Create new student
const createNewStudent = (async (req, res) => {
    const {instituteId,userName,firstName,lastName,email,contact,address,grade} = req.body;
    // Confirm all data fields
    if (!instituteId || !userName || !firstName || !lastName ||!email || !contact || !address || !grade) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    // Create and store new student 
    const studentObject = {instituteId,userName,firstName,lastName,email,contact,address,grade}
    const student = await Student.create(studentObject);
    if (student) { 
        res.status(201).json({ message: `New student created` });
    } else {
        res.status(400).json({ message: 'Invalid data received' });
    }
});

// edit student
const editStudent = (async (req, res) => {
    const id = req.params['id'];
    if (!id) {
        return res.status(400).json({ message: 'Student ID Required' })
    } 
    const {userName,firstName,lastName,email,contact,address,grade} = req.body
    // Confirm data 
    if ( !userName || !firstName || !lastName ||!email || !contact || !address || !grade) {
        return res.status(400).json({ message: 'All fields are required' }) }
    // Does the institute exist to update?
    const student = await Student.findById(id);
    if (!student) {
        return res.status(400).json({ message: 'Student not found' })
    }
    student.userName = userName;
    student.firstName = firstName;
    student.lastName = lastName;
    student.email = email;
    student.contact = contact;
    student.address = address;
    student.grade = grade;
    const editedStudent= await student.save();
    res.json({ message: `${editedStudent.userName} updated` });
});

//delete student
const deleteStudent = (async (req, res) => {
    const id = req.params['id'];
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Student ID Required' })
    }    
    // Does the institute exist to delete?
    const student = await Student.findById(id)
    if (!student) {
        return res.status(400).json({ message: 'Student not found' })
    }
    const deletedStudent = await student.deleteOne()
    const result = `Student with ID ${id} deleted`
    res.json(result)
})

module.exports = {
    getAllStudents,
    getOneStudent,
    createNewStudent,
    editStudent,
    deleteStudent,
    
}