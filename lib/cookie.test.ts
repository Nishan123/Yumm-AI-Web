import { setAuthToken, getAuthToken, setUserData, getUserData, clearAuthCookies } from './cookie';
import { cookies } from 'next/headers';

// Mock next/headers
jest.mock('next/headers', () => ({
    cookies: jest.fn(),
}));

describe('cookie utils', () => {
    let mockSet: jest.Mock;
    let mockGet: jest.Mock;
    let mockDelete: jest.Mock;

    beforeEach(() => {
        mockSet = jest.fn();
        mockGet = jest.fn();
        mockDelete = jest.fn();
        (cookies as jest.Mock).mockResolvedValue({
            set: mockSet,
            get: mockGet,
            delete: mockDelete,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('setAuthToken', () => {
        it('should set the auth_token cookie with correct options', async () => {
            await setAuthToken('test-token');
            expect(cookies).toHaveBeenCalled();
            expect(mockSet).toHaveBeenCalledWith({
                name: 'auth_token',
                value: 'test-token',
                httpOnly: true,
                path: '/',
                sameSite: 'lax',
            });
        });
    });

    describe('getAuthToken', () => {
        it('should return the token if it exists', async () => {
            mockGet.mockReturnValue({ value: 'existing-token' });
            const token = await getAuthToken();
            expect(mockGet).toHaveBeenCalledWith('auth_token');
            expect(token).toBe('existing-token');
        });

        it('should return undefined if token does not exist', async () => {
            mockGet.mockReturnValue(undefined);
            const token = await getAuthToken();
            expect(token).toBeUndefined();
        });
    });

    describe('setUserData', () => {
        it('should stringify and set user_data cookie', async () => {
            const userData = { id: 1, name: 'Alice' };
            await setUserData(userData);
            expect(mockSet).toHaveBeenCalledWith({
                name: 'user_data',
                value: JSON.stringify(userData),
                httpOnly: true,
                path: '/',
                sameSite: 'lax',
            });
        });
    });

    describe('getUserData', () => {
        it('should parse and return user data if it exists and is valid JSON', async () => {
            mockGet.mockReturnValue({ value: '{"id":1,"name":"Alice"}' });
            const data = await getUserData();
            expect(mockGet).toHaveBeenCalledWith('user_data');
            expect(data).toEqual({ id: 1, name: 'Alice' });
        });

        it('should return null if user data does not exist', async () => {
            mockGet.mockReturnValue(undefined);
            const data = await getUserData();
            expect(data).toBeNull();
        });

        it('should return null if user data is invalid JSON', async () => {
            mockGet.mockReturnValue({ value: 'invalid-json' });
            const data = await getUserData();
            expect(data).toBeNull();
        });
    });

    describe('clearAuthCookies', () => {
        it('should delete auth_token and user_data cookies', async () => {
            await clearAuthCookies();
            expect(mockDelete).toHaveBeenCalledWith('auth_token');
            expect(mockDelete).toHaveBeenCalledWith('user_data');
        });
    });
});
