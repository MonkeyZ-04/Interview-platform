import React from 'react';
import AdminDashboard from './pages/AdminDashboard';
import InterviewerPage from './pages/InterviewerPage';

function App() {
  // ในระบบจริงจะมี Routing และการเช็ค role
  // นี่คือตัวอย่างเพื่อแสดงผลทั้ง 2 หน้า
  return (
    <div>
      {/* สำหรับ Admin */}
      <AdminDashboard />

      <hr style={{ margin: '50px 0' }} />

      {/* สำหรับ Interviewer */}
      <InterviewerPage />
    </div>
  );
}

export default App;