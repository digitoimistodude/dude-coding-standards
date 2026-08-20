<?php
/**
 * Closures, heredocs and multi-line conditions.
 *
 * @package dude-coding-standards
 */

function dcs_mixed( $a, $b ) {
  if ( true === $a
    && false === $b ) {
    return true;
  }

  $cb = function() {
    return 'x';
  };

  $text = <<<TXT
      indented inside heredoc on purpose
TXT;

  return [ $cb, $text ];
}
