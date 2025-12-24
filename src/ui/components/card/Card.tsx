import React, { useState } from 'react';
import { Card } from '../../../domain/card';
import './Card.css';

interface FlashcardProps {
    card: Card;
    onAnswer: (isValid: boolean) => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({ card, onAnswer }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="flashcard-container">
            <div className={`card-content ${isFlipped ? 'flipped' : ''}`}>
                {/* RECTO : La Question */}
                {!isFlipped ? (
                    <div className="card-front">
                        <h3>Question</h3>
                        <p>{card.question}</p>
                        <button onClick={() => setIsFlipped(true)}>
                            Afficher la réponse
                        </button>
                    </div>
                ) : (
                    /* VERSO : La Réponse + Auto-évaluation */
                    <div className="card-back">
                        <h3>Réponse attendue</h3>
                        <p>{card.answer}</p>

                        <div className="actions">
                            <button className="btn-error" onClick={() => onAnswer(false)}>
                                Incorrect (Catégorie 1) [cite: 56]
                            </button>
                            <button className="btn-success" onClick={() => onAnswer(true)}>
                                Correct (Catégorie suivante) [cite: 57]
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};