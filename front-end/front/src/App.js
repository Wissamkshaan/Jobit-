import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import JobList from './components/JobList';
import JobForm from './components/JobForm';

function App() {
  const [jobs, setJobs] = useState([]);
  const [jobIdToUpdate, setJobIdToUpdate] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    employer: '',
    created_at: '',
    category: null,
  });

  useEffect(() => {
    axios.get('http://localhost:8000/jobs/')
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  const handleCreate = () => {
    // Set jobIdToUpdate to null to indicate a create action
    setJobIdToUpdate(null);
    setFormData({
      title: '',
      description: '',
      employer: '',
      created_at: '',
      category: null,
    });
  };

  const handleUpdate = (job) => {
    setJobIdToUpdate(job.id);
    setFormData({
      title: job.title,
      description: job.description,
      employer: job.employer,
      created_at: job.created_at,
      category: job.category,
    });
  };

  const handleDelete = (jobId) => {
    axios.delete(`http://localhost:8000/jobs/${jobId}/`)
      .then(response => {
        console.log('Deleted job with ID:', jobId);

        // Refresh the job list
        axios.get('http://localhost:8000/jobs/')
          .then(response => {
            setJobs(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      })
      .catch(error => {
        console.error('Error deleting job:', error);
      });
  };

  const handleJobFormSubmit = () => {
    // Refresh the job list after creating or updating a job
    axios.get('http://localhost:8000/jobs/')
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="App">
      <JobForm
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={() => handleDelete(jobIdToUpdate)}
        setJobs={setJobs}
        Jobs={jobs}
        jobIdToUpdate={jobIdToUpdate}
        onSubmit={handleJobFormSubmit}
      />
      <JobList jobs={jobs} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
}

export default App;