import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [username, setUsername] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginOrCreate = () => {}

  const handleContinue = () => {}


  return (
    <main>
      <h1>Welcome to TTRPG Inventory</h1>
      <form method="get" action="inventory.html">
        <div>
          <span>Username</span>
          <input type="text" placeholder="Username" />
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