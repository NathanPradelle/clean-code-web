import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="homepage-container">

            <header className="hero-section">
                <h1>Optimisez votre apprentissage</h1>
                <p>
                    Maîtrisez n'importe quel sujet grâce à la répétition espacée
                    et au système de Leitner.
                </p>
                <div className="cta-group">
                    <button onClick={() => navigate('/quizz')}>
                        Commencer le quiz du jour
                    </button>
                    <button className="secondary" onClick={() => navigate('/create-card')}>
                        Ajouter une fiche
                    </button>
                </div>
            </header>

            <section className="features-grid">
                <div className="feature-card">
                    <h3>7 Catégories</h3>
                    <p>Progressez de la catégorie 1 à 7 pour ancrer vos connaissances.</p>
                </div>
                <div className="feature-card">
                    <h3>Auto-évaluation</h3>
                    <p>Comparez vos réponses et validez votre progression honnêtement.</p>
                </div>
                <div className="feature-card">
                    <h3>Gestion par Tags</h3>
                    <p>Organisez vos fiches par thématiques pour des révisions ciblées.</p>
                </div>
            </section>
        </div>
    );
};