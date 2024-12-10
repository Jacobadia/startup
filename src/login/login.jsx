import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Import the context

export function Login() {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const { setUsername } = useContext(UserContext); // Access setUsername from context
  const navigate = useNavigate();

  const handleLoginOrCreate = async (endpoint) => {
    if (!usernameInput.trim() || !passwordInput.trim()) {
      setError('Please enter a username and password.');
      return;
    }

    try {
      const response = await fetch(`/api/auth/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify({ email: usernameInput, password: passwordInput }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      if (response.ok) {
        setUsername(usernameInput); // Store username in context
        navigate('/inventory'); // Redirect to inventory
      } else {
        const body = await response.json();
        setError(`⚠ Error: ${body.msg}`);
      }
    } catch (err) {
      setError('⚠ Network error. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'DELETE' });
      if (response.ok) {
        setUsername(null); // Clear user context
        setError(''); // Reset any errors
        setUsernameInput(''); // Clear input fields
        setPasswordInput('');
      } else {
        console.error('Logout failed.');
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/inventory');
      if (response.ok) {
        const data = await response.json();
        console.log('Inventory fetched:', data.items); // Replace with actual state management
      } else {
        console.error('Failed to fetch inventory');
      }
    } catch (err) {
      console.error('Error fetching inventory:', err);
    }
  };

  const saveInventory = async (items) => {
    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      if (!response.ok) {
        console.error('Failed to save inventory');
      }
    } catch (err) {
      console.error('Error saving inventory:', err);
    }
  };

  return (
    <main>
      <h1>Welcome to TTRPG Inventory</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
          <input
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <button
            type="button"
            onClick={() => handleLoginOrCreate('login')}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => handleLoginOrCreate('create')}
          >
            Create
          </button>
          <button
            type="button"
            onClick={handleLogout}
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            Logout
          </button>
        </div>
      </form>
    </main>
  );
}
