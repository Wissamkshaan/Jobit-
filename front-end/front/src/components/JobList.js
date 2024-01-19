import React from 'react';
import axios from 'axios';

const JobList = ({ jobs, onUpdate, onDelete }) => {
  return (
    <ul>
      {jobs.map(job => (
        <li key={job.id}>
          <strong>Title:</strong> {job.title}<br />
          <strong>Resume:</strong> <a href={job.resume} target="_blank" rel="noopener noreferrer">View Resume</a><br />
          <strong>Employer:</strong> {job.employer}<br />
          <strong>Applied At:</strong> {job.applied_at}<br />
          <button type="button" onClick={() => onUpdate(job)}>Update</button>
          <button type="button" onClick={() => onDelete(job.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default JobList;
