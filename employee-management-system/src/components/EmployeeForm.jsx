import React, { useState } from 'react';
import './EmployeeForm.css';
import axios from 'axios';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    employee_id: '',
    email: '',
    phone: '',
    department: '',
    date_of_joining: '',
    role: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/employees', formData);
      alert(response.data.message);
      handleReset(); 
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'An error occurred');
    }
  };
  const handleReset = () => {
    setFormData({
      name: '',
      employee_id: '',
      email: '',
      phone: '',
      department: '',
      date_of_joining: '',
      role: ''
    });
    setErrorMessage(''); 
  };
  return (
    <div className="employee-form-container">
      <h2>Employee Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <div>
          <label>Date of Joining:</label>
          <input
            type="date"
            name="date_of_joining"
            value={formData.date_of_joining}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}      
    </div>
  );
};

export default EmployeeForm;
