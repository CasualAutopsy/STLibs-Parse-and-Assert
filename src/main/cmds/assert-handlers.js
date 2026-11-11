import { STAssert } from '../st-assert.js';
import { STParse } from '../st-parse.js';

import { toRegExp } from '../utils.js';


/** @import {} from '../../../global.js' */


/**
 * @typedef {import('../../../../../../slash-commands/SlashCommand.js').NamedArgumentsCapture} NamedArgumentsCapture
 * @typedef {import('../../../../../../slash-commands/SlashCommand.js').NamedArguments} NamedArguments
 * @typedef {import('../../../../../../slash-commands/SlashCommand.js').UnnamedArguments} UnnamedArguments
 */

/**
 *
 * @param {NamedArgumentsCapture|NamedArguments} args - Named arguments and scope.
 * @param {UnnamedArguments} vals - Unnamed arguments.
 * @returns {Promise<string>} The scope's current pipe value.
 */
export async function assertHandler(args, vals) {
    STAssert.isString(args.type, 'The \'type\' argument must be a string');
    STAssert.isString(args.msg, 'The \'msg\' argument must be a string');

    /** @type {string|number|boolean|object|(string|number|boolean|object|null)[]|null|undefined} */
    let parsed_val = undefined;
    if (typeof vals === 'string')
        parsed_val = STParse.parse(vals);

    switch (args.type) {
        case 'bool_fn':
            STAssert.isClosure(args.boolFn, 'The \'compareFn\' argument must be a closure');

            STAssert.assert(STParse.toBoolean((await args.boolFn.execute()).pipe), args.msg);
            break;
        case 'string':
            STAssert.isString(parsed_val, args.msg);
            break;
        case 'number':
            STAssert.isNumber(parsed_val, args.msg);
            break;
        case 'boolean':
            STAssert.isBoolean(parsed_val, args.msg);
            break;
        case 'list':
            STAssert.isArray(parsed_val, args.msg);
            break;
        case 'string_list':
            STAssert.isStringArray(parsed_val, args.msg);
            break;
        case 'number_list':
            STAssert.isNumberArray(parsed_val, args.msg);
            break;
        case 'boolean_list':
            STAssert.isBooleanArray(parsed_val, args.msg);
            break;
        case 'dict':
            STAssert.isObject(parsed_val, args.msg);
            break;
        case 'regex_match':
            STAssert.isString(args.regex, 'The \'regex\' argument must be a string');
            STAssert.matchRegEx(args.regex, /^\/.+\/[a-z]*$/, 'The \'regex\' argument must be a valid regular expression string');

            STAssert.isString(parsed_val, 'The value must be a string');
            STAssert.matchRegEx(parsed_val, toRegExp(args.regex), args.msg);
            break;
    }

    // @ts-expect-error - SillyTavern typing issue.
    return args._scope.pipe;
}
