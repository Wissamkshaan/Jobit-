import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import JobDetailsForApplicant from './JobDetailsForApplicant';
import JobApplicationForm from './JobApplicationForm'; 
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

  const handleClose = () => {
    // Implement the logic to close the job application form
    setSelectedJobId(null);
  };

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
    if (selectedCategoryId !== null) {
      axios.get(`http://localhost:8000/jobs/?category=${selectedCategoryId}`)
        .then(response => {
          setJobs(response.data);
        })
        .catch(error => {
          console.error('Error fetching jobs:', error);
        });
    } else {
      setJobs([]);
    }
  }, [selectedCategoryId]);

  const handleSearch = () => {
    axios.get(`http://localhost:8000/jobs/?search=${searchTerm}`)
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  };

  const handleApply = () => {
   
    if (!selectedJobId) {
      console.error('No job selected for application.');
      return;
    }

    const formData = new FormData();
    formData.append('job', selectedJobId);
    formData.append('applicant', applicantInfo.name);
    formData.append('resume', applicantInfo.resume);

    axios.post('http://localhost:8000/applications/', formData)
      .then(response => {
        console.log('Application submitted successfully:', response.data);

        setApplicantInfo({
          name: '',
          email: '',
          resume: null,
        });

        handleClose();
        
       
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
    // console.log('handleJobClick called with jobId:', jobId);
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

      <select value={selectedCategoryId} onChange={handleCategoryChange} className='CategoryDropdown'>
        <option value="" disabled>Select a category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <button onClick={handleSearch}>Search</button>

      {jobs.map(job => (
        <div key={job.id} className='JobItem'>
          <h3>{job.title}</h3>
          <p>Description: {job.description}</p>
          
          <Link to={`/applicant/${job.id}`} className='ViewDetailsButton'>Apply Now</Link>
          {/* <button className='ViewDetailsButton' onClick={() => handleJobClick(job.id)}>View Details</button> */}
          
        </div>
      ))}


{selectedJobId && (
        <JobApplicationForm jobId={selectedJobId} onClose={handleClose}/>
      )}

      
    </div>
  );
};

export default JobListForApplicant;
