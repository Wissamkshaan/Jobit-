import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './public /jobDetails-applicant.css';

const JobDetailsForApplicant = ({ jobId, onClose }) => {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    employer: '',
    created_at: '',
    category: null,
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/jobs/${jobId}/`)
      .then(response => {
        setJobDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching job details:', error);
      });
  }, [jobId]);

  return (
    <div className='JobDetailsContainer'>
      <div>
        <h2 className='JobTitle'>{jobDetails.title}</h2>
        <p className='JobDetails'>Description: {jobDetails.description}</p>
        <p className='JobDetails'>Created At: {jobDetails.created_at}</p>
        <p className='JobDetails'>Category: {jobDetails.category_name}</p>

        <button className="CloseButton" onClick={onClose}>Close</button>

        
      </div>
    </div>
  );
};

export default JobDetailsForApplicant;
