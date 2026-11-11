/** @import {} from '../../../global.js' */


const { SlashCommandEnumValue } = SillyTavern.getContext();


/**
 * @typedef {import('../../../../../../slash-commands/SlashCommandExecutor.js').SlashCommandExecutor} SlashCommandExecutor
 * @typedef {import('../../../../../../slash-commands/SlashCommandScope.js').SlashCommandScope} SlashCommandScope
 * @typedef {import('../../../../../../slash-commands/SlashCommandEnumValue.js').SlashCommandEnumValue} SlashCommandEnumValue
 */


export class parseAndAssertEnums {
    static #assert_types = [
        'bool_fn',
        'string',
        'number',
        'boolean',
        'list',
        'string_list',
        'number_list',
        'boolean_list',
        'dict',
        'regex_match',
    ];

    /**
     * All possible assert types.
     * @returns {(executor: SlashCommandExecutor, scope: SlashCommandScope) => SlashCommandEnumValue[]} An array of `SlashCommandEnumValue` objects.
     */
    static assertTypes = () => (_, __) => {
        return [
            ...this.#assert_types.map(
                (type) => new SlashCommandEnumValue(type),
            ),
        ];
    };
}
