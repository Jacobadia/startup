import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export function Login() {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const { setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLoginOrCreate = async (endpoint) => {
    if (!usernameInput.trim() || !passwordInput.trim()) {
      setError('Please enter a username and password.');
      return;
    }

    try {
      const response = await fetch(`/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ email: usernameInput, password: passwordInput }),
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
        setUsernameInput('');
        setPasswordInput('');
        navigate('/'); // Redirect to login
      } else {
        console.error('Logout failed.');
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <main>
      <h1>Welcome to TTRPG Inventory</h1>
      <form onSubmit={(e) => e.preventDefault()}>
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
          <button onClick={() => handleLoginOrCreate('login')}>Login</button>
          <button onClick={() => handleLoginOrCreate('create')}>Create</button>
          <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white' }}>
            Logout
          </button>
        </div>
      </form>
    </main>
  );
}
