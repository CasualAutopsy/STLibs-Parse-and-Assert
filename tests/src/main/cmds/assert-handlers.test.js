// eslint-disable-next-line jsdoc/ts-ban-ts-comment
// @ts-nocheck
import { describe, test, expect } from '@jest/globals';
import { assertHandler } from '../../../../src/main/cmds/assert-handlers.js';


const { SlashCommandClosure } = getUnstableContext.module('@slash-commands/SlashCommandClosure');


describe('/assert - Slash command handler tests', () => {
    describe('type arg === "bool_fn"', () => {
        test('passing result', async () => {
            const true_fn = new SlashCommandClosure(true);

            await expect(assertHandler({ type: 'bool_fn', msg: 'This is a test.', boolFn: true_fn, _scope: { pipe: 'test_value' } }, '')).resolves.toBe('test_value');
        });

        test('failing result', async () => {
            const false_fn = new SlashCommandClosure(false);

            try {
                await assertHandler({ type: 'bool_fn', msg: 'This is a test.', boolFn: false_fn, _scope: { pipe: 'test_value' } }, '');
            } catch (error) {
                expect(error.message).toBe('This is a test.');
            }
        });

        test('compareFn non-closure error', async () => {
            const non_fn = 'not a closure';

            try {
                await assertHandler({ type: 'bool_fn', msg: 'This is a test.', boolFn: non_fn, _scope: { pipe: 'test_value' } }, '');
            } catch (error) {
                expect(error.message).toBe('The \'compareFn\' argument must be a closure');
            }
        });
    });

    describe('type arg === "string"', () => {
        test('passing result', async () => {
            await expect(assertHandler({ type: 'string', msg: 'This is a test.', _scope: { pipe: 'test_value' } }, 'Hello, World!')).resolves.toBe('test_value');
        });

        test('failing result', async () => {
            try {
                await assertHandler({ type: 'string', msg: 'This is a test.', _scope: { pipe: 'test_value' } }, '123');
            } catch (error) {
                expect(error.message).toBe('This is a test.');
            }
        });
    });

    describe('type arg === "number"', () => {
        test('passing result', async () => {
            await expect(assertHandler({ type: 'number', msg: 'This is a test.', _scope: { pipe: 'test_value' } }, '123')).resolves.toBe('test_value');
        });

        test('failing result', async () => {
            try {
                await assertHandler({ type: 'number', msg: 'This is a test.', _scope: { pipe: 'test_value' } }, 'Hello, World!');
            } catch (error) {
                expect(error.message).toBe('This is a test.');
            }
        });
    });

    describe('type arg === "boolean"', () => {
        test('passing result', async () => {
            await expect(assertHandler({ type: 'boolean', msg: 'This is a test.', _scope: { pipe: 'test_value' } }, 'true')).resolves.toBe('test_value');
        });

        test('failing result', async () => {
            try {
                await assertHandler({ type: 'boolean', msg: 'This is a test.', _scope: { pipe: 'test_value' } }, 'Hello, World!');
            } catch (error) {
                expect(error.message).toBe('This is a test.');
            }
        });
    });

    describe('type arg === "list"', () => {
        test('passing result', async () => {
            await expect(assertHandler({ type: 'list', msg: 'This is a test.', _scope: { pipe: 'test_value' } }, '[1, 2, 3]')).resolves.toBe('test_value');
        });

        test('failing result', async () => {
            try {
                await assertHandler({ type: 'list', msg: 'This is a test.', _scope: { pipe: 'test_value' } }, 'Hello, World!');
            } catch (error) {
                expect(error.message).toBe('This is a test.');
            }
        });
    });

    describe('type arg === "string_list"', () => {
        test('passing result', async () => {
            await expect(assertHandler({ type: 'string_list', msg: 'This is a test.', _scope: { pipe: 'test_value' } }, '["Hello", "World"]')).resolves.toBe('test_value');
        });

        test('failing result', async () => {
            try {
                await assertHandler({ type: 'string_list', msg: 'This is a test.', _scope: { pipe: 'test_value' } }, '[1, 2, 3]');
            } catch (error) {
                expect(error.message).toBe('This is a test.');
            }
        });
    });

    describe('type arg === "number_list"', () => {
        test('passing result', async () => {
            await expect(assertHandler({ type: 'number_list', msg: 'This is a test.', _scope: { pipe: 'test_value' } }, '[1, 2, 3]')).resolves.toBe('test_value');
        });

        test('failing result', async () => {
            try {
                await assertHandler({ type: 'number_list', msg: 'This is a test.', _scope: { pipe: 'test_value' } }, '["Hello", "World"]');
            } catch (error) {
                expect(error.message).toBe('This is a test.');
            }
        });
    });

    describe('type arg === "boolean_list"', () => {
        test('passing result', async () => {
            await expect(assertHandler({ type: 'boolean_list', msg: 'This is a test.', _scope: { pipe: 'test_value' } }, '[true, false]')).resolves.toBe('test_value');
        });

        test('failing result', async () => {
            try {
                await assertHandler({ type: 'boolean_list', msg: 'This is a test.', _scope: { pipe: 'test_value' } }, '[1, 2, 3]');
            } catch (error) {
                expect(error.message).toBe('This is a test.');
            }
        });
    });

    describe('type arg === "dict"', () => {
        test('passing result', async () => {
            await expect(assertHandler({ type: 'dict', msg: 'This is a test.', _scope: { pipe: 'test_value' } }, '{"key": "value"}')).resolves.toBe('test_value');
        });

        test('failing result', async () => {
            try {
                await assertHandler({ type: 'dict', msg: 'This is a test.', _scope: { pipe: 'test_value' } }, '[1, 2, 3]');
            } catch (error) {
                expect(error.message).toBe('This is a test.');
            }
        });
    });

    describe('type arg === "regex_match"', () => {
        test('passing result', async () => {
            await expect(assertHandler({ type: 'regex_match', msg: 'This is a test.', regex: '/^Hello, World!$/', _scope: { pipe: 'test_value' } }, 'Hello, World!')).resolves.toBe('test_value');
        });

        test('failing result', async () => {
            try {
                await assertHandler({ type: 'regex_match', msg: 'This is a test.', regex: '/^Hello, World!$/', _scope: { pipe: 'test_value' } }, 'Hello, Assertion Failure!');
            } catch (error) {
                expect(error.message).toBe('This is a test.');
            }
        });

        test('regex non-string error', async () =>{
            const closure = new SlashCommandClosure('Hello, World!');

            try {
                await assertHandler({ type: 'regex_match', msg: 'This is a test.', regex: closure, _scope: { pipe: 'test_value' } }, 'Hello, World!');
            } catch (error) {
                expect(error.message).toBe('The \'regex\' argument must be a string');
            }
        });

        test('regex non-regex error', async () => {
            try {
                await assertHandler({ type: 'regex_match', msg: 'This is a test.', regex: 'not a regex', _scope: { pipe: 'test_value' } }, 'Hello, World!');
            } catch (error) {
                expect(error.message).toBe('The \'regex\' argument must be a valid regular expression string');
            }
        });

        test('input non-string error', async () => {
            const closure = new SlashCommandClosure(123);

            try {
                await assertHandler({ type: 'regex_match', msg: 'This is a test.', regex: '/^Hello, World!$/', _scope: { pipe: 'test_value' } }, closure);
            } catch (error) {
                expect(error.message).toBe('The value must be a string');
            }
        });
    });
});
