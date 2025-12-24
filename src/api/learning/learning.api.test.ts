import { describe, it, expect, vi } from 'vitest';
import { fetchQuizzCards, answerCard } from './learning.api';


describe('Learning API Service', () => {
    it('should correctly map API cards to domain cards', async () => {
        const apiCards = [
            {
                id: '6c10ad48-2bb8-4e2e-900a-21d62c00c07b',
                question: 'What is the capital of France?',
                answer: 'Paris',
                tag: 'Geography',
                category: 'FIRST',
            },
            {
                id: '6c10ad48-2bb8-4e2e-900a-21d62c00c08e',
                question: 'What is Pair programming?',
                answer: 'Pair programming is a software development technique in which two programmers work together at the same time.',
                category: 'THIRD',
            }
        ];

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: async () => apiCards,
        }));

        const cards = await fetchQuizzCards();

        expect(cards[0].id).toBe("6c10ad48-2bb8-4e2e-900a-21d62c00c07b");
        expect(cards[0].question).toBe("What is the capital of France?");
        expect(cards[0].answer).toBe("Paris");
        expect(cards[0].tag).toBe("Geography");
        expect(cards[0].category).toBe(1);
        expect(typeof cards[0].category).toBe('number');

        expect(cards[1].id).toBe("6c10ad48-2bb8-4e2e-900a-21d62c00c08e");
        expect(cards[1].question).toBe("What is Pair programming?");
        expect(cards[1].answer).toBe("Pair programming is a software development technique in which two programmers work together at the same time.");
        expect(cards[1].category).toBe(3);
        expect(cards[1].tag).toBe(undefined);
        expect(typeof cards[1].category).toBe('number');

        vi.unstubAllGlobals();
    })
})

describe('answerCard', () => {
    it('should send a PATCH request to the API with the correct format', async () => {

        const cardId = '6c10ad48-2bb8-4e2e-900a-21d62c00c07b';
        const isValid = true;

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            status: 204,
        }));

        await answerCard(cardId, isValid);

        expect(fetch).toHaveBeenCalledWith(`/cards/${cardId}/answer`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isValid }),
        });

        vi.unstubAllGlobals();
    })
})  