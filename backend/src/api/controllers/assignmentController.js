const Assignment = require('../../models/Assignment');

exports.getMyTableAssignments = async (req, res) => {
  try {
    // ในระบบจริง req.user.id จะมาจากการถอดรหัส token ของผู้ใช้ที่ล็อกอิน
    const interviewerId = req.user.id; // สมมติว่า middleware auth ได้ใส่ข้อมูล user ไว้ใน req

    const assignments = await Assignment.findByInterviewerId(interviewerId);

    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};