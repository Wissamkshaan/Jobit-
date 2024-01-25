import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <div>
        <h2>{jobDetails.title}</h2>
        <p>Description: {jobDetails.description}</p>
        {/* <p>Employer: {jobDetails.employer_name}</p> */}
        <p>Created At: {jobDetails.created_at}</p>
        <p>Category: {jobDetails.category}</p>

        
      </div>
    </div>
  );
};

export default JobDetailsForApplicant;
