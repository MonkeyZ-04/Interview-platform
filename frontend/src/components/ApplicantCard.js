import React from 'react';
import './ApplicantCard.css';

function ApplicantCard({ data }) {
  return (
    <div className={`interview-card ${data.status.toLowerCase()}`}>
      <div className="card-header">
        <h3>{data.first_name} {data.last_name}</h3>
        <span className="nickname">({data.nickname})</span>
      </div>
      <div className="card-body">
        <span className={`status-tag ${data.status.toLowerCase()}`}>{data.status}</span>
        <button className="score-button">View & Score</button>
      </div>
    </div>
  );
}

export default ApplicantCard;