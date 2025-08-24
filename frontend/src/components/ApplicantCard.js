import React from 'react';

// ใช้ CSS Modules เพื่อไม่ให้ style ชนกัน
import styles from './ApplicantCard.module.css';

function ApplicantCard({ data }) {
  // สร้าง class แบบ dynamic ตาม status
  const statusClass = data.status === 'Arrived' ? styles.arrived : styles.scheduled;

  return (
    <div className={`${styles.card} ${statusClass}`}>
      <div className={styles.header}>
        <h3>{data.first_name} {data.last_name}</h3>
        <span className={styles.nickname}>({data.nickname})</span>
      </div>
      <div className={styles.footer}>
        <span className={styles.status}>{data.status}</span>
        <button className={styles.button}>Score</button>
      </div>
    </div>
  );
}

export default ApplicantCard;