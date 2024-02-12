const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.route('/').get(examController.getAllExams);
router.route('/:id').get(examController.getOneExam);
router.route('/create').post( examController.createNewExam);
router.route('/edit/:id').put( examController.editExam);
router.route('/delete/:id').delete( examController.deleteExam);


module.exports = router;