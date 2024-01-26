import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import './public /applicant.css';



const JobApplicationForm = ({ onClose, onUpdateApplications = () => {} }) => {
  const { jobId } = useParams();
  const [applicantInfo, setApplicantInfo] = useState({
    name: '',
    email: '',
    resume: null,
  });
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleApply = () => {
    console.log('handleApply called with jobId:', jobId);
    if (!jobId) {
      console.error('No job selected for application.');
      return;
    }

    // Prepare the form data for the application
    const formData = new FormData();
    formData.append('job', jobId);
    formData.append('applicant', applicantInfo.name);
    formData.append('resume', applicantInfo.resume);

    // Make the API request to submit the application
    axios.post('http://localhost:8000/applications/', formData)
      .then(response => {
        console.log('Application submitted successfully:', response.data);

        // Clear applicantInfo
        setApplicantInfo({
          name: '',
          email: '',
          resume: null,
        });
        
        onUpdateApplications();
        // console.log('Setting showNotification to true');
        setShowNotification(true);

        // Hide the notification after a certain time (e.g., 3000 milliseconds)
        setTimeout(() => {
          // console.log('Setting showNotification to false');
          setShowNotification(false);
        }, 3000);
        
        onClose();
      })
      .catch(error => {
        console.error('Error submitting application:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setApplicantInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setApplicantInfo(prevInfo => ({
      ...prevInfo,
      resume: file,
    }));
  };

  const handleBack = () => {
    // Navigate back to the job list
    navigate('/applicant');
  };


  return (
    <div className="JobApplicationForm">
      {showNotification && <p className="Notification">Application submitted successfully!</p>}
      <h2>Apply for this Job</h2>
      <form>
        <label>Name:</label>
        <input type="text" name="name" value={applicantInfo.name} onChange={handleInputChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={applicantInfo.email} onChange={handleInputChange} required />

        <label>Resume:</label>
        <input type="file" name="resume" onChange={handleFileChange} accept=".pdf,.doc,.docx" required />

        <button type="button" onClick={handleApply}>Apply</button>
        <button type="button" onClick={handleBack}>Back</button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
