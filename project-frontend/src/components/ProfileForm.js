import React, { useState } from 'react';
import styles from './Profile.module.css';

const RatingModal = ({ email, school, onSubmit, onClose }) => {
    const [academicRating, setAcademicRating] = useState(0);
    const [tuitionRating, setTuitionRating] = useState(0);
    const [locationRating, setLocationRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        const data = {
            email,
            school,
            academic: academicRating,
            tuition: tuitionRating,
            location: locationRating,
            comment,
        };
        onSubmit(data);
        onClose();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Rate {school}</h2>
                <div className={styles.ratingRow}>
                    <label>Academic:</label>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={academicRating >= star ? styles.filledStar : styles.emptyStar}
                            onClick={() => setAcademicRating(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <div className={styles.ratingRow}>
                    <label>Tuition:</label>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={tuitionRating >= star ? styles.filledStar : styles.emptyStar}
                            onClick={() => setTuitionRating(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <div className={styles.ratingRow}>
                    <label>Location:</label>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={locationRating >= star ? styles.filledStar : styles.emptyStar}
                            onClick={() => setLocationRating(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Enter your comments"
                    className={styles.textarea}
                />
                <button onClick={handleSubmit} className={styles.submitButton}>
                    Submit
                </button>
                <button onClick={onClose} className={styles.closeButton}>
                    Close
                </button>
            </div>
        </div>
    );
};


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
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [isRatingModalVisible, setRatingModalVisible] = useState(false);

    const handleRateSchool = (school) => {
        setSelectedSchool(school);
        setRatingModalVisible(true);
    };

    const closeRatingModal = () => {
        setSelectedSchool(null);
        setRatingModalVisible(false);
    };

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

    const submitRating = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/newsfeed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Rating submitted successfully!');
            } else {
                throw new Error('Failed to submit rating');
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Failed to submit rating.');
        }
    };


    return (
        <div className={styles.formContainer}>
            <div className={styles.field}>
                <label>Email:</label>
                <span>{user.email}</span>
            </div>
            <div className={styles.field}>
                <label>School Preferences:</label>
                <ul className={styles.schoolList}>
                    {schools.map((school, index) => (
                        <li key={index} className={styles.schoolItem}>
                            <span>{school}</span>
                            <button
                                onClick={() => handleRateSchool(school)}
                                className={styles.rateButton}
                            >
                                Rate
                            </button>
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
            {isRatingModalVisible && (
                <RatingModal
                    email={user.email}
                    school={selectedSchool}
                    onSubmit={(data) => {
                        console.log('Submitting rating:', data); // Debugging
                        submitRating(data); // API call
                    }}
                    onClose={closeRatingModal}
                />
            )}
        </div>
    );
};

export default ProfileForm;

