import { describe, test, expect } from '@jest/globals';

import { STAssert } from '../../../src/main/st-assert.js';


const { SlashCommandClosure } = getUnstableContext.module('@slash-commands/SlashCommandClosure');


describe('STAssert assertion methods', () => {
    describe('Assertion tests', () => {
        test('assert method', () => {
            expect(() => STAssert.assert(true, 'This is a test')).not.toThrow();
            expect(() => STAssert.assert(false, 'This is a test')).toThrow('This is a test');
        });

        test('isString method', () => {
            expect(() => STAssert.isString('Hello, World!', 'This is a test')).not.toThrow();
            expect(() => STAssert.isString(123, 'This is a test')).toThrow('This is a test');
        });

        test('isNumber method', () => {
            expect(() => STAssert.isNumber(123, 'This is a test')).not.toThrow();
            expect(() => STAssert.isNumber('Hello, World!', 'This is a test')).toThrow('This is a test');
        });

        test('isBoolean method', () => {
            expect(() => STAssert.isBoolean(true, 'This is a test')).not.toThrow();
            expect(() => STAssert.isBoolean('Hello, World!', 'This is a test')).toThrow('This is a test');
        });

        describe('Array tests', () => {
            test('isArray method', () => {
                expect(() => STAssert.isArray([1, 2, 3], 'This is a test')).not.toThrow();
                expect(() => STAssert.isArray('Hello, World!', 'This is a test')).toThrow('This is a test');
            });

            test('isStringArray method', () => {
                expect(() => STAssert.isStringArray(['Hello, World!'], 'This is a test')).not.toThrow();
                expect(() => STAssert.isStringArray([1, 2, 3], 'This is a test')).toThrow('This is a test');
                expect(() => STAssert.isStringArray('Hello, World!', 'This is a test')).toThrow('This is a test');
            });

            test('isNumberArray method', () => {
                expect(() => STAssert.isNumberArray([1, 2, 3], 'This is a test')).not.toThrow();
                expect(() => STAssert.isNumberArray(['Hello, World!'], 'This is a test')).toThrow('This is a test');
                expect(() => STAssert.isNumberArray(123, 'This is a test')).toThrow('This is a test');
            });

            test('isBooleanArray method', () => {
                expect(() => STAssert.isBooleanArray([true, false], 'This is a test')).not.toThrow();
                expect(() => STAssert.isBooleanArray([1, 2, 3], 'This is a test')).toThrow('This is a test');
                expect(() => STAssert.isBooleanArray(true, 'This is a test')).toThrow('This is a test');
            });
        });

        test('isObject method', () => {
            expect(() => STAssert.isObject({ key: 'value' }, 'This is a test')).not.toThrow();
            expect(() => STAssert.isObject('Hello, World!', 'This is a test')).toThrow('This is a test');
        });

        test('matchRegEx method', () => {
            expect(() => STAssert.matchRegEx('Hello, World!', /World/, 'This is a test')).not.toThrow();
            expect(() => STAssert.matchRegEx('Hello, World!', /Foo/, 'This is a test')).toThrow('This is a test');
        });

        test('isClosure method', () => {
            const closure = new SlashCommandClosure(null);

            expect(() => STAssert.isClosure(closure, 'This is a test')).not.toThrow();
            expect(() => STAssert.isClosure('123', 'This is a test')).toThrow('This is a test');
        });
    });
});
