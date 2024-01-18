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
  useEffect(() => {
    const newJob = {
      title:'',
      resume:'',
      employer:'',
      applied_at:''
    };
    
    axios.post('http://localhost:8000/jobs/', newJob)
      .then(response => {
        console.log('Created new job:', response.data);
      })
      .catch(error => {
        console.error('Error creating new job:', error);
      });
      },[]);

      //updating the job
      useEffect(() => {
        const jobToUpdate = {
          title:'Updated Title',
          resume:'Updated Resume',
          employer:'Updated Employer',
          applied_at:'Updated Applied At',
    
      };

      axios.put('http://localhost:8000/jobs/:id/', jobToUpdate)
        .then(response => {
          console.log('Updated job:', response.data);
        })
        .catch(error => {
          console.error('Error updating job:', error);
        });
        },[]);

      //deleting the job
      useEffect(() => {
        const jobIdToDelete = 1;  
    
        axios.delete(`http://localhost:8000/jobs/${jobIdToDelete}/`)
          .then(response => {
            console.log('Deleted job:', response.data);
          })
          .catch(error => {
            console.error('Error deleting job:', error);
          });
      }, []);
  
  return (
    <div className="App">
     
        <JobList jobs={jobs} />
        <JobForm />
      
    </div>
  );
}


export default App;