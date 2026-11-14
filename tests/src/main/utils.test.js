import { describe, test, expect } from '@jest/globals';

import { toRegExp } from '../../../src/main/utils.js';

describe('utils.js function tests', () => {
    test('toRegExp method', () => {
        const result = toRegExp('/Hello, World!/g');

        expect(result.flags).toBe('g');
        expect(result.source).toBe('Hello, World!');
    });
});
