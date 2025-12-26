import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchCards, createCard } from './cards.api';
import { CreateCardApi } from './cards.type';

describe('Cards API Service', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    })
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    describe('fetchCards', () => {
        it('should fetch, map and return a list of multiple cards', async () => {
            const mockApiCards = [{
                id: '6c10ad48-2bb8-4e2e-900a-21d62c00c05k',
                question: 'Q1',
                answer: 'A1',
                category: 'FIRST'
            },
            {
                id: '6c10ad48-2bb8-4e2e-900a-21d62c00c05l',
                question: 'Q2',
                answer: 'A2',
                category: 'SECOND'
            },
            {
                id: '6c10ad48-2bb8-4e2e-900a-21d62c00c05m',
                question: 'Q3',
                answer: 'A3',
                category: 'THIRD'
            }
            ];

            vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
                ok: true,
                json: async () => mockApiCards,
            }));

            const cards = await fetchCards()
            expect(cards).toHaveLength(3);

            expect(cards[0].id).toBe("6c10ad48-2bb8-4e2e-900a-21d62c00c05k");
            expect(cards[0].question).toBe("Q1");
            expect(cards[0].answer).toBe("A1");
            expect(cards[0].category).toBe(1);
            expect(typeof cards[0].category).toBe('number');

            expect(cards[1].id).toBe("6c10ad48-2bb8-4e2e-900a-21d62c00c05l");
            expect(cards[1].question).toBe("Q2");
            expect(cards[1].answer).toBe("A2");
            expect(cards[1].category).toBe(2);
            expect(typeof cards[1].category).toBe('number');

            expect(cards[2].id).toBe("6c10ad48-2bb8-4e2e-900a-21d62c00c05m");
            expect(cards[2].question).toBe("Q3");
            expect(cards[2].answer).toBe("A3");
            expect(cards[2].category).toBe(3);
            expect(typeof cards[2].category).toBe('number');

            vi.unstubAllGlobals();
        })
        it('should call the API with the correct tag parameter', async () => {
            const tag = 'tag';
            const mockApiCards = [
                {
                    id: '6c10ad48-2bb8-4e2e-900a-21d62c00c05l',
                    question: 'Q2',
                    answer: 'A2',
                    tag: 'tag',
                    category: 'SECOND'
                }
            ];

            vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
                ok: true,
                json: async () => mockApiCards,
            }));

            const cards = await fetchCards(tag)
            expect(cards).toHaveLength(1);
            expect(cards[0].tag).toBe('tag');

            expect(cards[0].id).toBe("6c10ad48-2bb8-4e2e-900a-21d62c00c05l");
            expect(cards[0].question).toBe("Q2");
            expect(cards[0].answer).toBe("A2");
            expect(cards[0].category).toBe(2);
            expect(typeof cards[0].category).toBe('number');


        })
    })

    describe('createCard', () => {
        beforeEach(() => {
            vi.stubGlobal('fetch', vi.fn());
        });

        afterEach(() => {
            vi.unstubAllGlobals();
        });
        it('should create a card and return the domain model', async () => {
            const cardToCreate: CreateCardApi = {
                question: 'What is Hexagonal Architecture?',
                answer: 'A pattern that isolates the core logic from external concerns.',
                tag: 'tag',
                userId: '1',
            };

            const mockApiResponse = {
                ...cardToCreate,
                id: '6c10ad48-2bb8-4e2e-900a-21d62c00c05k',
                category: 'FIRST'
            };

            vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
                ok: true,
                status: 201,
                json: async () => mockApiResponse,
            }));

            const card = await createCard(cardToCreate)

            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/cards'),
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cardToCreate),
                })
            );

            expect(card.id).toBe('6c10ad48-2bb8-4e2e-900a-21d62c00c05k');
            expect(card.category).toBe(1); // 'FIRST' est devenu 1 via le mapper
            expect(card.question).toBe(cardToCreate.question);
            expect(card.tag).toBe(cardToCreate.tag);
        })
        it('should throw an error when API response is not ok', async () => {
            // Simulation d'une erreur 400 (ex: question vide) 
            (fetch as any).mockResolvedValue({
                ok: false,
                status: 400,
            });

            const invalidCard = { question: '', answer: '', tag: '', userId: '' };

            // On vérifie que la promesse est rejetée avec le bon message
            await expect(createCard(invalidCard)).rejects.toThrow('HTTP 400');
        });
    })
})