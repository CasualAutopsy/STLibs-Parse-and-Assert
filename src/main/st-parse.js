/** @import {} from '../../global' */

import { STAssert } from './st-assert.js';

const { variables } = SillyTavern.getContext();

/**
 * @typedef {import('scripts/slash-commands/SlashCommand.js').NamedArguments} NamedArguments
 * @typedef {import('scripts/slash-commands/SlashCommandScope.js').SlashCommandScope} SlashCommandScope
 */

export const STParse = (() => {
    /**
     * Resolves a shorthand scope string into a scope and variable name.
     * @param {string} arg - the shorthand scope string.
     * @returns {[string, string]|null} the scope and variable name, or null if the shorthand var isn't found.
     */
    function varScope(arg) {
        const [, prefix, varName] = arg.match(/^([@.$])?([-_a-zA-Z]+)$/) || [null, null, null];

        if (!prefix || !varName) return null;

        return prefix === '@'
            ? ['scope', varName]
            : prefix === '.'
                ? ['local', varName]
                : ['global', varName];
    }

    /**
     * Resolves a shorthand variable to its value.
     * @param {string} arg - the shorthand string.
     * @param {SlashCommandScope} scope - slash command scope.
     * @returns {string} the resolved value.
     */
    function resolve(arg, scope) {
        const shorthand = varScope(arg);

        if (!shorthand) return arg;

        return shorthand[0] === 'scope'
            ? scope.getVariable(shorthand[1])
            : shorthand[0] === 'local'
                ? variables.local.get(shorthand[1])
                : variables.global.get(shorthand[1]);
    }

    return {
        /**
         * Converts an arg value to a number.
         * @param {string} arg - The argument value.
         * @returns {number} the parsed number.
         */
        toNumber(arg) {
            STAssert.matchRegEx(arg, /^-?(?:Infinity|[0-9]+(?:\.[0-9]+)?(?:e-?[0-9]+)?)$/, 'The value must be a valid number.');

            return Number(arg);
        },

        /**
         * Converts a shorthand variable or an arg value to a number.
         * @param {string} arg - The argument value.
         * @param {SlashCommandScope} scope - slash command scope.
         * @returns {number} the parsed number.
         */
        varToNumber(arg, scope) {
            const resolved = resolve(arg, scope);
            STAssert.matchRegEx(resolved, /^-?(?:Infinity|[0-9]+(?:\.[0-9]+)?(?:e-?[0-9]+)?)$/, 'The value must be a valid number.');

            return Number(resolved);
        },

        /**
         * Converts an arg value to an integer.
         * @param {string} arg - The argument value.
         * @returns {number} the parsed integer.
         */
        toInteger(arg) {
            STAssert.matchRegEx(arg, /^-?[0-9]+$/, 'The value must be a valid integer.');

            return parseInt(arg);
        },

        /**
         * Converts a shorthand variable or an arg value to an integer.
         * @param {string} arg - The argument value.
         * @param {SlashCommandScope} scope - slash command scope.
         * @returns {number} the parsed integer.
         */
        varToInteger(arg, scope) {
            const resolved = resolve(arg, scope);
            STAssert.matchRegEx(resolved, /^-?[0-9]+$/, 'The value must be a valid integer.');

            return parseInt(resolved);
        },

        /**
         * Converts an arg value to a float.
         * @param {string} arg - The argument value.
         * @returns {number} the parsed float.
         */
        toFloat(arg) {
            STAssert.matchRegEx(arg, /^-?(?:Infinity|[0-9]+(?:\.[0-9]+|(?:\.[0-9]+)?e-?[0-9]+))$/, 'The value must be a valid float.');

            return Number(arg);
        },

        /**
         * Converts a shorthand variable or an arg value to a float.
         * @param {string} arg - The argument value.
         * @param {SlashCommandScope} scope - slash command scope.
         * @returns {number} the parsed float.
         */
        varToFloat(arg, scope) {
            const resolved = resolve(arg, scope);
            STAssert.matchRegEx(resolved, /^-?(?:Infinity|[0-9]+(?:\.[0-9]+|(?:\.[0-9]+)?e-?[0-9]+))$/, 'The value must be a valid float.');

            return Number(resolved);
        },

        /**
         * Converts an arg value to a boolean.
         * @param {string} arg - The argument value.
         * @returns {boolean} the parsed boolean.
         */
        toBoolean(arg) {
            STAssert.matchRegEx(arg, /^true|false|on|off$/, 'The value must be a valid boolean.');

            return !['false', 'off'].includes(arg);
        },

        /**
         * Converts a shorthand variable or an arg value to a boolean.
         * @param {string} arg - The argument value.
         * @param {SlashCommandScope} scope - slash command scope.
         * @returns {boolean} the parsed boolean.
         */
        varToBoolean(arg, scope) {
            const resolved = resolve(arg, scope);
            STAssert.matchRegEx(resolved, /^true|false|on|off$/, 'The value must be a valid boolean.');

            return !['false', 'off'].includes(resolved);
        },

        /**
         * Converts an arg value to a value of any type.
         * @param {string} arg - The argument value.
         * @returns {string|number|boolean|object|(string|number|boolean|object|null)[]|null} the parsed value.
         */
        parse(arg) {
            try {
                return JSON.parse(arg);
            } catch {
                if (arg === 'on') return true;
                if (arg === 'off') return false;

                return arg;
            }
        },

        /**
         * Converts a shorthand variable or an arg value to a value of any type.
         * @param {string} arg - The argument value.
         * @param {SlashCommandScope} scope - slash command scope.
         * @returns {string|number|boolean|object|(string|number|boolean|object|null)[]|null} the parsed value.
         */
        varParse(arg, scope){
            const resolved = resolve(arg, scope);

            try {
                return JSON.parse(resolved);
            } catch {
                if (resolved === 'on') return true;
                if (resolved === 'off') return false;

                return resolved;
            }
        },
    };
})();
