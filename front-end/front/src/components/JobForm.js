import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobForm = ({ onCreate, onUpdate, jobIdToUpdate, onDelete, onSubmit, jobs }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    employer: '',
    created_at: '',
    category: null,
  });

  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);


  useEffect(() => {
    if (jobIdToUpdate && jobs) {
      const selectedJob = jobs.find(job => job.id === jobIdToUpdate);
      setFormData({
        title: selectedJob.title,
        description: selectedJob.description,
        employer: selectedJob.employer,
        created_at: selectedJob.created_at,
        category: selectedJob.category,
      });
    }
  }, [jobIdToUpdate, jobs]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const apiEndpoint = jobIdToUpdate ? `http://localhost:8000/jobs/${jobIdToUpdate}/` : 'http://localhost:8000/jobs/';
    const httpMethod = jobIdToUpdate ? 'put' : 'post';

    const payload = {
      title: formData.title,
      description: formData.description,
      employer: parseInt(formData.employer),
      created_at: formData.created_at + ":00Z",
      category: parseInt(formData.category),
    };

    axios[httpMethod](apiEndpoint, payload)
      .then(response => {
        console.log('Job action successful:', response.data);

        if (jobIdToUpdate) {
          onUpdate(response.data);
         
        } else {
          setFormData({ // Reset the form data after update
            title: '',
            description: '',
            employer: '',
            created_at: '',
            category: null,
          });
          onCreate();
          onSubmit();
        }
      })
      .catch(error => {
        console.error('Job action failed:', error);
      });
  };

  //this function will be called only when I click update button and same with delete function 
const handleUpdate = () => {
    onUpdate();
  };

  const handleDelete = () => {
   
    const confirmDelete = window.confirm('Are you sure you want to delete this job?');
    if (confirmDelete) {
      onDelete();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <label>Title:</label>
    <input type="text" name="title" value={formData.title} onChange={handleChange} required />

    <label>Description:</label>
    <input type="text" name="description" value={formData.description} onChange={handleChange} required />

    <label>Employer ID:</label>
    <input type="text" name="employer" value={formData.employer} onChange={handleChange} required />

    <label>Created At:</label>
    <input type="datetime-local" name="created_at" value={formData.created_at} onChange={handleChange} required />

    <label>Category:</label>
    <select name="category" value={formData.category} onChange={handleChange} required>
      <option value="" disabled>Select a category</option>
      {categories.map(category => (
        <option key={category.id} value={category.id}>{category.name}</option>
      ))}
    </select>

    <button type="submit">{jobIdToUpdate ? 'Update Job' : 'Create Job'}</button>
      {jobIdToUpdate && <button type="button" onClick={onDelete}>Delete Job</button>}
  </form>
);
};

export default JobForm;
