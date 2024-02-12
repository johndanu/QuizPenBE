const Institute = require('../models/instituteModel');

//Get all institutes
const getAllInstitutes = (async (req, res) => {
    const institutes = await Institute.find();
    if(!institutes){
        return res.status(400).json({
            message: 'No institute found.'
        });
    }
    res.json(institutes);
});

//Get one institutes
const getOneInstitutes = (async (req, res) => {
    const id = req.params['id'];
    const institute = await Institute.findById(id)
    if(!institute){
        return res.status(400).json({
            message: 'No institute found.'
        });
    }
    res.json(institute);
});

//Create new institue
const createNewInstitute = (async (req, res) => {
    const {instituteName,instituteAddress,instituteContact} = req.body;
    // Confirm all data fields
    if (!instituteName || !instituteAddress || !instituteContact) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    // Create and store new institue 
    const instituteObject = {instituteName,instituteAddress,instituteContact}
    const institute = await Institute.create(instituteObject);
    if (institute) { 
        res.status(201).json({ message: `New institute created` });
    } else {
        res.status(400).json({ message: 'Invalid data received' });
    }
});

// edit institute
const editInstitute = (async (req, res) => {
    const {id,instituteName,instituteAddress,instituteContact} = req.body
    // Confirm data 
    if (!id || !instituteName || !instituteAddress || !instituteContact ) {
        return res.status(400).json({ message: 'All fields are required' }) }
    // Does the institute exist to update?
    const institute = await Institute.findById(id);
    if (!institute) {
        return res.status(400).json({ message: 'Institute not found' })
    }
    institute.instituteName = instituteName;
    institute.instituteAddress = instituteAddress;
    institute.instituteContact = instituteContact;
    const editedInstitute= await institute.save();
    res.json({ message: `${editedInstitute.instituteName} updated` });
});

//delete institute
const deleteInstitute = (async (req, res) => {
    const id = req.params['id'];
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Institute ID Required' })
    }    
    // Does the institute exist to delete?
    const institute = await Institute.findById(id)
    if (!institute) {
        return res.status(400).json({ message: 'Institute not found' })
    }
    const deletedInstitute = await institute.deleteOne()
    const result = `Institute with ID ${id} deleted`
    res.json(result)
})

module.exports = {
    getAllInstitutes,
    createNewInstitute,
    editInstitute,
    deleteInstitute,
    getOneInstitutes
}