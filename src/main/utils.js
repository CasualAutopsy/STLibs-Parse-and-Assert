/**
 * Convert a regex string to a RegExp class.
 * @param {string} text - the regex string.
 * @returns {RegExp} The RegExp.
 */
export function toRegExp(text) {
    // Credit to the man, the myth, the legend: Lenny
    // and his amazing extension LALib
    return new RegExp(
        text.replace(/^\/(.+)\/([a-z]*)$/, '$1'),
        text.replace(/^\/(.+)\/([a-z]*)$/, '$2'),
    );
}
