import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Inventory } from './inventory/inventory';
import { About } from './about/about';

export default function App() {
    return (
    <BrowserRouter>
<div>
    <header>
      <h1>TTRPG Inventory Manager</h1>
      <nav>
        <menu>
          <li><NavLink to='Login'>Login</NavLink></li>
          <li><NavLink to='Inventory'>Inventory</NavLink></li>
          <li><NavLink to='About'>About</NavLink></li>
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
  </BrowserRouter>
    );
  }