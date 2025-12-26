import { User } from "@/domain/users/users";
import { UserApi } from "./users.type";

export function mapUserApiToDomain(userApi: UserApi): User {
    return {
        id: userApi.id,
        username: userApi.username,
        email: userApi.email,
        password: userApi.password,
        role: userApi.role,
    }
}   