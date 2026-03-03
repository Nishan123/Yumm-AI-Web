import { renderHook } from '@testing-library/react';
import { usePantryInventory } from './usePantryInventory';

jest.mock('@/data/mockIngredients', () => ({
    MOCK_INGREDIENTS: [
        { id: '1', ingredientName: 'Tomato', prefixImage: 'tomato.jpg' },
        { id: '2', ingredientName: 'Potato', prefixImage: 'potato.jpg' }
    ]
}));

describe('usePantryInventory', () => {
    it('should return empty array if shopping list is empty', () => {
        const { result } = renderHook(() => usePantryInventory([]));
        expect(result.current).toEqual([]);
    });

    it('should return empty array if no checked items', () => {
        const list = [
            { id: 'i1', ingredientId: '1', isChecked: false, quantity: 1, unit: 'kg', name: 'Tomato' }
        ];
        // @ts-ignore
        const { result } = renderHook(() => usePantryInventory(list));
        expect(result.current).toEqual([]);
    });

    it('should correctly map checked items to inventory from mock ingredients', () => {
        const list = [
            { id: 'i1', ingredientId: '1', isChecked: true, quantity: 2, unit: 'kg', name: 'Tomato' },
            { id: 'i2', ingredientId: '3', isChecked: true, quantity: 1, unit: 'pk', name: 'Unknown' }
        ];
        // @ts-ignore
        const { result } = renderHook(() => usePantryInventory(list));

        expect(result.current).toHaveLength(1);
        expect(result.current[0]).toEqual({
            id: '1',
            ingredientName: 'Tomato',
            prefixImage: 'tomato.jpg',
            quantity: 2,
            unit: 'kg'
        });
    });

    it('should filter out items that donot map to valid ingredients', () => {
        const list = [
            { id: 'i2', ingredientId: '3', isChecked: true, quantity: 1, unit: 'pk', name: 'Unknown' }
        ];
        // @ts-ignore
        const { result } = renderHook(() => usePantryInventory(list));
        expect(result.current).toEqual([]);
    });
});
