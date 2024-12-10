import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Inventory } from './inventory/inventory';
import { About } from './about/about';
import { UserProvider, UserContext } from './UserContext';

export default function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <div>
                    <header>
                        <h1>TTRPG Inventory Manager</h1>
                        <Navigation />
                        <hr />
                    </header>

                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>

                    <footer>
                        <hr />
                        <span>Jacob E. Martinez</span>
                        <br />
                        <a href="https://github.com/Jacobadia/startup">GitHub</a>
                    </footer>
                </div>
            </BrowserRouter>
        </UserProvider>
    );
}

function Navigation() {
    const { username } = useContext(UserContext);
    console.log('Username:', username); // Debugging

    return (
        <nav>
            <ul>
                <li><NavLink className='nav-link' to="/">Login</NavLink></li>
                {username ? (
                    <li><NavLink className='nav-link' to="/inventory">Inventory</NavLink></li>
                ) : null}
                <li><NavLink className='nav-link' to="/about">About</NavLink></li>
            </ul>
        </nav>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
