const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.route('/').get(studentController.getAllStudents);
router.route('/:id').get(studentController.getOneStudent);
router.route('/create').post( studentController.createNewStudent);
router.route('/edit/:id').put( studentController.editStudent);
router.route('/delete/:id').delete( studentController.deleteStudent);

module.exports = router;