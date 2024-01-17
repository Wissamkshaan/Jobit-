import React from 'react';

const JobList = ({ jobs }) => {
  return (
    <ul>
      {jobs.map(job => (
        <li key={job.id}>
          <strong>Title:</strong> {job.title}<br />
          <strong>Resume:</strong> <a href={job.resume} target="_blank" rel="noopener noreferrer">View Resume</a><br />
          <strong>Employer:</strong> {job.employer}<br />
          <strong>Applied At:</strong> {job.applied_at}<br />
        </li>
      ))}
    </ul>
  );
};

export default JobList;
