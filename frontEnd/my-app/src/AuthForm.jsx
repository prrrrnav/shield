import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    role: 'victim',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const url = `http://localhost:5000/api/auth/${mode}`;
    const data =
      mode === 'login'
        ? { phone: formData.phone, password: formData.password }
        : formData;

    try {
      const res = await axios.post(url, data);
      setMessage(`${mode === 'login' ? 'Login' : 'Registration'} successful!`);
      if (mode === 'login' && res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div style={styles.container}>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>

      {mode === 'register' && (
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />
      )}

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        style={styles.input}
      />

      {mode === 'register' && (
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="victim">Victim</option>
          <option value="offender">Offender</option>
          <option value="admin">Admin</option>
        </select>
      )}

      <button onClick={handleSubmit} style={styles.button}>
        {mode === 'login' ? 'Login' : 'Register'}
      </button>

      <p style={{ marginTop: '10px' }}>{message}</p>

      <p>
        {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        >
          {mode === 'login' ? 'Register here' : 'Login here'}
        </span>
      </p>
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    margin: '100px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    textAlign: 'center',
  },
  input: {
    display: 'block',
    margin: '10px auto',
    padding: '10px',
    width: '90%',
  },
  button: {
    padding: '10px 20px',
    marginTop: '10px',
  },
};

export default AuthForm;
