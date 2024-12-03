import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [username, setUsername] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginOrCreate = () => {
    if (username.trim()) {
      setWelcomeMessage(`Welcome ${username}`);
    } else {
      alert('Please enter a username.');
    }
  };

  const handleContinue = () => {
    navigate('/inventory');
  };


  return (
    <main>
      <h1>Welcome to TTRPG Inventory</h1>
      {welcomeMessage ? (
        <div>
          <p>{welcomeMessage}</p>
          <button onClick={handleContinue}>Continue</button>
        </div>
      ) : (
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
            value={username}
            onChange={(e) => setUsername(e.target.valueAsNumber)} 
            />
        </div>
        <div>
          <span>Password</span>
          <input type="password" placeholder="password" />
        </div>
        <button type="submit" onClick={handleLoginOrCreate}>Login</button>
        <button type="submit" onClick={handleLoginOrCreate}>Create</button>
      </form>
      )}
    </main>
  );
}