import { getJson, patchJson } from "../httpClient";
import { Card } from "../../domain/cards/card";
import { CardApi } from "../cards/cards.type";
import { mapCardApiToDomain } from "../cards/cards.mapper";
import { AnswerCardApi } from '../learning/learning.type';

/**
 * Récupère les cartes pour le quiz
 * @param date - La date de la carte
 * @returns La liste des cartes du quizz
 */
export async function fetchQuizzCards(date?: string): Promise<Card[]> {
    const endpoint = date ? `/cards/quizz?date=${date}` : '/cards/quizz';

    const rawCards = await getJson<CardApi[]>(endpoint);

    return rawCards.map(mapCardApiToDomain);
}

/**
 * Répond à une carte
 * @param cardId - L'identifiant de la carte
 * @param isValid - Si la réponse est correcte
 */
export async function answerCard(cardId: string, isValid: boolean): Promise<void> {
    const payload: AnswerCardApi = { isValid };

    const res = await patchJson(`/cards/${cardId}/answer`, payload);
    console.log(res);
}