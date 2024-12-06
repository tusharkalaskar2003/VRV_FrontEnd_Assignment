import React, { useState } from 'react';
import Form from '../UI/Form';
import '../Components/SignupForm.css';
import Button from '../UI/Button';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [role,setRole] = useState(''); 

  // Handle form submission
  const SubmitForm = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    const userData = {
      username,
      password,
      email, 
      role
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        setErrorMessage('');
      } else {
        setErrorMessage(data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error connecting to the server.');
      setSuccessMessage('');
    }
  };

  return (
    <div className='signup-container'>
      <h1>User Signup Form</h1>
      <Form className='signup' onSubmit={SubmitForm}>
        <label>Enter your name</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <label>Enter your password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <label>Confirm your password</label>
        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        
        <label>Enter your email</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Enter your role</label>
        <input
          type='text'
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        
        <Button type='submit' className='submit-button'>
          Signup
        </Button>
      </Form>
      
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
}
