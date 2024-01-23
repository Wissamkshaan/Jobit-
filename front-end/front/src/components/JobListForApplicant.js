import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import JobDetailsForApplicant from './JobDetailsForApplicant';

const JobListForApplicant = () => {
  const [categories, setCategories] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  if (!categories) {
    
    return <p>Loading categories...</p>;
  }

  const handleApply = (jobId) => {
    
    console.log(`Applying for job ${jobId}`);
  };

  const handleCloseDetails = () => {
    setSelectedJobId(null);
  };

  return (
    <div>
      {/* Render categories */}
      {categories.map(category => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          {/* Fetch jobs for each category */}
          <JobsByCategory categoryId={category.id} setSelectedJobId={setSelectedJobId} />
        </div>
      ))}

      {/* Render job details for selected job */}
      {selectedJobId && (
        <JobDetailsForApplicant jobId={selectedJobId} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

// Component to fetch and display jobs for a specific category
const JobsByCategory = ({ categoryId, setSelectedJobId }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs for the specified category
    axios.get(`http://localhost:8000/jobs/?category=${categoryId}`)
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, [categoryId]);

  return (
    <div>
      {/* Render jobs for the category */}
      {jobs.map(job => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <p>Description: {job.description}</p>
          {/* Link to the job details page */}
          <Link to={`/applicant/job/${job.id}`} onClick={() => setSelectedJobId(job.id)}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default JobListForApplicant;
