const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const { protect } = require('../../middleware/auth');

// Middleware 'protect' ควรใช้กับทุก route ที่ต้องการการยืนยันตัวตน
router.get('/', protect, assignmentController.getAllAssignments);
router.get('/my-table', protect, assignmentController.getMyTableAssignments);
router.put('/:id', protect, assignmentController.updateAssignment);
router.post('/shuffle', protect, assignmentController.shuffleAssignments);

module.exports = router;