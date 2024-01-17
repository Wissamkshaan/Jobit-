import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {user.username}</p>
      {user.userprofile.is_employer && <p>Company: {user.userprofile.company_name}</p>}
      {user.userprofile.is_applicant && <p>Resume: {user.userprofile.resume}</p>}
    </div>
  );
};

export default UserProfile;