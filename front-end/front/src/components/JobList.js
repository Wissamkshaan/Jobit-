import React from 'react';
import { useState } from 'react';
import JobDetails from './JobDetails';

const JobList = ({ jobs, onUpdate, onDelete }) => {
  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleUpdate = (jobId) => {
    setSelectedJobId(jobId);
  };

  const handleCloseDetails = () => {
    setSelectedJobId(null);
  };

  return (
    <div>
      {jobs.map(job => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <p>Description: {job.description}</p>
          <p>Employer: {job.employer_name}</p>
          <p>Created At: {job.created_at}</p>
          <p>Category: {job.category_name}</p>
          <button onClick={() => handleUpdate(job.id)}>Update</button>
          <button onClick={() => onDelete(job.id)}>Delete</button>
        </div>
      ))}

      {selectedJobId && (
        <JobDetails jobId={selectedJobId} onClose={handleCloseDetails} onUpdate={onUpdate} />
      )}
    </div>
  );
};

export default JobList;
