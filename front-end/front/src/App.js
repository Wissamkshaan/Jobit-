import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import JobList from './components/JobList';
import JobForm from './components/JobForm';

function App() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost:8000/jobs/')
      .then(response => {
        // console.log('Fetched data:', response.data); 

        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 
  
  // Creating a new job
  const handleCreate = () => {
    const newJob = {
      title: '',
      resume: '',
      employer: '',
      applied_at: ''
    };

    axios.post('http://localhost:8000/jobs/', newJob)
      .then(response => {
        console.log('Created new job:', response.data);
        // Refresh the job list after creating a new job
        axios.get('http://localhost:8000/jobs/')
          .then(response => {
            setJobs(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      })
      .catch(error => {
        console.error('Error creating new job:', error);
      });
  };


      //updating the job
      const handleUpdate = (jobId) => {
        // Fetch the existing job data using the jobId
        axios.get(`http://localhost:8000/jobs/${jobId}/`)
          .then(response => {
            const existingJobData = response.data;
      
            // Now, you have the existing data for the job with ID jobId
            // You might want to show a modal or form with this data for the user to edit
            console.log('Existing Job Data:', existingJobData);
      
            // After the user updates the data and submits, send a PUT request to update the job
            // This is where you'll send the updated data to the backend
            const updatedJobData = {
              ...existingJobData,
              // Update fields as needed based on user input
            };
      
            axios.put(`http://localhost:8000/jobs/${jobId}/`, updatedJobData)
              .then(response => {
                console.log('Updated job:', response.data);
      
                // Optionally, refresh the job list after updating
                axios.get('http://localhost:8000/jobs/')
                  .then(response => {
                    setJobs(response.data);
                  })
                  .catch(error => {
                    console.error('Error fetching data:', error);
                  });
              })
              .catch(error => {
                console.error('Error updating job:', error);
              });
          })
          .catch(error => {
            console.error('Error fetching existing job data:', error);
          });
      };
      
      const handleDelete = (jobId) => {
        // Send a DELETE request to delete the job with ID jobId
        axios.delete(`http://localhost:8000/jobs/${jobId}/`)
          .then(response => {
            console.log('Deleted job with ID:', jobId);
      
            // Optionally, refresh the job list after deleting
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
  
  return (
    <div className="App">
     
     <JobForm onCreate={handleCreate} />
      <JobList jobs={jobs} onUpdate={handleUpdate} onDelete={handleDelete} />
      
    </div>
  );
}


export default App;