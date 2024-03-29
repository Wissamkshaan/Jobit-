import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobListForApplicant from './JobListForApplicant';
import JobDetailsForApplicant from './JobDetailsForApplicant';
import './public /employer.css';


const JobList = ({ jobs, onUpdate, onDelete }) => {
  const navigate = useNavigate();
  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleUpdate = (jobId) => {
    // Navigate to the updating form route
    navigate(`/update-job/${jobId}`);
  };

  const handleDelete = (jobId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this job?');
    onDelete(jobId);
  };

  const handleCloseDetails = () => {
    setSelectedJobId(null);
  };

  return (
    <div className='JobList'>
      {jobs && jobs.length > 0 ? (
        jobs.map(job => (
          <div key={job.id} className='JobListItem'>
            <h3>{job.title}</h3>
            <p>Description: {job.description}</p>
            
            <p>Created At: {job.created_at}</p>
            <p>Category: {job.category_name}</p>
          
            <button onClick={() => handleUpdate(job.id)}>Update</button>
            <button onClick={() => handleDelete(job.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No jobs available.</p>
      )}

      {selectedJobId && (
        <JobDetailsForApplicant jobId={selectedJobId} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default JobList;
