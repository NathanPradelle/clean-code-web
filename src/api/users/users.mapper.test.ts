import { describe, it, expect } from 'vitest';
import { mapUserApiToDomain } from './users.mapper';
import { UserApi } from './users.type';

describe('UserMapper', () => {
    it('should map UserApi to User domain model correctly', () => {
        const apiUser: UserApi = {
            id: '1',
            username: 'admin',
            email: 'admin@admin.fr',
            password: 'admin123',
            role: 'admin'
        };

        const result = mapUserApiToDomain(apiUser);

        expect(result).toEqual({
            id: '1',
            username: 'admin',
            email: 'admin@admin.fr',
            password: 'admin123',
            role: 'admin'
        });
    });
});