import React from 'react';

const Footer = () => (
  <footer className="FooterContainer">
    <div className="FooterSection">
      <h4>Company</h4>
      <ul>
        <li><a href="/about-us">About Us</a></li>
        <li><a href="/terms">Terms of Service</a></li>
        <li><a href="/privacy-policy">Privacy Policy</a></li>
      </ul>
    </div>
    <div className="FooterSection">
      <h4>Support</h4>
      <ul>
        <li><a href="/help-center">Help Center</a></li>
        <li><a href="/contact-us">Contact Us</a></li>
      </ul>
    </div>
    <div className="FooterSection">
      <h4>Connect With Us</h4>
      <ul>
        <li><a href="https://www.facebook.com/jobit">Facebook</a></li>
        <li><a href="https://twitter.com/jobit">Twitter</a></li>
        <li><a href="https://www.linkedin.com/in/wissam-alfuraiji/">LinkedIn</a></li>
      </ul>
    </div>
    <div className="FooterSection">
      <p>&copy; 2024 Wissam Alfuraiji. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
