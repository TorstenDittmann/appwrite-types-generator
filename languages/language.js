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
    getType(type) {
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

    /**
     * Get a string that defines the opening line for a new type with the given name in this language.
     *
     * @param name
     */
    getTypeOpenLine(name) {
        throw new TypeError("Stub.");
    }

    /**
     * Get a string that defines a property line for the given attribute for this language.
     *
     * @param attribute
     */
    getTypePropertyLine(attribute) {
        throw new TypeError("Stub.");
    }

    /**
     * Get a string that closes a type definition for this language.
     *
     */
    getTypeCloseLine() {
        throw new TypeError("Stub.");
    }

    /**
     * Generate (as a string) a type definition with the given type for this language.
     *
     * @param type
     * @returns {string}
     */
    generate(type) {
        return this.getTypeOpenLine(type.name)
            + (type.attributes.map(attr => {
                return this.getTypePropertyLine(attr)
            }).join(""))
            + this.getTypeCloseLine();
    }
}