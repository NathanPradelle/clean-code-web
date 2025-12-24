import { CardApi, CardCategoryApi } from "../cards/cards.type";
import { Card } from "../../domain/card";

//Permet de mapper les categories de l'api vers les categories du domaine
const categoryMap: Record<CardCategoryApi, number> = {
    FIRST: 1,
    SECOND: 2,
    THIRD: 3,
    FOURTH: 4,
    FIFTH: 5,
    SIXTH: 6,
    SEVENTH: 7,
    DONE: 8,
}

//Permet de mapper les cartes de l'api vers les cartes du domaine
export function mapCardApiToDomain(api: CardApi): Card {
    return {
        id: api.id,
        question: api.question,
        answer: api.answer,
        tag: api.tag,
        category: categoryMap[api.category],
        isLearned: api.category === 'DONE',
    }
}