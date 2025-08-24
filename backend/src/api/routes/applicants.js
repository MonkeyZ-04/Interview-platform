const express = require('express');
const router = express.Router();
const ApplicantController = require('../controllers/applicantController');

const applicantController = new ApplicantController();

// Define routes for applicants
router.post('/', applicantController.createApplicant);
router.get('/', applicantController.getAllApplicants);
router.get('/:id', applicantController.getApplicantById);
router.put('/:id', applicantController.updateApplicant);
router.delete('/:id', applicantController.deleteApplicant);

module.exports = router;