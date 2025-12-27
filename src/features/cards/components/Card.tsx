import React, { useState } from 'react';
import { Card } from '../../../domain/cards/card';
import './Card.css';

interface FlashcardProps {
    card: Card;
    onAnswer: (isValid: boolean) => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({ card, onAnswer }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [userResponse, setUserResponse] = useState('');

    const handleFlip = () => {
        if (userResponse.trim() !== "") {
            setIsFlipped(true);
        } else {
            alert("Essayez de formuler une réponse avant de retourner la carte !");
        }
    };

    return (
        <div className="flashcard-container">
            <div className={`card-content ${isFlipped ? 'flipped' : ''}`}>

                {/* RECTO : Question + Saisie */}
                {!isFlipped ? (
                    <div className="card-side">
                        <span className="card-tag">Catégorie {card.category}</span>
                        <h3>Question</h3>
                        <p className="question-text">{card.question}</p>

                        <div className="input-group">
                            <label htmlFor="user-answer">Votre réponse :</label>
                            <textarea
                                id="user-answer"
                                placeholder="Tapez votre réponse ici pour vous tester..."
                                value={userResponse}
                                onChange={(e) => setUserResponse(e.target.value)}
                            />
                        </div>

                        <button className="btn-flip" onClick={handleFlip}>
                            Vérifier la réponse
                        </button>
                    </div>
                ) : (
                    /* VERSO : Comparaison + Auto-évaluation */
                    <div className="card-side">
                        <h3>Comparaison</h3>

                        <div className="comparison-box">
                            <div className="comparison-item">
                                <span>Votre réponse :</span>
                                <p className="user-provided">{userResponse}</p>
                            </div>
                            <div className="comparison-item">
                                <span>Réponse attendue :</span>
                                <p className="correct-answer">{card.answer}</p>
                            </div>
                        </div>

                        <p className="eval-prompt">Ma réponse était-elle correcte ?</p>

                        <div className="actions">
                            <button className="btn-error" onClick={() => onAnswer(false)}>
                                Non
                            </button>
                            <button className="btn-success" onClick={() => onAnswer(true)}>
                                Oui ( direction catégorie {card.category + 1} !!)
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};