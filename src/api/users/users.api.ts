import { User } from "@/domain/users/users";
import { mapUserApiToDomain } from "./users.mapper";

export async function getCurrentUser(): Promise<User | null> {
    const userApi = {
        id: '1',
        username: 'admin',
        email: 'admin@admin.fr',
        password: 'admin123',
        role: 'admin',
    }

    return mapUserApiToDomain(userApi);
}
