import React from 'react';
import JobListForApplicant from './JobListForApplicant';
import JobDetailsForApplicant from './JobDetailsForApplicant';

const ApplicantView = ({ categories }) => {
  const [selectedJobId, setSelectedJobId] = useState(null);

  return (
    <div>
      <JobListForApplicant categories={categories} setSelectedJobId={setSelectedJobId} />
      {selectedJobId && <JobDetailsForApplicant jobId={selectedJobId} />}
    </div>
  );
};
export default ApplicantView;