import { User } from "./users";

export interface UserRepository {
    getCurrentUser(): User | null;
    setCurrentUser(user: User): void;
    removeCurrentUser(): void;
}   