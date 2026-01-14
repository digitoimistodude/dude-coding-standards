# Dude Coding Standards (DCS)

> [!NOTE]
> **Please note:** The Dude Coding Standard is a work in progress. We're in the process of replacing WordPress-Core standard in [dudestack](https://github.com/digitoimistodude/dudestack) with our own DSC standard, the one you are currently looking at (internal reference: [DEV-624](https://linear.app/dude/issue/DEV-624)). This PHPCS standard is used by Dude staff and may not provide additional value for external developers.

[![Packagist Version](https://img.shields.io/packagist/v/digitoimistodude/dude-coding-standards?style=for-the-badge)](https://packagist.org/packages/digitoimistodude/dude-coding-standards)
[![WordPress](https://img.shields.io/badge/WordPress-%23117AC9.svg?style=for-the-badge&logo=WordPress&logoColor=white)](#)
[![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)](#)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/digitoimistodude/dude-coding-standards/.github%2Fworkflows%2Fbuild.yml?style=for-the-badge)](https://github.com/digitoimistodude/dude-coding-standards/actions)

PHP_CodeSniffer and Stylelint rules for WordPress theme and plugin development at [Digitoimisto Dude Oy](https://www.dude.fi).

This repository contains:
- **PHPCS standard** (DCS) - via Composer
- **Stylelint config** - via npm

---

## PHPCS Installation

```bash
composer require --dev digitoimistodude/dude-coding-standards
```

The standard will be automatically registered with [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) via the [Composer](https://getcomposer.org/) installer plugin.

## Usage

### In phpcs.xml

Create a `phpcs.xml` in your project root:

```xml
<?xml version="1.0"?>
<ruleset>
  <rule ref="DCS"/>
</ruleset>
```

### Command line

```bash
phpcs --standard=DCS path/to/your/code
```

### With custom configuration

You can override rules in your project's `phpcs.xml`:

```xml
<?xml version="1.0"?>
<ruleset>
  <rule ref="DCS">
    <!-- Exclude specific rules if needed -->
    <exclude name="DCS.PHP.ForbiddenFunctions"/>
  </rule>

  <!-- Add project-specific patterns to exclude -->
  <exclude-pattern>*/some-legacy-folder/*</exclude-pattern>
</ruleset>
```

## What's included

DCS is based on [WordPress Coding Standards](https://github.com/WordPress/WordPress-Coding-Standards) with Dude-specific customizations:

### Code style

- **2-space indentation** instead of tabs
- **Short array syntax** `[]` allowed (instead of `array()`)
- **Relaxed commenting** requirements
- **Flexible function formatting** with spaces
- **...and more** in the future

### Security

All WordPress security sniffs are enabled:

- `WordPress.Security.NonceVerification`
- `WordPress.Security.ValidatedSanitizedInput`
- `WordPress.Security.EscapeOutput`
- And more...

### PHP compatibility

Checks code compatibility with > PHP 8.3 using [PHPCompatibilityWP](https://github.com/PHPCompatibility/PHPCompatibilityWP).

### Development functions

`error_log()` and `print_r()` are allowed but flagged as **warnings** to remind you to review before deployment.

## Excluded rules

The following WordPress rules are excluded for Dude's workflow:

- Yoda conditions (`WordPress.PHP.YodaConditions`)
- Strict file naming (`WordPress.Files.FileName`)
- Tab indentation (`Generic.WhiteSpace.DisallowSpaceIndent`)
- Long array syntax requirement (`Universal.Arrays.DisallowShortArraySyntax`)
- See [DCS/ruleset.xml](DCS/ruleset.xml) for the full list

## Adding forbidden functions

To add more forbidden functions to your project, create a custom sniff or override in your `phpcs.xml`:

```xml
<rule ref="Generic.PHP.ForbiddenFunctions">
  <properties>
    <property name="forbiddenFunctions" type="array">
      <element key="my_deprecated_function" value="new_function"/>
    </property>
  </properties>
</rule>
```

## Development and local testing

If you want to test DCS locally before the package is published, first install dependencies in dude-coding-standards:

```bash
cd /path/to/dude-coding-standards
composer install
```

Then add path repository to your project's composer.json:

```json
{
  "repositories": [
    {
      "type": "path",
      "url": "../dude-coding-standards"
    }
  ],
  "require-dev": {
    "digitoimistodude/dude-coding-standards": "@dev"
  }
}
```

Run composer update in your project:

```bash
composer update digitoimistodude/dude-coding-standards
```

**Note:** Path repositories create symlinks, so any changes you make to dude-coding-standards are instantly available in your test project without reinstalling.

Check that DCS is available:

```bash
./vendor/bin/phpcs -i
# Should show: ... DCS ...
```

Create phpcs.xml in your project, can be as simple as this:

```xml
<?xml version="1.0"?>
<ruleset>
  <rule ref="DCS"/>
</ruleset>
```

Run phpcs:

```bash
# From the dev project
./vendor/bin/phpcs --standard=phpcs.xml path/to/your/code

# By using the global version
phpcs --standard=phpcs.xml path/to/your/code
```

You can also run phpcs directly from dude-coding-standards against your project:

```bash
cd /path/to/dude-coding-standards

# From the dev project
./vendor/bin/phpcs --standard=DCS /path/to/your/project/

# By using the global version
phpcs --standard=DCS /path/to/your/project/
```

Check the standard itself for development:

```bash
phpcs --standard=phpcs.xml DCS/
```

---

## Stylelint Config

### Installation

```bash
npm install --save-dev @digitoimistodude/stylelint-config stylelint
```

### Usage

Create `.stylelintrc` in your project root:

```json
{
  "extends": "@digitoimistodude/stylelint-config"
}
```

If you ever need to add project based exclusions, use rules in your project:

```json
{
  "extends": "@digitoimistodude/stylelint-config",
  "rules": {
    "rem-over-px/rem-over-px": null
  }
}
```

### Overriding rules

```json
{
  "extends": "@digitoimistodude/stylelint-config",
  "rules": {
    "declaration-no-important": null
  }
}
```

See [stylelint.config.js](stylelint.config.js) for all rules.

---

## Contributing (Dude staff)

### Adding excludes

When you encounter a rule that should be excluded globally, add it to `DCS/ruleset.xml`:

```xml
<rule ref="Squiz">
  <!-- Add your exclude here -->
  <exclude name="Squiz.PHP.SomeRule" />
</rule>
```

Find the rule name from the phpcs error output (shown when using `-s` flag).

### Release cycle

1. Make changes to `DCS/ruleset.xml`
2. Update `CHANGELOG.md` with new version and changes
3. Commit and push:
   ```bash
   cd ~/Projects/dude-coding-standards
   git add -A && git commit -m "Your change description, Ref: DEV-624"
   git push
   ```
4. Tag a new release:
   ```bash
   git tag 1.0.x
   git push --tags
   ```

The GitHub Actions workflow will automatically create a release when a new tag is pushed.

Projects using the package can update with:
```bash
composer update digitoimistodude/dude-coding-standards
```

**Note:** Projects using path repository (symlink) get changes instantly without updating.

---

## References

- [Public Dude Coding Standards handbook: dev.docs.dude.fi](https://dev.docs.dude.fi)
- [DEV-624: Dude Coding Standards](https://linear.app/dude/issue/DEV-624)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)
- [PHP_CodeSniffer](https://github.com/PHPCSStandards/PHP_CodeSniffer)
