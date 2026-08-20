<?php
/**
 * Deliberately wrong indentation, must be fully auto-fixable.
 *
 * @package dude-coding-standards
 */

function dcs_mangled( $type ) {
  switch ( $type ) {
      case 'a':
            return 1;
    case 'b':
      return 2;
  }

  if ( true ) {
        $deep = 1;
    return $deep;
  }
}
