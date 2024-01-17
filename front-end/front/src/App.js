import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import JobList from './components/JobList';

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
  
  return (
    <div className="App">
     
        <JobList jobs={jobs} />
      
    </div>
  );
};


export default App;