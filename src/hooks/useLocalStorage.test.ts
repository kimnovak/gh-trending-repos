import { renderHook } from '@testing-library/react-hooks/pure';
import useLocalStorage from './useLocalStorage';
import { waitFor } from '@testing-library/react';

Object.defineProperty(window, 'localStorage', {
    value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
    },
});

describe('useLocalStorage', () => {
    it('should update value correctly', async () => {
        const { result } = renderHook(() => useLocalStorage('key', 'value'));
        const [value, setValue] = result.current;
        expect(value).toBe('value');
        await waitFor(() => setValue('new value'));
        expect(result.current[0]).toBe('new value');
    });
});
