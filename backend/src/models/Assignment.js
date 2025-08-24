// สมมติว่าไฟล์ db.js ใน config มีการตั้งค่าการเชื่อมต่อ PostgreSQL ไว้แล้ว
const db = require('../config/db');

class Assignment {
  static async findByInterviewerId(interviewerId) {
    const query = `
      SELECT
        ia.id,
        a.first_name,
        a.last_name,
        a.nickname,
        ia.status
      FROM InterviewAssignments ia
      JOIN Applicants a ON ia.applicant_id = a.id
      WHERE ia.interviewer_id = $1
      ORDER BY ia.status DESC, a.first_name ASC;
    `;
    const { rows } = await db.query(query, [interviewerId]);
    return rows;
  }
}

module.exports = Assignment;