import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCard } from '@/api/cards/cards.api';
import { CreateCardApi } from '@/api/cards/cards.type';
import './CreateCard.css';

export const CreateCardPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CreateCardApi>({
        question: '',
        answer: '',
        tag: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            //Appel à la fonction createCard
            await createCard(formData);
            //redirection vers la page de liste des fiches
            navigate('/cards');
        } catch (error) {
            alert("Erreur lors de la création de la fiche. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2>Créer une nouvelle fiche</h2>
                <p className="form-subtitle">Elle sera automatiquement placée en Catégorie 1</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="question">Question (Recto)</label>
                        <textarea
                            id="question"
                            name="question"
                            required
                            placeholder="Ex: Qu'est-ce que le DDD ?"
                            value={formData.question}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="answer">Réponse (Verso)</label>
                        <textarea
                            id="answer"
                            name="answer"
                            required
                            placeholder="Ex: Domain Driven Design..."
                            value={formData.answer}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tag">Tag personnalisé (Optionnel)</label>
                        <input
                            type="text"
                            id="tag"
                            name="tag"
                            placeholder="Ex: Architecture"
                            value={formData.tag}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="secondary" onClick={() => navigate('/')}>
                            Annuler
                        </button>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Création...' : 'Enregistrer la fiche'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};