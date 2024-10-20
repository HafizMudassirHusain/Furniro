import React, { useState } from 'react';
import { message, Button } from 'antd';
import producthero from '../../assets/producthero1.1.jpg';
import navlogo from '../../assets/navLogo.png';
import './Contact.css'
import Banner from "../ProductsComponent/Banner";
import { Link } from 'react-router-dom';
import { LucideMapPin } from 'lucide-react';
import { ClockCircleFilled, PhoneFilled } from '@ant-design/icons';
import emailjs from 'emailjs-com';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // EmailJS Integration
    emailjs.send("service_5ru6wmm","template_ax35b4d",{
          name: formData.name,
          subject: formData.subject,
          email: formData.email,
          message: formData.message,
        },
        'Pv3yL9ioNcyiGiaxV'  // Replace with your EmailJS Public Key
      )
      .then(
        (response) => {
          message.success('Your message has been sent successfully!');
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
          setLoading(false);
        },
        (error) => {
          message.error('Failed to send message. Please try again later.');
          setLoading(false);
        }
      );
  };

  return (
    <>
    <div
  style={{
    backgroundImage: `url(${producthero})`,
    height: "40vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }}
  className="shop-hero h-[40vh]"
>
  <div className="white h-full">
    <div className="h-full text-center flex flex-col justify-center items-center">
      <div className="h-[7vh] w-[7vw] flex justify-center items-center">
        <img src={navlogo} alt="Furnios" className="w-[100%]" />
      </div>
      <h1 className="font-semibold text-4xl md:text-5xl tracking-wider">Contact</h1>
      <div className="my-4 px-4 text-lg md:text-xl">
        <Link to={"/"} className="font-semibold">
          {"Home > "}
        </Link>
        <Link to="/contact"> Contact</Link>
      </div>
    </div>
  </div>
</div>

<div className="w-full text-center my-8">
  <h1 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch With Us</h1>
  <p className="text-sm md:text-base">
    For more information about our product & services, feel free to drop us <br />
    an email. Our staff will always be there to help you out. Do not
    hesitate.
  </p>
</div>

<div className="contact-us-page flex flex-col md:flex-row justify-around px-4">
  <div className="flex flex-col w-full md:w-1/3 mb-4">
    <div className="flex mx-[5%]">
      <div>
        <LucideMapPin size={30} />
      </div>
      <div className="px-2 py-2">
        <h1 className="font-bold text-xl md:text-2xl">Address</h1>
        <p className="text-md w-full font-semibold">
          House No.664C <br /> Sector 11-C Madina Colony <br /> Orangi Town
          Karachi
        </p>
      </div>
    </div>

    <div className="flex my-5 mx-[5%]">
      <div>
        <PhoneFilled className="text-2xl" />
      </div>
      <div className="px-2 py-2">
        <h1 className="font-bold text-xl md:text-2xl">Phones</h1>
        <p className="text-md font-semibold">(mobile) 92 465475847</p>
        <p className="text-md font-semibold">(HotLine) 92 46547547</p>
      </div>
    </div>

    <div className="flex mx-[5%]">
      <div>
        <ClockCircleFilled className="text-2xl" />
      </div>
      <div className="px-2 py-2">
        <h1 className="font-bold text-xl md:text-2xl">Working Time</h1>
        <p className="text-sm w-4/5 font-semibold">
          Monday-Friday 09:00am - 10:00pm
        </p>
      </div>
    </div>
  </div>

  <form className="contact-form w-full md:w-[50%]" onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700">Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
        className="w-full px-3 py-2 border rounded-md"
        placeholder="Enter your name"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
        className="w-full px-3 py-2 border rounded-md"
        placeholder="Enter your email"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Subject</label>
      <input
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleInputChange}
        required
        className="w-full px-3 py-2 border rounded-md"
        placeholder="Enter your Subject"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Message</label>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        required
        className="w-full px-3 py-2 border rounded-md"
        placeholder="Enter your message"
        rows="5"
      />
    </div>
    <Button
      type="primary"
      htmlType="submit"
      style={{ background: "#e0c869" }}
      loading={loading}
      className="w-full py-2"
    >
      Send Message
    </Button>
  </form>
</div>

<style jsx>{`
  @media (max-width: 640px) {
    .contact-us-page {
      flex-direction: column;
      align-items: center;
    }
  }
`}</style>
  
      <Banner backColor={"#e0c869"} />
    </>
  );  
}
 export default Contact;