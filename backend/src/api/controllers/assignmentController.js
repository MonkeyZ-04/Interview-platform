const Assignment = require('../../models/Assignment');

exports.getMyTableAssignments = async (req, res) => {
  try {
    const interviewerId = req.user.id;
    const assignments = await Assignment.findByInterviewerId(interviewerId);
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.findAll();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { table_number, status } = req.body;
    const updatedAssignment = await Assignment.update(id, { table_number, status });

    if (!updatedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    const io = req.app.get('socketio');
    const fullUpdatedData = await Assignment.findAll(); // ดึงข้อมูลทั้งหมดเพื่อส่งไปอัปเดต Kanban
    io.emit('assignmentUpdated', fullUpdatedData);

    res.status(200).json(updatedAssignment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.shuffleAssignments = async (req, res) => {
  try {
    const { timeslot_id } = req.body;
    if (!timeslot_id) {
      return res.status(400).json({ message: 'Timeslot ID is required' });
    }

    const assignments = await Assignment.shuffleByTimeslot(timeslot_id);

    const io = req.app.get('socketio');
    io.emit('assignmentsShuffled', { timeslot_id });

    res.status(200).json({ message: 'Assignments shuffled successfully', data: assignments });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};