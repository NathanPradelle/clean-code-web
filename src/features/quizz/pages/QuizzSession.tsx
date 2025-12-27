import React, { useState, useEffect } from 'react';
import { Card } from '../../../domain/cards/card';
import { fetchQuizzCards, answerCard } from '../../../api/learning/learning.api';
import { Flashcard } from '../../cards/components/Card';
import './QuizzSession.css';

export const QuizSession: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //Chargement des cartes du quizz du jour
        fetchQuizzCards().then((data) => {
            setCards(data);
            setIsLoading(false);
        });
    }, []);

    const handleAnswer = async (isValid: boolean) => {
        const currentCard = cards[currentIndex];
        setIsLoading(true); // Optionnel : indiquer que l'envoi est en cours

        try {
            // Envoi de la réponse au serveur pour mise à jour de la catégorie [cite: 56, 57]
            await answerCard(currentCard.id, isValid);

            // On ne passe à la carte suivante que si l'API a validé le changement
            setCurrentIndex((prev) => prev + 1);
        } catch (error) {
            console.error("Erreur API:", error);
            alert("Impossible de valider la réponse. Vérifiez votre connexion au serveur.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div>Chargement du quiz...</div>;

    // Cas où l'utilisateur a fini ou n'a plus de fiches pour aujourd'hui
    if (cards.length === 0 || currentIndex >= cards.length) {
        return (
            <div className="quiz-finished">
                <h2>Félicitations !</h2>
                <p>Vous avez terminé votre session quotidienne.</p>
            </div>
        );
    }

    return (
        <div className="quiz-session">
            <p>Carte {currentIndex + 1} / {cards.length}</p>
            <Flashcard
                card={cards[currentIndex]}
                onAnswer={handleAnswer}
            />
        </div>
    );
};