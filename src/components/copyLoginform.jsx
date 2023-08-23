import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/my-logo.png';
import GoogleLogin from 'react-google-login';
import './style.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const responseGoogle = (response) => {
    // Handle Google Sign-In response
    if (response.profileObj) {
      // Redirect to the dashboard page
      navigate('/dashboard');
    } else {
      // The profileObj property is not defined
      console.log('The profileObj property is not defined');
    }
  };
  
  const GitHubLoginButton = () => {
    const handleGitHubLogin = () => {
      const clientId = 'e9aa31bb5e5ec716eff2';
      const redirectUri = 'http://localhost:5173/';
      const scope = 'user'; // Specify the required scope(s)
      const secrets = '11f1530478073bffa705f011fc237a7b6abd0a11';

      // Construct the GitHub authorization URL
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

      // Redirect the user to the GitHub authorization URL
      window.location.href = authUrl;
    };

    return (
      <button onClick={handleGitHubLogin}>Sign in with GitHub</button>
    );
  };
  const datatopost = {
    data: {
      identifier: email,
      password: password,
      }

  };


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:1337/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datatopost),
            });

      const data = await response.json();
      console.log('Response status:', response.status);

      console.log('Response data:', data);

      if (response.ok) {
        // Redirect to the dashboard page upon successful login
        navigate('/dashboard');
      } else {
        // Handle login error
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);

      setErrorMessage('An error occurred while logging in');
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="image-container">
          <img src={logo} alt="logo" />
        </div>
        <small>Sign in to access your account</small>
        <form id="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <p>
            You don't have an Account. <Link to="/signup">Sign Up </Link>
          </p>
          <p>
            Access the Dashboard: <Link to="/dashboard">View Dashboard</Link>
          </p>
          <GoogleLogin
            clientId="186592986023-qb7k4kqgrkh0l0ilbh54jge816kd3hf0.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          <GitHubLoginButton /> {/* Render the GitHub sign-in button */}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
