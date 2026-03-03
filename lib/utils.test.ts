import { cn } from './utils';

describe('utils', () => {
    describe('cn', () => {
        it('should merge classes correctly', () => {
            expect(cn('class1', 'class2')).toBe('class1 class2');
        });

        it('should resolve tailwind conflicts', () => {
            expect(cn('p-4', 'p-8')).toBe('p-8');
            expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
        });

        it('should conditionally apply classes', () => {
            expect(cn('font-bold', true && 'text-lg', false && 'text-sm')).toBe('font-bold text-lg');
        });

        it('should handle array of classes', () => {
            expect(cn(['flex', 'items-center'])).toBe('flex items-center');
        });

        it('should ignore null and undefined values', () => {
            expect(cn('p-4', null, undefined, 'text-center')).toBe('p-4 text-center');
        });

        it('should handle empty strings and false values', () => {
            expect(cn('text-sm', '', false, 'm-4')).toBe('text-sm m-4');
        });
    });
});
