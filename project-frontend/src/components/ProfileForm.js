import React, { useState } from 'react';
import styles from './Profile.module.css';

const ProfileForm = ({ user, onUpdateSchools }) => {
  const [newSchool, setNewSchool] = useState('');
  const [schools, setSchools] = useState(() => {
    console.log('Original Schools:', user.schools);
    try {
      if (Array.isArray(user.schools)) {
        return user.schools;
      }
      return typeof user.schools === 'string' && user.schools.startsWith('[')
        ? JSON.parse(user.schools)
        : user.schools.split(',').map((school) => school.trim());
    } catch (error) {
      console.error('Error parsing schools:', error);
      return [];
    }
  });
  const handleAddSchool = (e) => {
    e.preventDefault();
    if (newSchool.trim() && !schools.includes(newSchool.trim())) {
      const updatedSchools = [...schools, newSchool.trim()];
      console.log('Updated Schools:', updatedSchools);
      setSchools(updatedSchools);
      onUpdateSchools(updatedSchools);
      setNewSchool('');
    } else {
      alert('Invalid or duplicate school name');
    }
  };
  

  const handleRemoveSchool = (index) => {
    const updatedSchools = schools.filter((_, i) => i !== index);
    setSchools(updatedSchools);
    onUpdateSchools(updatedSchools);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.field}>
        <label>Email:</label>
        <span>{user.email}</span>
      </div>
      <div className={styles.field}>
        <label>Schools:</label>
        <ul className={styles.schoolList}>
          {schools.map((school, index) => (
            <li key={index}>
              {school}
              <button 
                onClick={() => handleRemoveSchool(index)}
                className={styles.removeButton}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleAddSchool} className={styles.addSchoolForm}>
        <input
          type="text"
          value={newSchool}
          onChange={(e) => setNewSchool(e.target.value)}
          placeholder="Enter school name"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Add School
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;

