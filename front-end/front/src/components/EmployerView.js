import React from 'react';
import JobForm from './JobForm';
import JobList from './JobList';
import axios from 'axios';
import './public /employer.css';


const EmployerView = ({ categories, jobs, handleCreate, handleUpdate, handleDelete, handleJobFormSubmit, jobIdToUpdate, setJobs }) => {
  const onUpdate = (updatedJob) => {
    // Update the state using setJobs
    setJobs((prevJobs) => prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));
  };

  const onDelete = (jobId) => {
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
  // console.log('Type of handleDelete:', typeof handleDelete);
  // console.log('Value of handleDelete:', handleDelete);

  return (

  
    <div className='EmployerView'>
      <JobForm
       onCreate={handleCreate}
       onDelete={handleDelete}
       onSubmit={handleJobFormSubmit}
       setJobs={setJobs}
       jobs={jobs}
       jobIdToUpdate={jobIdToUpdate}
       categories={categories}
       onUpdate={onUpdate}
      />
      <JobList key={JSON.stringify(jobs)} jobs={jobs} onUpdate={handleUpdate} onDelete={handleDelete} userType="employer" />
    </div>
  );
};

export default EmployerView;
