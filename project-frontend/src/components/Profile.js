import React, { useState, useEffect } from 'react';
import ProfileForm from './ProfileForm';
import styles from './Profile.module.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        throw new Error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load user profile');
    }
  };

  const handleUpdateSchools = async (updatedSchools) => {
    try {
      const response = await fetch(`http://localhost:8080/auth/${user.id}/schools`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedSchools),
      });
  
      if (response.ok) {
        setUser({ ...user, schools: updatedSchools });
      } else {
        throw new Error('Failed to update schools');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to update schools');
    }
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!user) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileWrapper}>
        <h1 className={styles.title}>User Profile</h1>
        <ProfileForm user={user} onUpdateSchools={handleUpdateSchools} />
      </div>
    </div>
  );
};

export default Profile;

