import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null); // Default to null

  // Fetch the username from the server when the component mounts
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch('/api/auth/user'); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username || null); // Set the username from the response
        } else {
          setUsername(null); // Ensure state is cleared if the user is not authenticated
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setUsername(null); // Clear username on error
      }
    };

    fetchUsername();
  }, []); // Run only on component mount

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
