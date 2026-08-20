<?php
/**
 * Switch statements, the DEV-1254 regression.
 *
 * @package dude-coding-standards
 */

function dcs_switch( $type ) {
  switch ( $type ) {
    case 'a':
      return 1;
    case 'b':
      return 2;
    default:
      return 0;
  }
}
