import { assertHandler } from './assert-handlers.js';

import { parseAndAssertEnums } from './enum-providers.js';

/** @import {} from '../../../global.js' */


/**
 * Initializes the 'assert' slash command.
 */
export default async function initSlashCmds() {
    const {
        SlashCommandParser, SlashCommand,
        SlashCommandNamedArgument, SlashCommandArgument,
        ARGUMENT_TYPE,
    } = SillyTavern.getContext();

    const assertsEnum = parseAndAssertEnums.assertTypes();

    SlashCommandParser.addCommandObject(SlashCommand.fromProps({
        name: 'assert',
        callback: assertHandler,
        namedArgumentList: [
            SlashCommandNamedArgument.fromProps({
                name: 'type',
                description: 'The type assertion to perform.',
                typeList: [
                    ARGUMENT_TYPE.STRING,
                ],
                enumProvider: assertsEnum,
                forceEnum: true,
                isRequired: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'msg',
                description: 'The message to display if the assertion fails.',
                typeList: [
                    ARGUMENT_TYPE.STRING,
                ],
                isRequired: true,
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'boolFn',
                description: 'The boolean returning closure to use for the assertion.',
                typeList: [
                    ARGUMENT_TYPE.CLOSURE,
                ],
            }),
            SlashCommandNamedArgument.fromProps({
                name: 'regex',
                description: 'The regular expression to match against.',
                typeList: [
                    ARGUMENT_TYPE.STRING,
                ],
            }),
        ],
        unnamedArgumentList: [
            SlashCommandArgument.fromProps({
                description: 'The value to assert.',
                typeList: [
                    ARGUMENT_TYPE.STRING,
                    ARGUMENT_TYPE.NUMBER,
                    ARGUMENT_TYPE.BOOLEAN,
                    ARGUMENT_TYPE.LIST,
                    ARGUMENT_TYPE.DICTIONARY,
                    ARGUMENT_TYPE.CLOSURE,
                ],
            }),
        ],
        splitUnnamedArgument: false,
        helpString: '',
        returns: 'void',
    }));
}
