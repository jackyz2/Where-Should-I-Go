import React, { FC, useState } from 'react';

// Match this interface to the one in Profile.tsx or import it if shared
interface User {
  id: string;
  schools?: string[];
  [key: string]: any;
}

// Define props for the ProfileForm
interface ProfileFormProps {
  user: User;
  onUpdateSchools: (updatedSchools: string[]) => Promise<void> | void;
}

const ProfileForm: FC<ProfileFormProps> = ({ user, onUpdateSchools }) => {
  // Keep track of local state for the user's schools array
  const [schools, setSchools] = useState<string[]>(user.schools || []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Call the parent function passed in via props
    onUpdateSchools(schools);
  };

  const handleChangeSchool = (index: number, newValue: string) => {
    const newSchools = [...schools];
    newSchools[index] = newValue;
    setSchools(newSchools);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Schools</h2>

      {schools.map((school, idx) => (
        <div key={idx}>
          <input
            type="text"
            value={school}
            onChange={(e) => handleChangeSchool(idx, e.target.value)}
          />
        </div>
      ))}

      <button type="submit">Save</button>
    </form>
  );
};

export default ProfileForm;
