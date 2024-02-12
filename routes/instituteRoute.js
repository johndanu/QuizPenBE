const express = require('express');
const router = express.Router();
const instituteController = require('../controllers/instituteController');

router.route('/').get(instituteController.getAllInstitutes);
router.route('/:id').get(instituteController.getOneInstitutes);
router.route('/create').post( instituteController.createNewInstitute);
router.route('/edit').put( instituteController.editInstitute);
router.route('/delete/:id').delete( instituteController.deleteInstitute);

module.exports = router;