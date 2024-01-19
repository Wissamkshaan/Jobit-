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
        setFormData({
          title: '',
          resume: '',
          employer: '',
          applied_at: '',
        });
      })
      .catch(error => {
        console.error('Error creating new job:', error);
      });
  };
  const handleUpdate = () => {
    const jobIdToUpdate = 1;  // Replace with the actual job ID

    // Send a PUT request to update the job
    axios.put(`http://localhost:8000/jobs/${jobIdToUpdate}/`, formData)
      .then(response => {
        console.log('Updated job:', response.data);
        
      })
      .catch(error => {
        console.error('Error updating job:', error);
      });
  };

  const handleDelete = () => {
    const jobIdToDelete = 1;  // Replace with the actual job ID

    // Send a DELETE request to delete the job
    axios.delete(`http://localhost:8000/jobs/${jobIdToDelete}/`)
      .then(response => {
        console.log('Deleted job:', response.data);
        
        
      })
      .catch(error => {
        console.error('Error deleting job:', error);
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
      <button type="button" onClick={handleUpdate}>Update Job</button>
      <button type="button" onClick={handleDelete}>Delete Job</button>
    </form>
  );
};

export default JobForm;
