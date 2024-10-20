import React from 'react';
import './Footer.css';
import navlogo from '../assets/navLogo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer border">
      <div className="footer-container ">
        <div className="footer-column">
          <div className="logo">
            <img src={navlogo} alt="Website Logo" />
            <h2 className='text-3xl text-gray-400'>Funiro</h2>
            <p className='py-10'>Your catchy tagline goes here</p>
          </div>
        </div>

        <div className="footer-column">
          <h3>Website Pages</h3>
          <ul className='p-2'>
             <li className='my-6'><Link to={"/"}>Home</Link></li>
             <li className='my-6'><Link to={"/products"}>Shop</Link></li>
             <li className='my-6'><Link to={"/orders"}>Orders</Link></li>
             <li className='my-6'><Link to={"/contact"}>Contact</Link></li>
             <li className='my-6'><Link to={"/checkout"}>Checkout</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Help</h3>
          <ul>
            <li className='my-6'><Link to={"/payment"}>Payment</Link></li>
            <li className='my-6'><Link to={"/returns"}>Returns</Link></li>
            <li className='my-6'><Link to={"/privacy-policy"}>Privacy Policy</Link></li>
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
