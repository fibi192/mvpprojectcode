import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';


import logo from '../images/my-logo.png';
import './style.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phonenumber: '',
    password: '',
    type:'',
    
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of Redirect

  const datatopost = {
    username: formData.username,
    email: formData.email,
    phonenumber:formData.phonenumber,
    password: formData.password,
    type: formData.type,
    
    };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the JSON data before sending the request
    

    try {
      const response = await fetch(' http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datatopost)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User registered:', data);
        // Redirect to the appropriate dashboard page based on the user's type
        if (data.user.type === 'client') {
          navigate('/dashboard');
        } else if (data.user.type === 'driver') {
          navigate('/driver-dashboard');
        }
      } else {
        console.error('Error registering user:', response.statusText);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  if (isRegistered) {
    return <Redirect to="/dashboard" />;
  }
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
if (isRegistered) {
    navigate('/dashboard'); // Navigate after successful registration
  }
  return (
    <div className="container">
      <div className="signup-container">
        <div className="image-container">
          <img src={logo} alt="logo" />
        </div>
        <small>Sign Up here</small>
        <form id="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="phonenumber"
            id="phonenumber"
            placeholder="phonenumber"
            required
            value={formData.phonenumber}
            onChange={handleInputChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
          <select name="type" id="type" value={formData.type} onChange={handleInputChange}>
            <option value="client">Client</option>
            <option value="driver">Driver</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div> 
  );
};

export default SignUpForm;