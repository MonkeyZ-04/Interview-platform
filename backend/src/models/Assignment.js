const db = require('../config/db');

class Assignment {
  static async findByInterviewerId(interviewerId) {
    const query = `
      SELECT
        ia.id,
        a.first_name,
        a.last_name,
        a.nickname,
        ia.status,
        ia.table_number
      FROM InterviewAssignments ia
      JOIN Applicants a ON ia.applicant_id = a.id
      WHERE ia.interviewer_id = $1
      ORDER BY ia.status DESC, a.first_name ASC;
    `;
    const { rows } = await db.query(query, [interviewerId]);
    return rows;
  }

  static async findAll() {
    const query = `
      SELECT
        ia.id,
        a.first_name || ' ' || a.last_name as applicant_name,
        ia.status,
        ia.table_number
      FROM InterviewAssignments ia
      JOIN Applicants a ON ia.applicant_id = a.id
      ORDER BY ia.table_number, a.first_name;
    `;
    const { rows } = await db.query(query);
    return rows;
  }

  static async update(id, { table_number, status }) {
    const fields = [];
    const values = [];
    let queryIndex = 1;

    if (table_number !== undefined) {
      fields.push(`table_number = $${queryIndex++}`);
      values.push(table_number);
    }
    if (status !== undefined) {
      fields.push(`status = $${queryIndex++}`);
      values.push(status);
    }

    if (fields.length === 0) {
      // ถ้าไม่มีอะไรให้อัปเดต ก็ดึงข้อมูลปัจจุบันกลับไป
      const { rows } = await db.query('SELECT * FROM InterviewAssignments WHERE id = $1', [id]);
      return rows[0];
    }

    values.push(id);
    const query = `
      UPDATE InterviewAssignments
      SET ${fields.join(', ')}
      WHERE id = $${queryIndex}
      RETURNING *;
    `;

    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async shuffleByTimeslot(timeslotId) {
    const { rows: assignments } = await db.query(
      'SELECT id FROM InterviewAssignments WHERE timeslot_id = $1', [timeslotId]
    );

    if (assignments.length === 0) {
        return [];
    }

    const totalTables = 8;
    let tableAssignments = [];
    for (let i = 0; i < assignments.length; i++) {
      tableAssignments.push((i % totalTables) + 1);
    }

    for (let i = tableAssignments.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tableAssignments[i], tableAssignments[j]] = [tableAssignments[j], tableAssignments[i]];
    }

    const updatedAssignments = [];
    for (let i = 0; i < assignments.length; i++) {
      const assignmentId = assignments[i].id;
      const newTable = tableAssignments[i];
      const { rows } = await db.query(
        'UPDATE InterviewAssignments SET table_number = $1 WHERE id = $2 RETURNING *',
        [newTable, assignmentId]
      );
      updatedAssignments.push(rows[0]);
    }
    return updatedAssignments;
  }
}

module.exports = Assignment;