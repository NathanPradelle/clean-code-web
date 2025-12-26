import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">Leitner System</Link>
            <ul className="navbar-links">
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/cards">Mes Fiches</Link></li>
                <li><Link to="/create-card">Nouvelle Fiche</Link></li>
                <li><Link to="/quizz" className="btn-quizz">Lancer le Quiz</Link></li>
            </ul>
        </nav>
    );
};