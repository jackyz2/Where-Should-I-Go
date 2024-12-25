import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import LoginForm from './loginForm';
import styles from './Login.module.css';

const Login = () => {
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem('token', token);
        window.location.href = '/welcome'; // Redirect to welcome page
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || 'Invalid credentials!');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <LoginForm onSubmit={handleLogin} error={error} />
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
