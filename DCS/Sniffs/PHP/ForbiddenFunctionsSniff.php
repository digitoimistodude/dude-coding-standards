<?php
/**
 * DCS_Sniffs_PHP_ForbiddenFunctionsSniff
 *
 * Discourages the use of functions that should not be used in Dude projects.
 *
 * @package DCS
 * @since   1.0.0
 */

namespace DCS\Sniffs\PHP;

use PHP_CodeSniffer\Sniffs\Sniff;
use PHP_CodeSniffer\Files\File;

/**
 * Forbidden functions sniff for Dude Coding Standards.
 *
 * Error codes:
 * - DCS.PHP.ForbiddenFunctions.Found
 * - DCS.PHP.ForbiddenFunctions.FoundWithAlternative
 */
class ForbiddenFunctionsSniff implements Sniff {

  /**
   * Forbidden functions with alternatives and references.
   *
   * Format: 'forbidden_function' => [
   *   'alt' => 'alternative function' or null,
   *   'ref' => 'DEV-XXX' or null,
   * ]
   *
   * @var array<string, array{alt: string|null, ref: string|null}>
   */
  public $forbiddenFunctions = [
    'yoast_breadcrumb' => [
      'alt' => 'breadcrumb_trail()',
      'ref' => 'DEV-597',
    ],
  ];

  /**
   * If true, an error will be thrown; otherwise a warning.
   *
   * @var bool
   */
  public $error = true;

  /**
   * Returns an array of tokens this test wants to listen for.
   *
   * @return array<int>
   */
  public function register() {
    return [ T_STRING ];
  }

  /**
   * Processes this test when one of its tokens is encountered.
   *
   * @param File $phpcsFile The file being scanned.
   * @param int  $stackPtr  The position of the current token in the stack.
   *
   * @return void
   */
  public function process( File $phpcsFile, $stackPtr ) {
    $tokens = $phpcsFile->getTokens();
    $token  = $tokens[ $stackPtr ];

    // Get the function name in lowercase for comparison.
    $function_name = strtolower( $token['content'] );

    // Check if this is a forbidden function.
    $forbidden_functions_lower = array_change_key_case( $this->forbiddenFunctions, CASE_LOWER );

    if ( ! isset( $forbidden_functions_lower[ $function_name ] ) ) {
      return;
    }

    // Make sure this is actually a function call.
    $next_token = $phpcsFile->findNext( T_WHITESPACE, ( $stackPtr + 1 ), null, true );
    if ( false === $next_token || T_OPEN_PARENTHESIS !== $tokens[ $next_token ]['code'] ) {
      return;
    }

    // Make sure it's not a method call or a function definition.
    $prev_token = $phpcsFile->findPrevious( T_WHITESPACE, ( $stackPtr - 1 ), null, true );
    if ( false !== $prev_token ) {
      $prev_code = $tokens[ $prev_token ]['code'];
      if ( in_array( $prev_code, [ T_OBJECT_OPERATOR, T_DOUBLE_COLON, T_FUNCTION, T_NEW ], true ) ) {
        return;
      }
    }

    // Get the config for this forbidden function.
    $config      = $forbidden_functions_lower[ $function_name ];
    $alternative = $config['alt'] ?? null;
    $reference   = $config['ref'] ?? null;

    // Build the error message.
    if ( null !== $alternative && null !== $reference ) {
      $message = 'The use of function %s() is forbidden. Use %s instead. Ref: %s';
      $data    = [ $token['content'], $alternative, $reference ];
      $code    = 'FoundWithAlternative';
    } elseif ( null !== $alternative ) {
      $message = 'The use of function %s() is forbidden. Use %s instead.';
      $data    = [ $token['content'], $alternative ];
      $code    = 'FoundWithAlternative';
    } elseif ( null !== $reference ) {
      $message = 'The use of function %s() is forbidden. Ref: %s';
      $data    = [ $token['content'], $reference ];
      $code    = 'Found';
    } else {
      $message = 'The use of function %s() is forbidden.';
      $data    = [ $token['content'] ];
      $code    = 'Found';
    }

    if ( true === $this->error ) {
      $phpcsFile->addError( $message, $stackPtr, $code, $data );
    } else {
      $phpcsFile->addWarning( $message, $stackPtr, $code, $data );
    }
  }
}
