import React, { useState, useEffect } from 'react';
import JobForm from './JobForm';
import axios from 'axios';

const JobDetails = ({ jobId, onClose, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
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
  
    const handleUpdate = () => {
      setIsEditing(!isEditing);
    };
  
    const handleSaveChanges = (updatedDetails) => {
      
      axios.put(`http://localhost:8000/jobs/${jobId}/`, updatedDetails)
        .then(response => {
          console.log('Job details updated:', response.data);
          onUpdate(response.data);
          setIsEditing(false);
        })
        .catch(error => {
          console.error('Error updating job details:', error);
        });
    };
  
    return (
      <div>
        {isEditing ? (
          <JobForm
            onUpdate={(updatedDetails) => handleSaveChanges(updatedDetails)}
            onClose={onClose}
            jobIdToUpdate={jobId}
          />
        ) : (
          <div>
            <h2>{jobDetails.title}</h2>
            <p>Description: {jobDetails.description}</p>
            <p>Employer: {jobDetails.employer}</p>
            <p>Created At: {jobDetails.created_at}</p>
            <p>Category: {jobDetails.category}</p>
  
            <button onClick={handleUpdate}>Update Job</button>
            <button onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    );
  };
  
  export default JobDetails;