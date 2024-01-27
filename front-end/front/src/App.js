import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './components/public /Header';
import Footer from './components/public /Footer';
import AboutUs from './components/public /AboutUs';
import UpdateJobForm from './components/UpdateJobForm';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import JobListForApplicant from './components/JobListForApplicant';
import JobApplicationForm from './components/JobApplicationForm';


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


return (
    <Router>
       <div className="AppContainer">
        <Header />
        
          <div className="NavLinks">
            <Link to="/employer" className="NavLink">
              Employer/Post Job
            </Link>
            <Link to="/applicant" className="NavLink">
              Applicant/View Jobs
            </Link>
            <Link to="/about-us" className="NavLink">
              About Us
            </Link>
          </div>

          <Routes>
            <Route path="/applicant" element={<JobListForApplicant />} />
            <Route path="/applicant/:jobId" element={<JobApplicationForm />} />
            <Route path="/employer" element={employerView} />
            <Route path="/update-job/:id" element={<UpdateJobForm categories={categories} />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>

          
          <Footer />

       
      </div>
    </Router>
  );
}

export default App;