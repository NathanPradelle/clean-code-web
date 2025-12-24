
import { CardApi } from "../cards/cards.type";

/**
 * Type représentant une carte renvoyée par l'API
 * dans le cadre d'un quizz
 */
export type QuizzCardApi = CardApi;


/**
 * Payload pour répondre à une carte
 */
export interface AnswerCardApi {
    isValid: boolean;
}
