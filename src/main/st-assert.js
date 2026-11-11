/** @import {} from '../../global' */

import Ajv from 'ajv';
const ajv = new Ajv();

const { SlashCommandClosure } = await import(/* webpackIgnore: true */'/scripts/slash-commands/SlashCommandClosure.js');
const { SlashCommandEnumValue } = SillyTavern.getContext();


/**
 * @typedef {import('ajv').ValidateFunction} ValidateFunction
 * @typedef {import('../../../../../slash-commands/SlashCommandClosure.js').SlashCommandClosure} SlashCommandClosure
 * @typedef {import('../../../../../slash-commands/SlashCommandExecutor.js').SlashCommandExecutor} SlashCommandExecutor
 * @typedef {import('../../../../../slash-commands/SlashCommandScope.js').SlashCommandScope} SlashCommandScope
 * @typedef {import('../../../../../slash-commands/SlashCommandEnumValue.js').SlashCommandEnumValue} SlashCommandEnumValue
 * @typedef {import('../../../../../slash-commands/SlashCommandEnumValue.js').EnumType} EnumType
 */

/**
 * @typedef {object} AssertEnumOptions
 * @property {string|null} [description] - The description of the enum.
 * @property {EnumType|null} [type] - The type of the enum.
 * @property {string|null} [typeIcon] - The icon of the enum.
 * @property {(input: string) => boolean|null} [matchProvider] - The match provider for the enum.
 * @property {(input: string) => string|null} [valueProvider] - The value provider for the enum.
 * @property {boolean|null} [makeSelectable] - Whether the enum is selectable.
 */

/**
 * @typedef {object} AssertDocOptions
 * @property {string|null} [name] - The name of the validator.
 * @property {string|null} [desc] - The description of the validator.
 * @property {string|null} [example] - The example of the expected input.
 */

/**
 * @typedef {string|boolean|number|object|(string|boolean|number|object)[]|null|undefined} AssertInput
 */


export class STAssert {
    static #SchemaValidators = (() => {
        const string_array = {
            type: 'array',
            items: {
                type: 'string',
            },
        };

        const number_array = {
            type: 'array',
            items: {
                type: 'number',
            },
        };

        const boolean_array = {
            type: 'array',
            items: {
                type: 'boolean',
            },
        };

        const dict_object = {
            type: 'object',
            additionalProperties: true,
        };

        return {
            stringArray: ajv.compile(string_array),
            numberArray: ajv.compile(number_array),
            booleanArray: ajv.compile(boolean_array),
            object: ajv.compile(dict_object),
        };
    })();

    /**
     * Asserts a conditional statement.
     * @param {boolean} condition - The condition to check.
     * @param {string} msg - The error message to display if the condition is false.
     * @returns {asserts condition} Asserts that `condition` is true.
     */
    static assert(condition, msg) {
        if (!condition) throw new Error(msg);
    }

    /**
     * Asserts if a value is a string.
     * @param {AssertInput} val - The value to check.
     * @param {string} msg - The error message to display if the value is not a string.
     * @returns {asserts val is string} Asserts that `val` is a string.
     */
    static isString(val, msg) {
        if (typeof val !== 'string') throw new TypeError(msg);
    }

    /**
     * Asserts if a value is a number.
     * @param {AssertInput} val - The value to check.
     * @param {string} msg - The error message to display if the value is not a number.
     * @returns {asserts val is number} Asserts that `val` is a number.
     */
    static isNumber(val, msg) {
        if (typeof val !== 'number') throw new TypeError(msg);
    }

    /**
     * Asserts if a value is a boolean.
     * @param {AssertInput} val - The value to check.
     * @param {string} msg - The error message to display if the value is not a boolean.
     * @returns {asserts val is boolean} Asserts that `val` is a boolean.
     */
    static isBoolean(val, msg) {
        if (typeof val !== 'boolean') throw new TypeError(msg);
    }

    /**
     * Asserts if a value is an array.
     * @param {AssertInput} val - The value to check.
     * @param {string} msg - The error message to display if the value is not an array.
     * @returns {asserts val is Array<(string|boolean|number|object|null|undefined)>} Asserts that `val` is an array.
     */
    static isArray(val, msg) {
        if (!Array.isArray(val)) throw new TypeError(msg);
    }

    /**
     * Asserts if a value is an array of strings.
     * @param {AssertInput} val - The value to check.
     * @param {string} msg - The error message to display if the value is not an array of strings.
     * @returns {asserts val is Array<string>} Asserts that `val` is an array of strings.
     */
    static isStringArray(val, msg) {
        if (!this.#SchemaValidators.stringArray(val)) throw new TypeError(msg);
    }

    /**
     * Asserts if a value is an array of numbers.
     * @param {AssertInput} val - The value to check.
     * @param {string} msg - The error message to display if the value is not an array of numbers.
     * @returns {asserts val is Array<number>} Asserts that `val` is an array of numbers.
     */
    static isNumberArray(val, msg) {
        if (!this.#SchemaValidators.numberArray(val)) throw new TypeError(msg);
    }

    /**
     * Asserts if a value is an array of booleans.
     * @param {AssertInput} val - The value to check.
     * @param {string} msg - The error message to display if the value is not an array of booleans.
     * @returns {asserts val is Array<boolean>} Asserts that `val` is an array of booleans.
     */
    static isBooleanArray(val, msg) {
        if (!this.#SchemaValidators.booleanArray(val)) throw new TypeError(msg);
    }

    /**
     * Asserts if a value is an object.
     * @param {AssertInput} val - The value to check.
     * @param {string} msg - The error message to display if the value is not an object.
     * @returns {asserts val is object} Asserts that `val` is an object.
     */
    static isObject(val, msg) {
        if (!this.#SchemaValidators.object(val)) throw new TypeError(msg);
    }

    /**
     * Asserts if a value matches a regular expression.
     * @param {string} val - The value to check.
     * @param {RegExp} regex - The regular expression to match against.
     * @param {string} msg - The error message to display if the value does not match.
     * @returns {asserts regex} Asserts that `val` matches the given RegEx.
     */
    static matchRegEx(val, regex, msg) {
        if (regex.test(val) === false) throw new Error(msg);
    }

    /**
     * Asserts if a value is a slash command closure.
     * @param {AssertInput} val - The value to check.
     * @param {string} msg - The error message to display if the value is not a closure.
     * @returns {asserts val is SlashCommandClosure} Asserts that `val` is a `SlashCommandClosure`.
     */
    static isClosure(val, msg) {
        if (!(val instanceof SlashCommandClosure)) throw new TypeError(msg);
    }
}

/**
 * Class for creating extension assertion methods.
 */
export class ExtAssert {
    /**
     * @param {string} id - The identifier for the ExtAssert instance.
     */
    constructor(id) {
        this.id = id;
    }

    /** @type {Map<string, ValidateFunction>} */
    #validators = new Map();
    /** @type {Map<string, AssertEnumOptions>} */
    #enum = new Map();
    /** @type {Map<string, AssertDocOptions>} */
    #documentation = new Map();



    /**
     * Adds a validator to the map.
     * @param {string} id - The id of the validator.
     * @param {JSONSchema} schema - The schema to validate against.
     * @param {AssertEnumOptions} [enumOptions] - The enum options for the enum.
     * @param {AssertDocOptions} [docOptions] - The documentation options for the validator.
     */
    addValidator(id, schema, enumOptions, docOptions) {
        if (!(typeof id === 'string')) throw new TypeError('[ST-PA|ExtAssert - addValidator] The "name" argument must be a string.');

        this.#validators.set(id, ajv.compile(schema));

        if (enumOptions !== undefined)
            this.#enum.set(id, enumOptions);

        if (docOptions !== undefined)
            this.#documentation.set(id, docOptions);
    }

    /**
     * Removes a validator from the map.
     * @param {string} name - The name of the validator to remove.
     */
    removeValidator(name) {
        this.#validators.delete(name);
        this.#enum.delete(name);
        this.#documentation.delete(name);
    }

    /**
     * Clears all validators from the map.
     */
    clearValidators() {
        this.#validators.clear();
        this.#enum.clear();
        this.#documentation.clear();
    }

    /**
     * Gets the names of all validators in the map.
     * @returns {string[]} An array of validator names.
     */
    getValidatorNames() {
        return Array.from(this.#validators.keys());
    }

    /**
     * Asserts if a value matches a schema.
     * @param {string} schemaName - The name of the schema to validate against.
     * @param {AssertInput} val - The value to check.
     * @param {string} msg - The error message to display if the value does not match.
     * @returns {asserts schemaName} Asserts that `val` conforms to the schema.
     */
    assert(schemaName, val, msg) {
        const validator = this.#validators.get(schemaName);
        if (typeof validator === 'undefined') throw new Error(`Validator "${schemaName}" not found.`);
        if (!validator(val)) throw new TypeError(msg);
    }

    /**
     * Provides a list of enum values for slash commands based on the validator names.
     * @param {SlashCommandExecutor} _ - Unused parameter.
     * @param {SlashCommandScope} __ - Unused parameter.
     * @returns {SlashCommandEnumValue[]} An array of `SlashCommandEnumValue` instances.
     */
    #slashEnumProvider(_, __) {
        return [
            ...this.getValidatorNames().map((name) => {
                return new SlashCommandEnumValue(name);
            }),
        ].filter((item, idx, list) => idx == list.findIndex(it => it.value == item.value));
    }

    /**
     *
     * @param {string} helpString
     */
    async initAssertCommand(helpString) {
        const {
            SlashCommandParser, SlashCommand,
            SlashCommandNamedArgument, SlashCommandArgument,
            ARGUMENT_TYPE,
        } = SillyTavern.getContext();

        SlashCommandParser.addCommandObject(SlashCommand.fromProps({
            name: `${this.id}-assert`,
            callback: (args, val) => {
                STAssert.isString(args.type, 'The "type" argument must be a string');
                STAssert.isString(args.msg, 'The "msg" argument must be a string');
                STAssert.isString(val, 'The value can not be a closure');

                const parsed_val = JSON.parse(val);
                if (typeof parsed_val !== 'object') throw new TypeError('The value is not a valid array or object');

                this.assert(args.type, parsed_val, args.msg);

                // @ts-expect-error - SillyTavern typing issue.
                return args._scope.pipe;
            },
            namedArgumentList: [
                SlashCommandNamedArgument.fromProps({
                    name: 'type',
                    description: 'The type of validator to use',
                    typeList: [
                        ARGUMENT_TYPE.STRING,
                    ],
                    enumProvider: this.#slashEnumProvider,
                    forceEnum: true,
                    isRequired: true,
                }),
                SlashCommandNamedArgument.fromProps({
                    name: 'msg',
                    description: 'The error message to display if the value does not match',
                    typeList: [
                        ARGUMENT_TYPE.STRING,
                    ],
                    isRequired: true,
                }),
            ],
            unnamedArgumentList: [
                SlashCommandArgument.fromProps({
                    description: 'The value to check',
                    typeList: [
                        ARGUMENT_TYPE.LIST,
                        ARGUMENT_TYPE.DICTIONARY,
                    ],
                    isRequired: true,
                }),
            ],
            splitUnnamedArgument: false,
            helpString: helpString,
            returns: 'asserts "type" argument',
        }));
    }

    /**
     * Provides documentation for all validators in the map.
     * @param {string} helpString - The help string for the command.
     */
    async initDocCommand(helpString) {
        const {
            SlashCommandParser, SlashCommand,
        } = SillyTavern.getContext();

        SlashCommandParser.addCommandObject(SlashCommand.fromProps({
            name: `${this.id}-schema-docs`,
            callback: (_, __) => {
                const ctx = SillyTavern.getContext();
                const validators = this.#documentation.keys();

                const docs = [];
                for (const validator of validators) {
                    const section = [];
                    const doc = this.#documentation.get(validator);
                    if (doc === undefined) continue;

                    if (doc.name !== undefined)
                        section.push(`#### ${doc.name}`);

                    if (doc.desc !== undefined)
                        section.push(`${doc.desc}`);

                    if (doc.example !== undefined)
                        section.push(`\`\`\`json\n${doc.example}\n\`\`\``);

                    docs.push(section.join('\n\n'));
                }

                const joined_docs = docs.join('\n\n---\n\n');

                ctx.sendSystemMessage('help', joined_docs);

                // @ts-expect-error - SillyTavern typing issue.
                return _._scope.pipe;
            },
            helpString: helpString,
            returns: 'void',
        }));
    }
}
