import { renderHook, act } from '@testing-library/react';
import { useUserCache } from './useUserCache';
import * as cookies from '@/lib/cookies';

jest.mock('@/lib/cookies', () => ({
    getCookie: jest.fn(),
    setCookie: jest.fn(),
}));

describe('useUserCache', () => {
    const mockUser = { uid: '123', email: 'test@test.com' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with null', () => {
        (cookies.getCookie as jest.Mock).mockReturnValue(null);
        const { result } = renderHook(() => useUserCache());
        expect(result.current.cachedUser).toBeNull();
    });

    it('should load user from cookie on mount', () => {
        (cookies.getCookie as jest.Mock).mockReturnValue(JSON.stringify(mockUser));
        const { result } = renderHook(() => useUserCache());
        expect(result.current.cachedUser).toEqual(mockUser);
    });

    it('should handle invalid JSON in cookie gracefully', () => {
        (cookies.getCookie as jest.Mock).mockReturnValue('invalid-json');
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        const { result } = renderHook(() => useUserCache());

        expect(result.current.cachedUser).toBeNull();
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });

    it('should update cache and cookie when updateCache is called', () => {
        (cookies.getCookie as jest.Mock).mockReturnValue(null);
        const { result } = renderHook(() => useUserCache());

        act(() => {
            // @ts-ignore
            result.current.updateCache(mockUser);
        });

        expect(result.current.cachedUser).toEqual(mockUser);
        expect(cookies.setCookie).toHaveBeenCalledWith('auth_user', JSON.stringify(mockUser));
    });
});
