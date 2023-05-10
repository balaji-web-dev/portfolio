const { propertyOrdering, selectorOrdering } = require('stylelint-semantic-groups');

module.exports = {
    extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
    plugins: ['stylelint-scss', 'stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
    rules: {
        'color-hex-length': 'long',
        'declaration-empty-line-before': null,
        indentation: [4],
        'order/order': selectorOrdering,
        'order/properties-order': propertyOrdering,
        'plugin/declaration-block-no-ignored-properties': true,
        'string-quotes': 'single',
        'selector-class-pattern': [
            '^[a-z]+([a-z0-9]?|[a-z0-9\\-]*[a-z0-9])$',
            {
                message: 'Use kebab-case for class names.',
                severity: 'error',
            },
        ],
    },
};
