import { describe, it, expect } from 'vitest';
import { mapCardApiToDomain } from './cards.mapper';
import { CardApi } from './cards.type';

describe('Cards Mapper', () => {
    it('should map a raw API card to a Domain card correctly', () => {
        // Données d'entrée (format API)
        const apiCard: CardApi = {
            id: 'uuid-123',
            question: 'What is DDD?',
            answer: 'Domain Driven Design',
            tag: 'Architecture',
            category: 'SECOND'
        };

        // Exécution du mapping
        const result = mapCardApiToDomain(apiCard);

        // Vérifications
        expect(result.id).toBe('uuid-123');
        expect(result.question).toBe('What is DDD?');
        expect(result.category).toBe(2);
        expect(result.isLearned).toBe(false);
    });

    it('should correctly identify a learned card when category is DONE', () => {
        const apiCard: CardApi = {
            id: 'uuid-456',
            question: 'Finished?',
            answer: 'Yes',
            category: 'DONE'
        };

        const result = mapCardApiToDomain(apiCard);

        expect(result.category).toBe(8);
        expect(result.isLearned).toBe(true);
    });

    it('should handle optional tags correctly', () => {
        const apiCard: CardApi = {
            id: 'uuid-789',
            question: 'No tag?',
            answer: 'No tag.',
            category: 'FIRST'
        };

        const result = mapCardApiToDomain(apiCard);

        expect(result.tag).toBeUndefined();
    });
});