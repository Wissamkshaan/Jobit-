import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import JobDetailsForApplicant from './JobDetailsForApplicant';
import './public /applicant.css';

const JobListForApplicant = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicantInfo, setApplicantInfo] = useState({
    name: '',
    email: '',
    resume: null,
  });

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
    // Fetch jobs when a category is selected
    if (selectedCategoryId !== null) {
      axios.get(`http://localhost:8000/jobs/?category=${selectedCategoryId}`)
        .then(response => {
          console.log('Jobs API response:', response.data);
          setJobs(response.data);
        })
        .catch(error => {
          console.error('Error fetching jobs:', error);
        });
    } else {
      // Clear the jobs when no category is selected
      setJobs([]);
    }
  }, [selectedCategoryId]);

  const handleSearch = () => {
    // Fetch jobs based on the search term
    axios.get(`http://localhost:8000/jobs/?search=${searchTerm}`)
      .then(response => {
        console.log('Jobs API response:', response.data);
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  };

  const handleApply = () => {
    // Check if a job is selected
    if (!selectedJobId) {
      console.error('No job selected for application.');
      return;
    }
  
    // Prepare the form data for the application
    const formData = new FormData();
    formData.append('job', selectedJobId);
    formData.append('applicant', applicantInfo.name); // Change to the appropriate field from applicantInfo
    formData.append('resume', applicantInfo.resume);
  
    // Make the API request to submit the application
    axios.post('http://localhost:8000/applications/', formData)
      .then(response => {
        console.log('Application submitted successfully:', response.data);
  
       
  
        // Clear applicantInfo
        setApplicantInfo({
          name: '',
          email: '',
          resume: null,
        });
  
        // Close the job details modal
        setSelectedJobId(null);
      })
      .catch(error => {
        console.error('Error submitting application:', error);
      });
  };

  const handleCloseDetails = () => {
    setSelectedJobId(null);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  const handleJobClick = (jobId) => {
    setSelectedJobId(jobId);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setApplicantInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setApplicantInfo(prevInfo => ({
      ...prevInfo,
      resume: file,
    }));
  };

  return (
    <div className='ApplicantContainer'>
       <input
      type="text"
      placeholder="Search by title"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className='SearchInput'
      
    />
    
      {/* Category dropdown */}
      <select value={selectedCategoryId} onChange={handleCategoryChange} className='CategoryDropdown'>
        <option value="" disabled>Select a category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <button onClick={handleSearch}>Search</button>

      {/* Render jobs for the selected category */}
      {jobs.map(job => (
        <div key={job.id} className='JobItem'>
          <h3>{job.title}</h3>
          <p>Description: {job.description}</p>
          <button className='ViewDetailsButton' onClick={() => handleJobClick(job.id)}>View Details</button>
        </div>
      ))}

      {/* Render job details for the selected job */}
      {selectedJobId && (
        <JobDetailsForApplicant jobId={selectedJobId} onClose={handleCloseDetails} />
      )}

      {/* Application form */}
      {selectedJobId && (
        <div className='ApplyForm'>
          <h2>Apply for this Job</h2>
          <form>
            <label>Name:</label>
            <input type="text" name="name" value={applicantInfo.name} onChange={handleInputChange} required />

            <label>Email:</label>
            <input type="email" name="email" value={applicantInfo.email} onChange={handleInputChange} required />

            <label>Resume:</label>
            <input type="file" name="resume" onChange={handleFileChange} accept=".pdf,.doc,.docx" required />

            <button type="button" onClick={handleApply}>Apply</button>
            
          </form>
        </div>
      )}
    </div>
  );
};

export default JobListForApplicant;
