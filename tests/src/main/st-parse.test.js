/* eslint-disable jsdoc/ts-ban-ts-comment */
// @ts-nocheck
import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { resetVarStore, _scope } from '../../setup/setup.js';

import { STParse } from '../../../src/main/st-parse.js';


const { variables } = SillyTavern.getContext();


describe('STParse string parser methods', () => {
    describe('Parsing tests', () => {
        test('toNumber method', () => {
            const neg_float = STParse.toNumber('-123.321');
            const pos_float = STParse.toNumber('123.321');

            const neg_int = STParse.toNumber('-123');
            const pos_int = STParse.toNumber('123');

            const neg_exp = STParse.toNumber('-5.5e-4');
            const pos_exp = STParse.toNumber('5.5e4');

            const neg_inf = STParse.toNumber('-Infinity');
            const pos_inf = STParse.toNumber('Infinity');



            expect(neg_float).toBe(-123.321);
            expect(pos_float).toBe(123.321);

            expect(neg_int).toBe(-123);
            expect(pos_int).toBe(123);

            expect(neg_exp).toBe(-5.5e-4);
            expect(pos_exp).toBe(5.5e4);

            expect(neg_inf).toBe(-Infinity);
            expect(pos_inf).toBe(Infinity);
        });

        test('toInteger method', () => {
            const neg_int = STParse.toInteger('-123');
            const pos_int = STParse.toInteger('123');



            expect(neg_int).toBe(-123);
            expect(pos_int).toBe(123);
        });

        test('toFloat method', () => {
            const neg_float = STParse.toFloat('-123.321');
            const pos_float = STParse.toFloat('123.321');

            const neg_exp = STParse.toFloat('-5.5e-4');
            const pos_exp = STParse.toFloat('5.5e4');

            const neg_inf = STParse.toFloat('-Infinity');
            const pos_inf = STParse.toFloat('Infinity');



            expect(neg_float).toBe(-123.321);
            expect(pos_float).toBe(123.321);

            expect(neg_exp).toBe(-5.5e-4);
            expect(pos_exp).toBe(5.5e4);

            expect(neg_inf).toBe(-Infinity);
            expect(pos_inf).toBe(Infinity);
        });

        test('toBoolean method', () => {
            const bool_true = STParse.toBoolean('true');
            const bool_false = STParse.toBoolean('false');

            const bool_on = STParse.toBoolean('on');
            const bool_off = STParse.toBoolean('off');


            expect(bool_true).toBe(true);
            expect(bool_false).toBe(false);
            expect(bool_on).toBe(true);
            expect(bool_off).toBe(false);
        });

        test('parse Method', () => {
            const obj_parse = STParse.parse('{ "key": "value" }');
            const arr_parse = STParse.parse('[ "value1", "value2" ]');
            const null_parse = STParse.parse('null');
            const num_parse = STParse.parse('123');
            const bool_parse = STParse.parse('true');
            const str_parse = STParse.parse('"Hello, World!"');

            const on_parse = STParse.parse('on');
            const off_parse = STParse.parse('off');

            const string_fallback = STParse.parse('fallback');



            expect(obj_parse).toEqual({ key: 'value' });
            expect(arr_parse).toEqual(['value1', 'value2']);
            expect(null_parse).toBeNull();
            expect(num_parse).toBe(123);
            expect(bool_parse).toBe(true);
            expect(str_parse).toBe('Hello, World!');

            expect(on_parse).toBe(true);
            expect(off_parse).toBe(false);

            expect(string_fallback).toBe('fallback');
        });
    });

    describe('Parsing throws tests', () => {
        test('toNumber throw', () => {
            expect(() => STParse.toNumber('invalid')).toThrow(Error);
        });

        test('toInteger throw', () => {
            expect(() => STParse.toInteger('invalid')).toThrow(Error);
        });

        test('toFloat throw', () => {
            expect(() => STParse.toFloat('invalid')).toThrow(Error);
        });

        test('toBoolean throw', () => {
            expect(() => STParse.toBoolean('invalid')).toThrow(Error);
        });
    });
});


describe('STParse variable resolver methods', () => {
    describe('Local variable resolver tests', () => {
        beforeEach(() => {
            variables.local.set('test_int', '123');
            variables.local.set('test_float', '123.321');
            variables.local.set('test_bool', 'true');
            variables.local.set('test_str', 'Hello, World!');
            variables.local.set('test_arr', '[1, 2, 3]');
            variables.local.set('test_obj', '{"key": "value"}');
            variables.local.set('test_null', 'null');

            variables.local.set('test_on', 'on');
            variables.local.set('test_off', 'off');
        });

        afterEach(() => {
            resetVarStore();
        });


        test('varToNumber method', () => {
            const local_int_result = STParse.varToNumber('.test_int', _scope);
            const local_float_result = STParse.varToNumber('.test_float', _scope);

            expect(local_int_result).toBe(123);
            expect(local_float_result).toBe(123.321);
        });

        test('varToInteger method', () => {
            const local_int_result = STParse.varToInteger('.test_int', _scope);

            expect(local_int_result).toBe(123);
        });

        test('varToFloat method', () => {
            const local_float_result = STParse.varToFloat('.test_float', _scope);

            expect(local_float_result).toBe(123.321);
        });

        test('varToBoolean method', () => {
            const local_bool_result = STParse.varToBoolean('.test_bool', _scope);

            const local_on_result = STParse.varToBoolean('.test_on', _scope);
            const local_off_result = STParse.varToBoolean('.test_off', _scope);


            expect(local_bool_result).toBe(true);

            expect(local_on_result).toBe(true);
            expect(local_off_result).toBe(false);
        });

        test('varParse method', () => {
            const local_obj_result = STParse.varParse('.test_obj', _scope);
            const local_arr_result = STParse.varParse('.test_arr', _scope);
            const local_null_result = STParse.varParse('.test_null', _scope);
            const local_num_result = STParse.varParse('.test_int', _scope);
            const local_bool_result = STParse.varParse('.test_bool', _scope);
            const local_str_result = STParse.varParse('.test_str', _scope);

            const local_on_result = STParse.varParse('.test_on', _scope);
            const local_off_result = STParse.varParse('.test_off', _scope);



            expect(local_obj_result).toEqual({ key: 'value' });
            expect(local_arr_result).toEqual([1, 2, 3]);
            expect(local_null_result).toBeNull();
            expect(local_num_result).toBe(123);
            expect(local_bool_result).toBe(true);
            expect(local_str_result).toBe('Hello, World!');

            expect(local_on_result).toBe(true);
            expect(local_off_result).toBe(false);
        });
    });

    describe('Global variable resolver tests', () => {
        beforeEach(() => {
            variables.global.set('test_int', '123');
            variables.global.set('test_float', '123.321');
            variables.global.set('test_bool', 'true');
            variables.global.set('test_str', 'Hello, World!');
            variables.global.set('test_arr', '[1, 2, 3]');
            variables.global.set('test_obj', '{"key": "value"}');
            variables.global.set('test_null', 'null');

            variables.global.set('test_on', 'on');
            variables.global.set('test_off', 'off');
        });

        afterEach(() => {
            resetVarStore();
        });

        test('varToNumber method', () => {
            const global_int_result = STParse.varToNumber('$test_int', _scope);
            const global_float_result = STParse.varToNumber('$test_float', _scope);

            expect(global_int_result).toBe(123);
            expect(global_float_result).toBe(123.321);
        });

        test('varToInteger method', () => {
            const global_int_result = STParse.varToInteger('$test_int', _scope);

            expect(global_int_result).toBe(123);
        });

        test('varToFloat method', () => {
            const global_float_result = STParse.varToFloat('$test_float', _scope);

            expect(global_float_result).toBe(123.321);
        });

        test('varToBoolean method', () => {
            const global_bool_result = STParse.varToBoolean('$test_bool', _scope);

            const global_on_result = STParse.varToBoolean('$test_on', _scope);
            const global_off_result = STParse.varToBoolean('$test_off', _scope);


            expect(global_bool_result).toBe(true);

            expect(global_on_result).toBe(true);
            expect(global_off_result).toBe(false);
        });

        test('varParse method', () => {
            const global_obj_result = STParse.varParse('$test_obj', _scope);
            const global_arr_result = STParse.varParse('$test_arr', _scope);
            const global_null_result = STParse.varParse('$test_null', _scope);
            const global_num_result = STParse.varParse('$test_int', _scope);
            const global_bool_result = STParse.varParse('$test_bool', _scope);
            const global_str_result = STParse.varParse('$test_str', _scope);

            const global_on_result = STParse.varParse('$test_on', _scope);
            const global_off_result = STParse.varParse('$test_off', _scope);



            expect(global_obj_result).toEqual({ key: 'value' });
            expect(global_arr_result).toEqual([1, 2, 3]);
            expect(global_null_result).toBeNull();
            expect(global_num_result).toBe(123);
            expect(global_bool_result).toBe(true);
            expect(global_str_result).toBe('Hello, World!');

            expect(global_on_result).toBe(true);
            expect(global_off_result).toBe(false);
        });
    });

    describe('Scope variable resolver tests', () => {
        beforeEach(() => {
            _scope.setVariable('test_int', '123');
            _scope.setVariable('test_float', '123.321');
            _scope.setVariable('test_bool', 'true');
            _scope.setVariable('test_str', 'Hello, World!');
            _scope.setVariable('test_arr', '[1, 2, 3]');
            _scope.setVariable('test_obj', '{"key": "value"}');
            _scope.setVariable('test_null', 'null');

            _scope.setVariable('test_on', 'on');
            _scope.setVariable('test_off', 'off');
        });

        afterEach(() => {
            resetVarStore();
        });

        test('varToNumber method', () => {
            const scope_int_result = STParse.varToNumber('@test_int', _scope);
            const scope_float_result = STParse.varToNumber('@test_float', _scope);

            expect(scope_int_result).toBe(123);
            expect(scope_float_result).toBe(123.321);
        });

        test('varToInteger method', () => {
            const scope_int_result = STParse.varToInteger('@test_int', _scope);

            expect(scope_int_result).toBe(123);
        });

        test('varToFloat method', () => {
            const scope_float_result = STParse.varToFloat('@test_float', _scope);

            expect(scope_float_result).toBe(123.321);
        });

        test('varToBoolean method', () => {
            const scope_bool_result = STParse.varToBoolean('@test_bool', _scope);

            const scope_on_result = STParse.varToBoolean('@test_on', _scope);
            const scope_off_result = STParse.varToBoolean('@test_off', _scope);


            expect(scope_bool_result).toBe(true);

            expect(scope_on_result).toBe(true);
            expect(scope_off_result).toBe(false);
        });

        test('varParse method', () => {
            const scope_obj_result = STParse.varParse('@test_obj', _scope);
            const scope_arr_result = STParse.varParse('@test_arr', _scope);
            const scope_null_result = STParse.varParse('@test_null', _scope);
            const scope_num_result = STParse.varParse('@test_int', _scope);
            const scope_bool_result = STParse.varParse('@test_bool', _scope);
            const scope_str_result = STParse.varParse('@test_str', _scope);

            const scope_on_result = STParse.varParse('@test_on', _scope);
            const scope_off_result = STParse.varParse('@test_off', _scope);



            expect(scope_obj_result).toEqual({ key: 'value' });
            expect(scope_arr_result).toEqual([1, 2, 3]);
            expect(scope_null_result).toBeNull();
            expect(scope_num_result).toBe(123);
            expect(scope_bool_result).toBe(true);
            expect(scope_str_result).toBe('Hello, World!');

            expect(scope_on_result).toBe(true);
            expect(scope_off_result).toBe(false);
        });
    });

    describe('STParse variable resolver fallback tests', () => {
        test('varToNumber method', () => {
            const fallback_int_result = STParse.varToNumber('123');
            const fallback_float_result = STParse.varToNumber('123.321');

            expect(fallback_int_result).toBe(123);
            expect(fallback_float_result).toBe(123.321);
        });

        test('varToInteger method', () => {
            const fallback_int_result = STParse.varToInteger('123');

            expect(fallback_int_result).toBe(123);
        });

        test('varToFloat method', () => {
            const fallback_float_result = STParse.varToFloat('123.321');

            expect(fallback_float_result).toBe(123.321);
        });

        test('varToBoolean method', () => {
            const fallback_bool_result = STParse.varToBoolean('true');

            const fallback_on_result = STParse.varToBoolean('on');
            const fallback_off_result = STParse.varToBoolean('off');


            expect(fallback_bool_result).toBe(true);

            expect(fallback_on_result).toBe(true);
            expect(fallback_off_result).toBe(false);
        });

        test('varParse method', () => {
            const fallback_obj_result = STParse.varParse('{ "key": "value" }');
            const fallback_arr_result = STParse.varParse('[ "value1", "value2" ]');
            const fallback_null_result = STParse.varParse('null');
            const fallback_num_result = STParse.varParse('123');
            const fallback_bool_result = STParse.varParse('true');
            const fallback_str_result = STParse.varParse('"Hello, World!"');

            const fallback_on_result = STParse.varParse('on');
            const fallback_off_result = STParse.varParse('off');



            expect(fallback_obj_result).toEqual({ key: 'value' });
            expect(fallback_arr_result).toEqual(['value1', 'value2']);
            expect(fallback_null_result).toBeNull();
            expect(fallback_num_result).toBe(123);
            expect(fallback_bool_result).toBe(true);
            expect(fallback_str_result).toBe('Hello, World!');

            expect(fallback_on_result).toBe(true);
            expect(fallback_off_result).toBe(false);
        });
    });

    describe('Resolver throw tests', () => {
        beforeEach(() => {
            variables.local.set('test_var', 'invalid');
        });

        afterEach(() => {
            resetVarStore();
        });

        test('varToNumber throw', () => {
            expect(() => STParse.varToNumber('.test_var', _scope)).toThrow(Error);
        });

        test('varToInteger throw', () => {
            expect(() => STParse.varToInteger('.test_var', _scope)).toThrow(Error);
        });

        test('varToFloat throw', () => {
            expect(() => STParse.varToFloat('.test_var', _scope)).toThrow(Error);
        });

        test('varToBoolean throw', () => {
            expect(() => STParse.varToBoolean('.test_var', _scope)).toThrow(Error);
        });
    });
});
