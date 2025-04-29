// src/Complaint.jsx

import React, { useEffect, useState } from 'react';
import './Complaint.css'; // Import the new styles

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const storedComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
    setComplaints(storedComplaints);
  }, []);

  return (
    <div className="complaint-container">
      <h1 className="complaint-heading">Complaint Records</h1>

      {complaints.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        <div className="complaint-list">
          {complaints.map((complaint, idx) => (
            <div key={idx} className="complaint-box">
              <div className="report-header">
                <h3>Complaint {idx + 1}</h3>
                <span className={`status-badge ${complaint.status.toLowerCase()}`}>
                 
                </span>
              </div>

              <div className="complaint-details">
                <div>
                  <strong>Reported By:</strong> {complaint.reportedBy}
                </div>
                <div>
                  <strong>Reported To:</strong> {complaint.reportedTo}
                </div>
                <div>
                  <strong>Status:</strong> 
                  {complaint.status === 'Pending' ? (
                    <span className="status-badge pending">🕒 Pending</span>
                  ) : (
                    <span className="status-badge approved">✅ Approved</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Complaint;
