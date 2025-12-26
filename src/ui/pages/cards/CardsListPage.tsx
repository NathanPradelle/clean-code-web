import React, { useEffect, useState } from 'react';
import { Card } from '@/domain/cards/card';
import { fetchCards } from '@/api/cards/cards.api';
import './CardsList.css';

export const CardsListPage: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [allTags, setAllTags] = useState<string[]>([]);
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadCards = async (tag?: string) => {
        setIsLoading(true);
        try {
            const data = await fetchCards(tag);
            setCards(data);

            // Si on charge tout, on extrait la liste des tags uniques pour le menu
            if (!tag) {
                const tags = data
                    .map(c => c.tag)
                    .filter((t): t is string => !!t);
                setAllTags(Array.from(new Set(tags)));
            }
        } catch (error) {
            console.error("Erreur API", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { loadCards(); }, []);

    const toggleTag = (tag: string) => {
        const newTag = activeTag === tag ? null : tag;
        setActiveTag(newTag);
        loadCards(newTag || undefined);
    };

    return (
        <div className="list-container">
            <header className="list-header">
                <h1>Ma Bibliothèque de Savoir</h1>

                {/* Liste des tags cliquables (seulement si des tags existent) */}
                {allTags.length > 0 && (
                    <div className="tag-filter-cloud">
                        <button
                            className={`tag-pill ${!activeTag ? 'active' : ''}`}
                            onClick={() => { setActiveTag(null); loadCards(); }}
                        >
                            Tout voir
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                className={`tag-pill ${activeTag === tag ? 'active' : ''}`}
                                onClick={() => toggleTag(tag)}
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                )}
            </header>

            {isLoading ? (
                <div className="loader-container"><div className="spinner"></div></div>
            ) : (
                <div className="cards-grid">
                    {cards.map(card => (
                        <div key={card.id} className={`card-tile cat-${card.category}`}>
                            <div className="card-top">
                                <span className="category-label">Boîte {card.category}</span>
                                {card.isLearned && <span className="learned-icon">🎓</span>}
                            </div>
                            <div className="card-body">
                                <h3>{card.question}</h3>
                                <div className="divider"></div>
                                <p className="answer-text">{card.answer}</p>
                            </div>
                            {card.tag && (
                                <div className="card-footer">
                                    <span className="card-tag">#{card.tag}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};