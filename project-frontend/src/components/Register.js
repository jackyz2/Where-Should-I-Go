import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import RegisterForm from './RegisterForm';
import styles from './Register.module.css';

const Register = () => {
  const [error, setError] = useState(null);

  const handleRegister = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.location.href = '/welcome'; // Redirect to welcome page
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || 'Registration failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <RegisterForm onSubmit={handleRegister} error={error} />
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
