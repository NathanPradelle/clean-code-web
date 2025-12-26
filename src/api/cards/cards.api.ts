import { getJson, postJson } from "../httpClient";
import { CardApi, CreateCardApi } from "../cards/cards.type";
import { mapCardApiToDomain } from "../cards/cards.mapper";
import { Card } from "../../domain/cards/card";

/**
 * GET /cards
 * 
 * Récupère la liste des cartes depuis l'API, avec un filtre optionnel par tag.
 * 
 * @param tag - Le tag de la carte à récupérer.
 * @returns La liste des cartes.
 */
export async function fetchCards(tag?: string): Promise<Card[]> {
    const endpoint = tag ? `/cards?tags=${tag}` : '/cards';

    const rawCards = await getJson<CardApi[]>(endpoint);

    return rawCards.map(mapCardApiToDomain);
}

/**
 * POST /cards
 * 
 * Crée une nouvelle carte dans l'API.
 * 
 * @param cardToCreate - Les données de la carte à créer.
 * @returns La carte créée.
 */
export async function createCard(cardToCreate: CreateCardApi): Promise<Card> {
    const cardApi = await postJson<CardApi>('/cards', cardToCreate);
    return mapCardApiToDomain(cardApi);
}