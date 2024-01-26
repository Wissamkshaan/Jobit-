import React, { useState, useEffect } from 'react';
import axios from 'axios';


const JobForm = ({ onCreate, onUpdate, jobIdToUpdate, onSubmit, jobs, setJobs, userType }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    // employer: '',
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
        // employer: selectedJob.employer,
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
    console.log('Form State:', formData);
  
    const apiEndpoint = jobIdToUpdate ? `http://localhost:8000/jobs/${jobIdToUpdate}/` : 'http://localhost:8000/jobs/';
    const httpMethod = jobIdToUpdate ? 'put' : 'post';
  
    const payload = {
      title: formData.title,
      description: formData.description,
      // employer: userType === 'employer' ? parseInt(formData.employer) : null,
      created_at: formData.created_at + ":00Z",
      category: parseInt(formData.category),
    };
  
    // if (userType === 'employer' && payload.employer === null) {
    //   console.error('Employer ID is required for employer type.');
    //   return;
    // }
  
    axios[httpMethod](apiEndpoint, payload)
      .then(response => {
        console.log('Job action successful:', response.data);
  
        if (jobIdToUpdate) {
          
            // If updating, update the state directly
            const updatedJobs = jobs.map(job => (job.id === jobIdToUpdate ? response.data : job));
            setJobs(updatedJobs);
            console.log('Updated Jobs:', updatedJobs);
          } else {
            // If creating, reset the form data and call onCreate
            setFormData({
              title: '',
              description: '',
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
  const handleUpdate = () => {
    // console.log('Updating job with details:', formData);
    onUpdate({
      title: formData.title,
      description: formData.description,
      created_at: formData.created_at,
      category: formData.category,
    });

    setFormData({
      title: '',
      description: '',
      
      created_at: '',
      category: null,
     
    });
  };

  
  

  return (
    
    <form onSubmit={handleSubmit} className="JobForm">
   
      <label>Title:</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} required />

      <label>Description:</label>
      <input type="text" name="description" value={formData.description} onChange={handleChange} required />

      

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


      
</form>

  );
};

export default JobForm;