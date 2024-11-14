// src/components/CandidateForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidateForm = ({ candidateToEdit, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    aadhar: '',
    qualification: '',
    address: '',
    details: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (candidateToEdit) {
      setFormData({
        name: candidateToEdit.name,
        email: candidateToEdit.email,
        aadhar: candidateToEdit.aadhar,
        qualification: candidateToEdit.qualification,
        address: candidateToEdit.address,
        details: candidateToEdit.details
      });
    }
  }, [candidateToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.aadhar || !formData.qualification || !formData.address || !formData.details) {
      setError('All fields are required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }
    if (/^\d*$/.test(formData.aadhar)) {
      setError("Aadhar should contain only numbers");
      return;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form Data:', formData);

    if (!validateForm()) {
      return;
    }

    try {
      let response;
      if (candidateToEdit) {
        // If editing, send PUT request
        response = await axios.put(`http://localhost:8080/api/candidates/${candidateToEdit.id}`, formData);
      } else {
        // If creating, send POST request
        response = await axios.post('http://localhost:8080/api/candidates', formData);
      }
      onSave(response.data); 
      setFormData({
        name: '',
        email: '',
        aadhar: '',
        qualification: '',
        address: '',
        details: ''
      });
    } catch (error) {
      console.error('Error saving candidate:', error);
    }
  };

  return (
    <div>
      <h3>{candidateToEdit ? 'Edit Candidate' : 'Add New Candidate'}</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit} >

      <div>
      <label>Name </label>
        <input
        
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          style={{ padding: '8px', fontSize: '14px' }}
        />
         </div>

         <div>
         <label>Email </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          style={{ padding: '8px', fontSize: '14px' }}
        />
        </div>

        <div>
        <label>Aadhar Number </label>
        <input
          type="text"
          name="aadhar"
          value={formData.aadhar}
          onChange={handleChange}
          placeholder="Aadhar Number"
           style={{ padding: '8px', fontSize: '14px' }}
        />
        </div>
        

        <div>
        <label>Qualification </label>
        <select
           
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          
        >
          <option value="">Select Qualification</option>
          <option value="Bachelors">Bachelors</option>
          <option value="Masters">Masters</option>
          <option value="PhD">PhD</option>
        </select>
        </div>

        <div>
        <label>Address </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          style={{ padding: '8px', fontSize: '14px', height: '60px' }}
        />
        </div>
        
        <div>
        <label>Details </label>
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Details"
          style={{ padding: '8px', fontSize: '14px', height: '60px' }}
        />
        </div>

        <div>
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
          {candidateToEdit ? 'Update' : 'Submit'}
        </button>
        </div>
      </form>
    </div>
  );
};

export default CandidateForm;
