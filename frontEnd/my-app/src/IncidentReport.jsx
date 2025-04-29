// src/IncidentReport.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IncidentReport.css';

const IncidentReport = () => {
  const [loading, setLoading] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [victimDetails, setVictimDetails] = useState({
    name: '',
    phone: '',
    incidentDetails: '',
    whenHappened: '',
    whereHappened: '',
    evidence: null,
  });

  const [suspectDetails, setSuspectDetails] = useState({
    name: '',
    phone: '',
    socialAccount: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!victimDetails.incidentDetails || !victimDetails.whenHappened || !victimDetails.whereHappened || (!anonymous && (!victimDetails.name || !victimDetails.phone))) {
      alert('Please fill in all required victim details.');
      setLoading(false);
      return;
    }

    if (!anonymous && victimDetails.phone.length !== 10) {
      alert('Phone number must be 10 digits.');
      setLoading(false);
      return;
    }

    if (!suspectDetails.phone && !suspectDetails.socialAccount) {
      alert('Please provide either a phone number or a social media account for the suspect.');
      setLoading(false);
      return;
    }

    const complaint = {
      reportedBy: anonymous ? 'Anonymous' : victimDetails.name,
      reportedTo: suspectDetails.name,
      status: 'Pending',
    };

    // Fetch existing complaints from localStorage
    const existingComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
    existingComplaints.push(complaint);
    localStorage.setItem('complaints', JSON.stringify(existingComplaints));

    setTimeout(() => {
      setLoading(false);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate('/'); // Go back to homepage
      }, 4000);
    }, 2000);
  };

  const toggleAnonymous = () => {
    setAnonymous(!anonymous);
    if (!anonymous) {
      setVictimDetails((prev) => ({
        ...prev,
        name: '',
        phone: '',
      }));
    }
  };

  const handleVictimChange = (e) => {
    const { name, value } = e.target;
    setVictimDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSuspectChange = (e) => {
    const { name, value } = e.target;
    setSuspectDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVictimDetails((prev) => ({
      ...prev,
      evidence: file,
    }));
  };

  return (
    <div className="incident-container">
      <h1 className="incident-heading">Incident Report</h1>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Submitting your report...</p>
        </div>
      ) : (
        <div className="form-windows">
          <form className="victim-form" onSubmit={handleSubmit}>
            <h2>Victim Details</h2>
            <label>
              <input
                type="checkbox"
                checked={anonymous}
                onChange={toggleAnonymous}
              />
              Report Anonymously
            </label>

            {!anonymous && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={victimDetails.name}
                  onChange={handleVictimChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={victimDetails.phone}
                  onChange={handleVictimChange}
                  pattern="\d{10}"
                  maxLength="10"
                  required
                />
              </>
            )}

            <textarea
              name="incidentDetails"
              placeholder="Incident Details"
              value={victimDetails.incidentDetails}
              onChange={handleVictimChange}
              required
            />
            <input
              type="text"
              name="whenHappened"
              placeholder="When Happened"
              value={victimDetails.whenHappened}
              onChange={handleVictimChange}
              required
            />
            <input
              type="text"
              name="whereHappened"
              placeholder="Where Happened"
              value={victimDetails.whereHappened}
              onChange={handleVictimChange}
              required
            />

            <label>Upload Evidence:</label>
            <input
              type="file"
              accept="image/*,audio/*,video/*,.txt,.pdf"
              onChange={handleFileChange}
            />

            <button type="submit" className="submit-button">
              Submit Report
            </button>
          </form>

          <form className="suspect-form">
            <h2>Suspect Details</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={suspectDetails.name}
              onChange={handleSuspectChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={suspectDetails.phone}
              onChange={handleSuspectChange}
            />
            <input
              type="text"
              name="socialAccount"
              placeholder="Social Account"
              value={suspectDetails.socialAccount}
              onChange={handleSuspectChange}
            />
          </form>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon">✅</div>
            <h2>Incident Reported Successfully!</h2>
            <p>Warning has been sent to the suspect.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentReport;
