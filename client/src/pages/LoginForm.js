import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  // Initialize state variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  // Handle username input change
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if the password is correct
    if (password === 'NTSDSS') {
      // Redirect to the homepage
      window.location.href = '/homepage';
    } else {
      // Show the error message
      setShowError(true);
    }
  };

  // Render the form
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label className="login-form__label">
        <span className="login-form__label-text">Username:</span>
        <input className="login-form__input" type="text" name="username" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label className="login-form__label">
        <span className="login-form__label-text">Password:</span>
        <input className="login-form__input" type="password" name="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button className="login-form__button" type="submit">Log In</button>
      {showError && (
        <div className="login-form__error-message" style={{ marginTop: "10px", color: "red" }}>Incorrect Password</div>
      )}
    </form>
  );
};

export default LoginForm;
