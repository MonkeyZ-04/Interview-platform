import React, { useState, useEffect } from 'react';
import { getMyTableAssignments } from '../services/apiService';
import ApplicantCard from '../components/ApplicantCard';
import io from 'socket.io-client';
import './InterviewerPage.css';

const socket = io("http://localhost:3001");

function InterviewerPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableNumber, setTableNumber] = useState(null);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await getMyTableAssignments();
      setAssignments(response.data);
      if (response.data.length > 0) {
        setTableNumber(response.data[0].table_number);
      }
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();

    const handleUpdate = () => {
        console.log("Update received, refreshing data for interviewer...");
        fetchAssignments();
    };

    socket.on('assignmentUpdated', handleUpdate);
    socket.on('assignmentsShuffled', handleUpdate);

    return () => {
      socket.off('assignmentUpdated', handleUpdate);
      socket.off('assignmentsShuffled', handleUpdate);
    };
  }, []);

  if (loading) {
    return <div className="loading">Loading Your Interview Table...</div>;
  }

  return (
    <div className="interviewer-page">
      <h1>
        {tableNumber ? `Interview Table ${tableNumber}` : "My Interview Table"}
      </h1>
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