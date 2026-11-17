import { jest } from '@jest/globals';

/** @type {Map<string, string>} */
const _scopeStore = new Map();
/** @type {Map<string, string>} */
const _localStore = new Map();
/** @type {Map<string, string>} */
const _globalStore = new Map();

/**
 * Resets all variable stores.
 */
export function resetVarStore() {
    _scopeStore.clear();
    _localStore.clear();
    _globalStore.clear();
}

export const _scope = {
    /**
     * SillyTavern scope variable replication.
     *
     * Retrieves a scope variable by its key.
     * @param {string} key - The key to get the value for.
     * @returns {string|undefined} The retrieved value.
     */
    getVariable: (key) => _scopeStore.get(key),

    /**
     * SillyTavern scope variable replication.
     *
     * Sets a scope variable by its key.
     * @param {string} key - The key to set the value for.
     * @param {string} value - The value to set.
     * @returns {Map<string, string>} The scope store.
     */
    setVariable: (key, value) => _scopeStore.set(key, value),
};

const variables = {
    local: {
        /**
         * SillyTavern local variable replication.
         *
         * Retrieves a local variable by its key.
         * @param {string} key - The key to get the value for.
         * @returns {string|undefined} The retrieved value.
         */
        get: (key) => _localStore.get(key),

        /**
         * SillyTavern local variable replication.
         *
         * Sets a local variable by its key.
         * @param {string} key - The key to set the value for.
         * @param {string} value - The value to set.
         * @returns {Map<string, string>} The local store.
         */
        set: (key, value) => _localStore.set(key, value),
    },
    global: {
        /**
         * SillyTavern global variable replication.
         *
         * Retrieves a global variable by its key.
         * @param {string} key - The key to get the value for.
         * @returns {string|undefined} The retrieved value.
         */

        get: (key) => _globalStore.get(key),
        /**
         * SillyTavern global variable replication.
         *
         * Sets a global variable by its key.
         * @param {string} key - The key to set the value for.
         * @param {string} value - The value to set.
         * @returns {Map<string, string>} The global store.
         */
        set: (key, value) => _globalStore.set(key, value),
    },
};

/**
 * SillyTavern getContext replication.
 * @returns {{variables: typeof variables}} The context.
 */
function getContext() {
    return {
        variables,
    };
}

globalThis.SillyTavern = {
    getContext,
};

class SlashCommandClosure {
    constructor(mockReturn) {
        this.mockReturn = mockReturn;
    }

    async execute() {
        return {
            pipe: String(this.mockReturn),
        };
    }
}

const getUnstableContextModule = jest.fn();
getUnstableContextModule.whenCalledWith('@slash-commands/SlashCommandClosure').mockImplementation(() => {
    return {
        SlashCommandClosure,
    };
});


globalThis.getUnstableContext = {
    module: getUnstableContextModule,
};
