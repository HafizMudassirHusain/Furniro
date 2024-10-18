import React from 'react';
import './Footer.css';
import navlogo from '../assets/navLogo.png';

const Footer = () => {
  return (
    <footer className="footer border">
      <div className="footer-container ">
        <div className="footer-column">
          <div className="logo">
            <img src={navlogo} alt="Website Logo" />
            <h2 className='text-3xl'>Funiro</h2>
            <p className='py-10'>Your catchy tagline goes here</p>
          </div>
        </div>

        <div className="footer-column">
          <h3>Website Pages</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Help</h3>
          <ul>
            <li><a href="/payment">Payment</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Newsletter</h3>
          <input type="email" placeholder="Enter your email" />
          <button type="button">Subscribe</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
