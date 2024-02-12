const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

router.route('/').get(subjectController.getAllSubjects);
router.route('/:id').get(subjectController.getOneSubject);
router.route('/create').post( subjectController.createNewSubject);
router.route('/edit/:id').put( subjectController.editSubject);
router.route('/delete/:id').delete( subjectController.deleteSubject);


module.exports = router;