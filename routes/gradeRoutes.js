const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');

router.route('/').get(gradeController.getAllGrades);
router.route('/:id').get(gradeController.getOneGrade);
router.route('/create').post( gradeController.createNewGrade);
router.route('/edit/:id').put( gradeController.editGrade);
router.route('/delete/:id').delete( gradeController.deleteGrade);

module.exports = router;