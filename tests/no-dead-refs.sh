#!/bin/bash
# Every sniff DCS references must actually exist.
#
# Upstream renames sniffs between major versions. WordPress.XSS.EscapeOutput
# became WordPress.Security.EscapeOutput, and exclusions naming the old address
# silently stopped doing anything. Dude project rulesets carried five such dead
# references for years without noticing.

set -u

PHPCS='vendor/bin/phpcs'

if [ ! -x "$PHPCS" ]; then
  echo "phpcs not found, run composer install first"
  exit 1
fi

output=$( "$PHPCS" --standard=DCS -e 2>&1 )
dead=$( echo "$output" | grep -oE 'Referenced sniff "[^"]+" does not exist' | sed -E 's/Referenced sniff "([^"]+)".*/\1/' )

if [ -n "$dead" ]; then
  echo "Dead sniff references in DCS/ruleset.xml:"
  echo "$dead" | sed 's/^/  /'
  echo ""
  echo "These do nothing. Update them to their current names or remove them."
  exit 1
fi

echo "ok  all referenced sniffs resolve"
