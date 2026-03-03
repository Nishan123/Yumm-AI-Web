import { renderHook, act } from '@testing-library/react';
import { useRecipeLike } from './useRecipeLike';
import { useAuth } from '@/lib/context/auth-context';
import { toggleSaveRecipeAction } from '@/lib/actions/recipe-action';
import { toast } from 'sonner';

jest.mock('@/lib/context/auth-context');
jest.mock('@/lib/actions/recipe-action', () => ({
    toggleSaveRecipeAction: jest.fn(),
}));
jest.mock('sonner', () => ({ toast: { error: jest.fn() } }));

const mockUseAuth = useAuth as jest.Mock;
const mockToggleSaveRecipeAction = toggleSaveRecipeAction as jest.Mock;

describe('useRecipeLike', () => {
    const mockRecipe = { recipeId: '1', likes: ['user1'] };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with false if no user', () => {
        mockUseAuth.mockReturnValue({ user: null });
        // @ts-ignore
        const { result } = renderHook(() => useRecipeLike(mockRecipe));
        expect(result.current.isLiked).toBe(false);
    });

    it('should initialize with false if user not in likes', () => {
        mockUseAuth.mockReturnValue({ user: { uid: 'user2' } });
        // @ts-ignore
        const { result } = renderHook(() => useRecipeLike(mockRecipe));
        expect(result.current.isLiked).toBe(false);
    });

    it('should initialize with true if user in likes', () => {
        mockUseAuth.mockReturnValue({ user: { uid: 'user1' } });
        // @ts-ignore
        const { result } = renderHook(() => useRecipeLike(mockRecipe));
        expect(result.current.isLiked).toBe(true);
    });

    it('should show toast error if unauthenticated user tries to toggle', async () => {
        mockUseAuth.mockReturnValue({ user: null });
        // @ts-ignore
        const { result } = renderHook(() => useRecipeLike(mockRecipe));

        await act(async () => {
            await result.current.toggleLike();
        });

        expect(toast.error).toHaveBeenCalledWith('Please login to save recipes');
        expect(mockToggleSaveRecipeAction).not.toHaveBeenCalled();
    });

    it('should toggle optimistically and call API', async () => {
        mockUseAuth.mockReturnValue({ user: { uid: 'user1' } });
        mockToggleSaveRecipeAction.mockResolvedValue({});

        // @ts-ignore
        const { result } = renderHook(() => useRecipeLike(mockRecipe));

        await act(async () => {
            await result.current.toggleLike();
        });

        expect(result.current.isLiked).toBe(false); // Was true, toggled to false
        expect(mockToggleSaveRecipeAction).toHaveBeenCalledWith('1');
    });

    it('should revert state if API call fails', async () => {
        mockUseAuth.mockReturnValue({ user: { uid: 'user1' } });
        mockToggleSaveRecipeAction.mockRejectedValue(new Error('API error'));

        // @ts-ignore
        const { result } = renderHook(() => useRecipeLike(mockRecipe));

        await act(async () => {
            await result.current.toggleLike();
        });

        expect(result.current.isLiked).toBe(true); // Reverted back to true
        expect(toast.error).toHaveBeenCalledWith('API error');
    });
});
