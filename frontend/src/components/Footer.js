import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTelegram, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    // Add your form submission logic here
    console.log('Form submitted', formData);
  };

  return (
    <footer className='bg-slate-200 z-111 relative p-4'>
      <div className='w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between p-4 space-y-6 md:space-y-0'>
        {/* About Us Section */}
        <div className='flex-1 p-2'>
          <h1 className='text-2xl font-bold mb-4'>About Us</h1>
          <p className='text-sm md:text-base'>
            <FaMapMarkerAlt zclassName='inline mr-2' /> Location: megenagna addis Ababa 
          </p>
          <p className='text-sm md:text-base'>
            <FaMapMarkerAlt className='inline mr-2' /> Address: Addis Ababa, Ethiopia
          </p>
          <p className='text-sm md:text-base'>
            <FaPhone className='inline mr-2' /> Phone: 0919027032
          </p>
          <p className='text-sm md:text-base'>
            <FaEnvelope className='inline mr-2' /> Email:
            <a href="mailto:breselassie@gmail.com" className="text-blue-500 ml-1">breselassie@gmail.com</a>
          </p>
          <p className='text-sm md:text-base'>Post Office: 1007</p>
          <div className='flex space-x-4 mt-4'>
            <a href='https://www.facebook.com/bre' target='_blank' rel='noopener noreferrer'>
              <FaFacebook size={24} className="text-blue-600 hover:scale-110 transition-transform duration-200" />
            </a>
            <a href='https://t.me/bre' target='_blank' rel='noopener noreferrer'>
              <FaTelegram size={24} className="text-blue-400 hover:scale-110 transition-transform duration-200" />
            </a>
            <a href='https://www.instagram.com/bre' target='_blank' rel='noopener noreferrer'>
              <FaInstagram size={24} className="text-pink-500 hover:scale-110 transition-transform duration-200" />
            </a>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className='flex-1 p-4'>
          <p className='text-xl font-bold mb-4'>Contact Us</p>
          <form className='bg-transparent rounded-sm w-full' onSubmit={handleSubmit}>
            <div className='grid gap-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div>
                  <label className='block mb-1'>Name:</label>
                  <input
                    type='text'
                    placeholder='Enter name'
                    name='name'
                    className='bg-slate-100 p-2 w-full rounded focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out'
                    onChange={handleChange}
                    value={formData.name}
                    required
                  />
                </div>
                <div>
                  <label className='block mb-1'>Email:</label>
                  <input
                    type='email'
                    placeholder='Enter email'
                    name='email'
                    className='bg-slate-100 p-2 w-full rounded focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out'
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                </div>
              </div>
              <div>
                <label className='block mb-1'>Message:</label>
                <textarea
                  placeholder='Enter your message'
                  name='message'
                  className='bg-slate-100 p-2 w-full rounded focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out h-32 resize-none'
                  onChange={handleChange}
                  value={formData.message}
                ></textarea>
              </div>
              <button 
                type='submit' 
                className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out w-fit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className='p-2 w-full text-center mt-4 bg-slate-300'>
        <p className='font-bold' title="student project"> Bgk Student of  Computer Science Ecommerce Project</p>
        <p className='text-gray-600'>&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
