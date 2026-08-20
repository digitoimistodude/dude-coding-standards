<?php
/**
 * Arrays and intentional alignment.
 *
 * @package dude-coding-standards
 */

function dcs_arrays( $args = [] ) {
  $defaults = [
    'one'   => 1,
    'two'   => 2,
    'three' => 3,
  ];

  return wp_parse_args( $args, $defaults );
}
