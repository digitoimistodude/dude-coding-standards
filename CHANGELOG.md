### 1.0.1: 2025-12-23

* Exclude `Squiz.PHP.EmbeddedPhp.ContentBeforeEnd` (allow closing PHP tag on same line)
* Exclude `Universal.PHP.RequireExitDieParentheses` (exit/die without parentheses is fine)
* Exclude `Zend.Files.ClosingTag.NotAllowed` (closing PHP tag is allowed)

### 1.0.0: 2025-12-05

* Initial release based on WordPress Coding Standards 3.3.0
* Custom sniff: `DCS.PHP.ForbiddenFunctions` with `yoast_breadcrumb()` banned, Ref: DEV-597
* ForbiddenFunctions error messages include Linear task references
* PHPCompatibilityWP for PHP 8.3+ checks
* GitHub Actions: build workflow with phpcs checks
* GitHub Actions: auto-release on CHANGELOG updates
* Downgrade to warning instead of error: `Squiz.PHP.EmbeddedPhp.NoSemicolon`
* Exclude `Squiz.PHP.EmbeddedPhp.ContentAfterOpen`
* Exclude `WordPress.DB.SlowDBQuery.slow_db_query_meta_query`
* Exclude `Squiz.Formatting.OperatorBracket` (unnecessary brackets around `??` etc.)
* Exclude `Squiz.PHP.DisallowComparisonAssignment` (allow `$var = condition ? a : b`)
* Exclude `WordPress.Files.FileName.InvalidClassFileName`
* Exclude `Universal.Classes.RequireFinalClass`
* Exclude `WordPress.WP.GlobalVariablesOverride.Prohibited` (legacy globals like `$link` not relevant for themes)
* Exclude `Squiz.ControlStructures` (handled by WordPress standard)
* Exclude `Squiz.Classes.ValidClassName` (WP uses Snake_Case, not PascalCase)
* Exclude `Squiz.PHP.GlobalKeyword` (WordPress uses global extensively)
* Exclude `Squiz.PHP.Heredoc` (heredocs are fine)
* Exclude `Squiz.PHP.DisallowMultipleAssignments` (`$a = $b = null` is fine)
* Exclude `Squiz.Strings.DoubleQuoteUsage` (too strict)
* Exclude `Generic.Arrays.DisallowLongArraySyntax` (allow both `array()` and `[]`)
* Exclude `WordPress.PHP.YodaConditions` (WordPress does not use Yoda)
* Exclude `Universal.NamingConventions.NoReservedKeywordParameterNames` (WP uses `$class`, `$array` etc.)
* Exclude `Squiz.PHP.CommentedOutCode` (too many false positives)
* Add `@digitoimistodude/stylelint-config` npm package, Ref: DEV-638
