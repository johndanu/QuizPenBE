const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.route('/:examId').get(questionController.getAllQuestions);
router.route('/:examId/:id').get(questionController.getOneQuestion);
router.route('/:examId/create').post( questionController.createNewQuestion);
router.route('/edit/:examId/:id').put( questionController.editQuestion);
router.route('/delete/:examId/:id').delete( questionController.deleteQuestion);

module.exports = router;