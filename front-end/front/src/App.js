import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost:8000/jobs/')
      .then(response => {

        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 
  
  return (
    <div className="App">
      <div>
        <h1>Hello</h1>
        {/* Render the fetched job data */}
        <ul>
          {jobs.map(job => (
            <li key={job.id}>
             <strong>Title:</strong> {job.title}<br />
              <strong>Resume:</strong> {job.resume}<br />
              <strong>Employer:</strong> {job.employer}<br />
              <strong>Applied At:</strong> {job.applied_at}<br />
            </li>
            
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
