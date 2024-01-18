import React, { useState } from 'react';
import axios from 'axios';

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    resume: '',
    employer: '',
    applied_at: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to create a new job
    axios.post('http://localhost:8000/jobs/', formData)
      .then(response => {
        console.log('Created new job:', response.data);
       
      })
      .catch(error => {
        console.error('Error creating new job:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} required />

      <label>Resume URL:</label>
      <input type="text" name="resume" value={formData.resume} onChange={handleChange} required />

      <label>Employer ID:</label>
      <input type="text" name="employer" value={formData.employer} onChange={handleChange} required />

      <label>Applied At:</label>
      <input type="text" name="applied_at" value={formData.applied_at} onChange={handleChange} required />

      <button type="submit">Create Job</button>
    </form>
  );
};

export default JobForm;
