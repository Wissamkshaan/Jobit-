import React from 'react';

const AboutUs = () => (
  <div className="AboutUsContainer">
    <h2>About Us</h2>
    <p>
      Welcome to <span style={{ color: '#007bff', fontSize: '24px', fontWeight: 'bold' }}>JOBiT</span>, where we connect talented individuals with exciting job opportunities.
    </p>
    <p>
      Our Mission: To empower both employers and job seekers by providing a platform that simplifies
      the hiring process and facilitates career growth.
    </p>
    <p>
      Our Vision: To be the leading job portal, fostering a dynamic and inclusive job market.
    </p>
    <p>
      Meet Our Team: 
    </p>
    <div className="TeamMember">
      <h3>Wissam Alfuraiji</h3>
      <p>CEO</p>
      <p>
        Wissam is the founder and CEO of JOBiT. With a passion for connecting people and fostering
        career growth, he leads the team in creating an innovative job portal.
      </p>
    </div>
    <p>
      Contact Us:
      <br />
      Address: 123 Job Street, Cityville, Country
      <br />
      Email: info@jobit.com
      <br />
      Phone: +1 (123) 456-7890
      <br />
      Fax: +1 (123) 456-7891
    </p>
  </div>
);

export default AboutUs;
