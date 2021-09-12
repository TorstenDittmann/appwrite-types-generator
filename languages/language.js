export class Language {

    constructor() {
        if (new.target === Language) {
            throw new TypeError("Abstract classes can't be instantiated.");
        }
    }

    /**
     * Get this languages type mapping for the given type.
     *
     * @param type
     * @return {string}
     */
    static getType(type) {
        throw new TypeError("Stub.");
    }

    /**
     * Return formatted Type Name.
     * @param {string} attribute 
     * @returns {string}
     */
    static getTypeFormatted(name) {
        throw new TypeError("Stub.");
    }

    /**
     * Get this languages type default for the given type.
     *
     * @param type
     * @param isArray
     * @return {string}
     */
    getTypeDefault(attribute) {
        throw new TypeError("Stub.");
    }

    /**
     * Get the file extension used by files of this language.
     */
    getFileExtension() {
        throw new TypeError("Stub.");
    }
}