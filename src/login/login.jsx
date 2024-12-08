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
        const { token } = await response.json();
        localStorage.setItem('userToken', token);
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
        </div>
      </form>
    </main>
  );
}
