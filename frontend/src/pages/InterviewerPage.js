import React, { useState, useEffect } from 'react';
import { getMyTableAssignments } from '../services/apiService';
import ApplicantCard from '../components/ApplicantCard';

function InterviewerPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await getMyTableAssignments();
        setAssignments(response.data);
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
        // อาจจะแสดงข้อความ error บนหน้าจอ
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) {
    return <div>Loading your table...</div>;
  }

  return (
    <div>
      <h1>My Interview Table</h1>
      <div className="applicant-grid">
        {assignments.length > 0 ? (
          assignments.map(assignment => (
            <ApplicantCard key={assignment.id} data={assignment} />
          ))
        ) : (
          <p>No applicants assigned to your table yet.</p>
        )}
      </div>
    </div>
  );
}

export default InterviewerPage;