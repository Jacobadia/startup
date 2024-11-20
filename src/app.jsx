import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
<div>
    <header>
      <h1>TTRPG Inventory Manager</h1>
      <nav>
        <menu>
          <li><a href="index.html">Login Page</a></li>
          <li><a href="inventory.html">Inventory</a></li>
          <li><a href="about.html">About</a></li>
        </menu>
      </nav>

      <hr />
    </header>
 
        <main>App components go here</main>
  
    <footer>
      <hr />
      <span>Jacob E. Martinez</span>
      <br />
      <a href="https://github.com/Jacobadia/startup">GitHub</a>
    </footer>
  </div>
    );
  }