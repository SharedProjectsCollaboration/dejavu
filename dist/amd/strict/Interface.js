/*jslint sloppy: true*/
/*global define*/

define([
    'Utils/lang/isObject',
    'Utils/lang/isFunction',
    'Utils/object/hasOwn',
    'Utils/object/forOwn',
    'Utils/array/combine',
    'Utils/array/insert',
    'Utils/lang/createObject',
    './common/verifyReserved'
], function (
    isObject,
    isFunction,
    hasOwn,
    forOwn,
    combine,
    insert,
    createObject,
    verifyReserved
) {
    /**
     * Grabs the static methods from the constructor parent and itself and merges them.
     *
     * @param {Function} constructor The constructor
     */
    function grabStatics(constructor) {

        var parent = constructor.Super ? constructor.Super.$constructor : null;

        constructor.$statics = [];

        if (hasOwn(constructor.prototype, 'Statics')) {

            // Verify if statics is an object
            if (!isObject(constructor.prototype.Statics)) {
                throw new TypeError('Statics definition for "' + constructor.prototype.Name + '" must be an object.');
            }

            // Verify reserved words
            verifyReserved(constructor.prototype.Statics, 'statics');

            forOwn(constructor.prototype.Statics, function (value, key) {
                if (isFunction(value)) {
                    insert(constructor.$statics, key);
                }
            });
        }

        if (parent && parent.$statics) {
            combine(constructor.$statics, parent.$statics);
        } else if (!constructor.$statics.length) {
            delete constructor.$statics;
        }
    }

    /**
     * Create an interface definition.
     *
     * @param {Object} params An object containing methods and properties
     *
     * @return {Function} The constructor
     */
    function Interface(params) {

        // Validate params as an object
        if (!isObject(params)) {
            throw new TypeError('Argument "params" must be an object.');
        }

        params.Name = params.Name || 'Unnamed';

        // Verify reserved words
        verifyReserved(params);

        var interf = function () {
            throw new Error('Interfaces cannot be instantiated.');
        };

        if (hasOwn(params, 'Extends')) {

            // Verify if parent is a valid interface
            if (!isFunction(params.Extends) || !params.Extends.$interface) {
                throw new TypeError('The parent interface of "' + params.Name + '" is not a valid interface (defined in Extends).');
            }

            interf.Super = params.Extends.prototype;
            delete params.Extends;

            interf.prototype = createObject(interf.Super, params);
            delete interf.prototype.Extends;
        } else {
            interf.prototype = params;
        }

        interf.prototype.$constructor = interf;

        // Grab all statics from the parent and itself and references them for later use
        grabStatics(interf);
        delete interf.prototype.Statics;

        // TODO: Make a way to validate an interface
        interf.$interface = true;   // Mark it as an interface

        return interf;
    }

    return Interface;
});