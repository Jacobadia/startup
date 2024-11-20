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
                        <ul>
                            <li><NavLink className='nav-link' to="/">Login</NavLink></li>
                            <li><NavLink className='nav-link' to="/inventory">Inventory</NavLink></li>
                            <li><NavLink className='nav-link' to="/about">About</NavLink></li>
                        </ul>
                    </nav>
                    <hr />
                </header>

                  <Routes>
                      <Route path="/" element={<Login />} />
                      <Route path="/inventory" element={<Inventory />} />
                      <Route path="/about" element={<About />} />
                      <Route path='*' element={<NotFound />} />
                  </Routes>

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


  function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
  