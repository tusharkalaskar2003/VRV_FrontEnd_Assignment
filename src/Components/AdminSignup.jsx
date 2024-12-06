import React, { useState } from 'react'
import Form from '../UI/Form';
import '../Components/SignupForm.css';
import Button from '../UI/Button';

export default function AdminSignup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const SubmitForm = async (e) => {
        e.preventDefault()
        console.log('Submit Form Function invoked'); 

        if(password != confirmPassword){
           setErrorMessage("Passwords are not matching !"); 
           return; 
        }

        const userData = {
          username, 
          password, 
          email
        }

        try{
          const response = await fetch('http://127.0.0.1:5000/adminsignup', {
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
        }
        catch(error){
          setErrorMessage('Error Connecting to the server'); 
          setSuccessMessage(''); 
        }
  }

  return (
    <>
      <div className='signup-container'>
      <h1>Admin Signup Form</h1>
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
          <label>Enter your confirm password</label>
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label>Enter your mail</label> 
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onSubmit={SubmitForm} className='submit-button'>Signup</Button>
      </Form>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
    </>
  )
}
