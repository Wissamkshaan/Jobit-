import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateJobForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get job ID from the URL params

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    employer: '',
    created_at: '',
    category: null,
  });

  useEffect(() => {
    // Fetch categories
    axios.get('http://localhost:8000/categories/')
      .then(response => {
        console.log('Fetched Categories:', response.data);
        // Set categories in state
        setCategories(response.data);
  
        // Fetch the job details based on the ID
        axios.get(`http://localhost:8000/jobs/${id}`)
          .then(response => {
            // Set form data with the fetched job details
            setFormData(response.data);
          })
          .catch(error => {
            console.error('Error fetching job details:', error);
            // Handle error or navigate back to the job list
            navigate('/employer');
          });
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ensure formData is initialized before accessing properties
    if (!formData) {
      console.error('Form data is not initialized');
      return;
    }

    // Send a PUT request to update the job
    axios.put(`http://localhost:8000/jobs/${id}/`, formData)
      .then(response => {
        console.log('Job updated successfully:', response.data);
        // Navigate back to the job list
        navigate('/employer');
      })
      .catch(error => {
        console.error('Error updating job:', error);
        
      });
  };

  return (
    <div>
      <h2>Update Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={formData?.title || ''} onChange={handleChange} required />

        <label>Description:</label>
        <input type="text" name="description" value={formData?.description || ''} onChange={handleChange} required />

        {/* <label>Employer ID:</label>
        <input type="text" name="employer" value={formData?.employer || ''} onChange={handleChange} required /> */}

        <label>Created At:</label>
        <input type="datetime-local" name="created_at" value={formData.created_at.slice(0, -1)} onChange={handleChange} required />
        
        
        <label>Category:</label>
        <select name="category" value={formData?.category || ''} onChange={handleChange} required>
          <option value="" disabled>Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        
        <button type="submit">Update Job</button>
      </form>
    </div>
  );
};

export default UpdateJobForm;
