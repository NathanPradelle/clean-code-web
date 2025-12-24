//Domaine Card
//c'est ce qui va etre utilisé dans l'interface utilisateur
export interface Card {
    id: string;
    question: string;
    answer: string;
    tag?: string;
    category: number;
    isLearned: boolean;
}