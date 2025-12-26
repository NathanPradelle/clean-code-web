/**
 * Représente les différentes étapes de progression d'une carte 
 * selon le système de répétition espacée (Leitner).
 */
export type CardCategoryApi =
    | 'FIRST'
    | 'SECOND'
    | 'THIRD'
    | 'FOURTH'
    | 'FIFTH'
    | 'SIXTH'
    | 'SEVENTH'
    | 'DONE';

/**
 * Structure de donnée d'une carte telle que retournée par l'API.
 */
export interface CardApi {
    id: string;
    question: string;
    answer: string;
    tag?: string;
    category: CardCategoryApi;
    userId: string;
}
/**
 * Données requises pour la création d'une nouvelle carte via l'API.
 */
export interface CreateCardApi {
    question: string;
    answer: string;
    tag?: string; // Optionnel
    userId: string
}