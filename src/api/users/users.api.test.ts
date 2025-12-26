import { describe, it, expect } from 'vitest';
import { getCurrentUser } from './users.api';

describe('Users API Service', () => {
    it('should return the current authenticated user', async () => {
        const user = await getCurrentUser();

        expect(user).not.toBeNull();
        expect(user?.id).toBe('1');
        expect(user?.username).toBe('admin');
        expect(user?.role).toBe('admin');
    });
});