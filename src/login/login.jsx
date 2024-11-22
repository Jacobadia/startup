import React from 'react';

export function Login() {
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