const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const { protect } = require('../../middleware/auth'); // Middleware ตรวจสอบว่าล็อกอินหรือยัง

// GET /api/assignments/my-table
router.get('/my-table', protect, assignmentController.getMyTableAssignments);

module.exports = router;