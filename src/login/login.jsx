import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Import the context

export function Login() {
  const [usernameInput, setUsernameInput] = useState('');
  const { setUsername } = useContext(UserContext); // Access setUsername from context
  const navigate = useNavigate();

  const handleLoginOrCreate = () => {
    if (usernameInput.trim()) {
      setUsername(usernameInput); // Store username in context
      navigate('/inventory'); // Redirect to inventory
    } else {
      alert('Please enter a username.');
    }
  };

  return (
    <main>
      <h1>Welcome to TTRPG Inventory</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLoginOrCreate();
        }}
      >
        <div>
          <span>Username</span>
          <input 
            type="text" 
            placeholder="Username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)} 
          />
        </div>
        <div>
          <span>Password</span>
          <input type="password" placeholder="password" />
        </div>
        <button type="submit">Login</button>
        <button type="submit">Create</button>
      </form>
    </main>
  );
}
