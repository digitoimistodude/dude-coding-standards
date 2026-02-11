/**
 * Dude Coding Standards - Stylelint Config
 * https://github.com/digitoimistodude/dude-coding-standards
 *
 * Reference: https://linear.app/dude/issue/DEV-638
 */
const fs = require('fs');
const path = require('path');

// Find the main CSS file for custom properties validation
// Supports both standalone themes and dudestack projects
// Checks for front-end.css (air-light 10.0.0+) and global.css (legacy)
function findGlobalCss() {
  const possiblePaths = [
    // Standalone theme (running from theme directory)
    'assets/dist/css/front-end.css',
    'assets/dist/css/global.css',
    // In dudestack based projects: content/themes/*/assets/dist/css/
    ...findDudestackThemeCss()
  ];

  for (const cssPath of possiblePaths) {
    if (fs.existsSync(cssPath)) {
      return cssPath;
    }
  }

  return null;
}

function findDudestackThemeCss() {
  const themesDir = 'content/themes';
  if (!fs.existsSync(themesDir)) {
    return [];
  }

  try {
    const themes = fs.readdirSync(themesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .flatMap(dirent => [
        path.join(themesDir, dirent.name, 'assets/dist/css/front-end.css'),
        path.join(themesDir, dirent.name, 'assets/dist/css/global.css')
      ]);
    return themes;
  } catch {
    return [];
  }
}

const globalCssPath = findGlobalCss();

// Find theme.json and extract WordPress custom properties
// WordPress generates --wp--preset--*--{slug} and --wp--custom--* at runtime
// from theme.json, so they never appear in compiled CSS files
// Reference: https://linear.app/dude/issue/DEV-758
function findThemeJson() {
  const possiblePaths = [
    'theme.json',
    ...findDudestackThemeJson()
  ];

  for (const jsonPath of possiblePaths) {
    if (fs.existsSync(jsonPath)) {
      return jsonPath;
    }
  }

  return null;
}

function findDudestackThemeJson() {
  const themesDir = 'content/themes';
  if (!fs.existsSync(themesDir)) {
    return [];
  }

  try {
    return fs.readdirSync(themesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => path.join(themesDir, dirent.name, 'theme.json'));
  } catch {
    return [];
  }
}

function flattenCustomSettings(obj, prefix, result) {
  for (const [key, value] of Object.entries(obj)) {
    const kebabKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const varName = `${prefix}--${kebabKey}`;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      flattenCustomSettings(value, varName, result);
    } else {
      result[varName] = String(value);
    }
  }
}

function getThemeJsonCustomProperties() {
  const themeJsonPath = findThemeJson();
  if (!themeJsonPath) {
    return null;
  }

  try {
    const themeJson = JSON.parse(fs.readFileSync(themeJsonPath, 'utf8'));
    const settings = themeJson.settings || {};
    const customProperties = {};

    // --wp--preset--color--{slug}
    const palette = (settings.color && settings.color.palette) || [];
    for (const item of palette) {
      customProperties[`--wp--preset--color--${item.slug}`] = item.color || '';
    }

    // --wp--preset--gradient--{slug}
    const gradients = (settings.color && settings.color.gradients) || [];
    for (const item of gradients) {
      customProperties[`--wp--preset--gradient--${item.slug}`] = item.gradient || '';
    }

    // --wp--preset--font-family--{slug}
    const fontFamilies = (settings.typography && settings.typography.fontFamilies) || [];
    for (const item of fontFamilies) {
      customProperties[`--wp--preset--font-family--${item.slug}`] = item.fontFamily || '';
    }

    // --wp--preset--font-size--{slug}
    const fontSizes = (settings.typography && settings.typography.fontSizes) || [];
    for (const item of fontSizes) {
      customProperties[`--wp--preset--font-size--${item.slug}`] = item.size || '';
    }

    // --wp--preset--spacing--{slug}
    const spacingSizes = (settings.spacing && settings.spacing.spacingSizes) || [];
    for (const item of spacingSizes) {
      customProperties[`--wp--preset--spacing--${item.slug}`] = item.size || '';
    }

    // --wp--preset--shadow--{slug}
    const shadows = (settings.shadow && settings.shadow.presets) || [];
    for (const item of shadows) {
      customProperties[`--wp--preset--shadow--${item.slug}`] = item.shadow || '';
    }

    // --wp--custom--{key} (nested objects with -- separator)
    if (settings.custom) {
      flattenCustomSettings(settings.custom, '--wp--custom', customProperties);
    }

    // --wp--style--global--content-size and --wp--style--global--wide-size
    if (settings.layout) {
      if (settings.layout.contentSize) {
        customProperties['--wp--style--global--content-size'] = settings.layout.contentSize;
      }
      if (settings.layout.wideSize) {
        customProperties['--wp--style--global--wide-size'] = settings.layout.wideSize;
      }
    }

    return Object.keys(customProperties).length > 0
      ? { customProperties }
      : null;
  } catch {
    return null;
  }
}

const themeJsonProperties = getThemeJsonCustomProperties();

module.exports = {
  defaultSeverity: 'warning',
  plugins: [
    '@ronilaukkarinen/stylelint-value-no-unknown-custom-properties',
    '@ronilaukkarinen/stylelint-declaration-strict-value',
    'stylelint-order',
    'stylelint-rem-over-px'
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss'
  ],
  customSyntax: 'postcss-scss',
  rules: {
    'order/order': [
      {
        type: 'at-rule',
        name: 'import'
      },
      {
        type: 'at-rule',
        name: 'include'
      },
      {
        type: 'at-rule',
        name: 'extend'
      },
      'custom-properties',
      'dollar-variables',
      'declarations',
      'rules',
      {
        type: 'at-rule',
        name: 'media'
      }
    ],
    'rem-over-px/rem-over-px': [
      true,
      {
        fontSize: 16,
        ignore: [
          '-4px',
          '-3px',
          '-2px',
          '-1px',
          '1px',
          '2px',
          '3px',
          '4px'
        ],
        ignoreFunctions: [
          'url',
          'clamp-calc'
        ],
        ignoreAtRules: [
          'media'
        ]
      }
    ],
    'scss/at-mixin-argumentless-call-parentheses': null,
    'scss/double-slash-comment-empty-line-before': null,
    'scss/at-rule-conditional-no-parentheses': null,
    'scss/dollar-variable-pattern': null,
    'order/properties-alphabetical-order': true,
    'alpha-value-notation': 'number',
    'declaration-block-no-redundant-longhand-properties': null,
    'custom-property-empty-line-before': 'never',
    'color-no-invalid-hex': true,
    'color-hex-length': 'short',
    'selector-type-case': 'lower',
    'function-name-case': 'lower',
    'selector-attribute-quotes': 'always',
    'comment-whitespace-inside': 'always',
    'selector-max-specificity': '0,5,5',
    'block-no-empty': true,
    'declaration-empty-line-before': 'never',
    'font-family-no-missing-generic-family-keyword': true,
    'font-family-name-quotes': 'always-where-required',
    'at-rule-no-unknown': null,
    'no-invalid-position-at-import-rule': null,
    'comment-empty-line-before': null,
    'scss/at-else-empty-line-before': 'never',
    'function-url-quotes': 'always',
    'unit-no-unknown': true,
    'property-no-unknown': true,
    'no-duplicate-selectors': true,
    'length-zero-no-unit': true,
    'font-weight-notation': 'numeric',
    'number-max-precision': null,
    'selector-class-pattern': null,
    'selector-max-class': 5,
    'selector-max-combinators': 4,
    'selector-max-compound-selectors': 4,
    'selector-max-pseudo-class': 2,
    'selector-max-universal': 1,
    'property-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'selector-no-qualifying-type': null,
    'declaration-block-no-duplicate-properties': true,
    'no-unknown-animations': true,
    'shorthand-property-no-redundant-values': true,
    'declaration-block-single-line-max-declarations': 1,
    'value-keyword-case': [
      'lower',
      {
        camelCaseSvgKeywords: true
      }
    ],
    'scale-unlimited/declaration-strict-value': [
      '/color$/',
      {
        ignoreValues: [
          'transparent',
          'currentColor'
        ]
      }
    ],
    'csstools/value-no-unknown-custom-properties': globalCssPath || themeJsonProperties
      ? [
          true,
          {
            importFrom: [globalCssPath, themeJsonProperties].filter(Boolean)
          }
        ]
      : null,
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: [
          'first-nested',
          'after-single-line-comment'
        ],
        ignore: [
          'inside-block'
        ]
      }
    ],
    'at-rule-empty-line-before': [
      'always',
      {
        ignoreAtRules: [
          'if',
          'else'
        ],
        except: [
          'first-nested',
          'blockless-after-same-name-blockless',
          'blockless-after-blockless'
        ],
        ignore: [
          'after-comment'
        ]
      }
    ],
    'no-descending-specificity': null,
    'max-nesting-depth': [
      3,
      {
        ignore: [
          'blockless-at-rules',
          'pseudo-classes'
        ],
        ignoreAtRules: [
          'media'
        ]
      }
    ],
    'property-disallowed-list': [
      'font',
      'animation',
      'background'
    ]
  }
};
