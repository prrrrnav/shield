import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SuspectForm.css';

const SuspectForm = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    adhaar: '',
    explanation: '',
    digitalSignature: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      digitalSignature: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.adhaar ||
      !formData.explanation ||
      !formData.digitalSignature
    ) {
      alert('Please fill in all fields and upload digital signature.');
      return;
    }

    if (formData.phone.length !== 10) {
      alert('Phone number must be exactly 10 digits.');
      return;
    }

    if (formData.adhaar.length !== 12) {
      alert('Aadhaar number must be exactly 12 digits.');
      return;
    }

    
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate('/');  
      }, 3000);
    }, 2000);
  };

  return (
    <div className="suspect-container">
      <h1 className="suspect-heading">Suspect Form</h1>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Collecting information...</p>
        </div>
      ) : (
        <form className="suspect-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="\d{10}"
            maxLength="10"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="adhaar"
            placeholder="Aadhaar Number"
            value={formData.adhaar}
            onChange={handleChange}
            required
            pattern="\d{12}"
            maxLength="12"
          />
          <textarea
            name="explanation"
            placeholder="Explain the Assurance"
            value={formData.explanation}
            onChange={handleChange}
            required
          ></textarea>

          <label>Upload Digital Signature:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon">✅</div>
            <h2>Information Collected!</h2>
            <p>Thank you for submitting.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuspectForm;
