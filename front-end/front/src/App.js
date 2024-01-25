import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import axios from 'axios';

import EmployerView from './components/EmployerView';
import UpdateJobForm from './components/UpdateJobForm';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import JobDetailsForApplicant from './components/JobDetailsForApplicant';
import JobListForApplicant from './components/JobListForApplicant';

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

  const [categories, setCategories] = useState([]); 

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
  
  const employerView = (
    <div>
      <JobForm
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onSubmit={handleJobFormSubmit}
        setJobs={setJobs}
        jobs={jobs}
        jobIdToUpdate={jobIdToUpdate}
        userType="employer"
        categories={categories}
      />
      <JobList jobs={jobs} onUpdate={handleUpdate} onDelete={handleDelete} userType="employer" />
    </div>
  );

  const applicantView = (
    <div>
      <JobListForApplicant categories={categories} />
    </div>
  );

  const AboutUs = () => (
    <div>
      <h2>About Us</h2>
      {'all about us'}
    </div>
  );

  const Footer = () => (
    <footer>
      <p>Your Footer Content</p>
      {/* Other footer content */}
    </footer>
  );

  
  return (
    <Router>
      <div>
        {/* Header */}
        <header>
          <h1>JOBiT</h1>
          {/* Other header content */}
        </header>

        {/* Navigation Links */}
        <div className="NavLinks">
          <Link to="/employer" className="NavLink">
            Employer
          </Link>
          <Link to="/applicant" className="NavLink">
            Applicant 
          </Link>
          <Link to="/about-us" className="NavLink">
            About Us
          </Link>
        </div>

        <Routes>
          <Route path="/applicant" element={applicantView} />
          <Route path="/employer" element={employerView} />
          <Route path="/update-job/:id" element={<UpdateJobForm categories={categories} />} />
          <Route path="/about-us" element={<AboutUs />} /> {/* Route for About Us */}
          <Route path="/" element={<div className="App"><p>Welcome to the Job Board</p></div>} />
        </Routes>
        <footer className="Footer">
          <p>&copy; 2024 Wissam Alfuraiji. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;