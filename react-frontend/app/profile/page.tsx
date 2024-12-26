'use client';
import React, { FC, useState, useEffect } from 'react';
import ProfileForm from './ProfileForm';
import styles from './Profile.module.css';

// Example interface for your user object.
// Adjust to match the fields returned by your backend.
interface User {
  id: string;
  schools?: string[];
  // Add any other fields as needed, for example:
  // name: string;
  // email: string;
  [key: string]: any;
}

const Profile: FC = () => {
  // user can be User or null if not loaded yet
  const [user, setUser] = useState<User | null>(null);

  // error can be string or null
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const userData: User = await response.json();
        setUser(userData);
      } else {
        throw new Error('Failed to fetch user profile');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load user profile');
    }
  };

  const handleUpdateSchools = async (updatedSchools: string[]) => {
    // If user is still null for some reason, just return early
    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:8080/auth/${user.id}/schools`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(updatedSchools),
        }
      );

      if (response.ok) {
        setUser({ ...user, schools: updatedSchools });
      } else {
        throw new Error('Failed to update schools');
      }
    } catch (err) {
      console.error('Error:', err);
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
        {/* Pass the user and the update function to the form */}
        <ProfileForm user={user} onUpdateSchools={handleUpdateSchools} />
      </div>
    </div>
  );
};

export default Profile;
