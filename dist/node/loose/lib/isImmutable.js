if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
    'mout/lang/isNumber',
    'mout/lang/isString',
    'mout/lang/isBoolean'
], function (
    isNumber,
    isString,
    isBoolean
) {

    'use strict';

    /**
     * Checks if a value is immutable.
     *
     * @param {Mixed} value The value
     *
     * @return {Boolean} True if it is, false otherwise
     */
    function isImmutable(value) {
        return value == null || isBoolean(value) || isNumber(value) || isString(value);
    }

    return isImmutable;
});
