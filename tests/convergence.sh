#!/bin/bash
# Convergence test for DCS.
#
# A ruleset is only valid if phpcbf can reach a fixed point. When two sniffs
# demand opposite things, phpcbf oscillates and gives up, and the developer is
# left with an error no tool can fix. That is what DEV-1254 was.
#
# Every fixture in tests/fixtures must reach zero errors after phpcbf.

set -u

PHPCS='vendor/bin/phpcs'
PHPCBF='vendor/bin/phpcbf'
STANDARD='DCS'
FIXTURES='tests/fixtures'
WORK=$( mktemp -d )
FAILED=0

if [ ! -x "$PHPCS" ]; then
  echo "phpcs not found, run composer install first"
  exit 1
fi

for fixture in "$FIXTURES"/*.php; do
  name=$( basename "$fixture" )
  cp "$fixture" "$WORK/$name"

  # Two passes, because a single pass legitimately needs a follow-up sometimes
  "$PHPCBF" --standard="$STANDARD" "$WORK/$name" > /dev/null 2>&1
  "$PHPCBF" --standard="$STANDARD" "$WORK/$name" > /dev/null 2>&1

  remaining=$( "$PHPCS" --standard="$STANDARD" --error-severity=1 --warning-severity=8 \
    --no-colors --report=summary "$WORK/$name" 2>&1 \
    | grep -oE 'A TOTAL OF [0-9]+ ERROR' | grep -oE '[0-9]+' )
  [ -z "$remaining" ] && remaining=0

  if [ "$remaining" = "0" ]; then
    echo "ok       $name"
  else
    echo "STUCK    $name leaves $remaining error(s) phpcbf cannot fix:"
    "$PHPCS" --standard="$STANDARD" --error-severity=1 --warning-severity=8 \
      --no-colors --report=source "$WORK/$name" 2>&1 | sed -n '/SOURCE/,$p' | sed 's/^/         /'
    FAILED=1
  fi
done

rm -rf "$WORK"

if [ "$FAILED" = "1" ]; then
  echo ""
  echo "Rules contradict each other. Fix the ruleset, do not exclude the fixture."
  exit 1
fi

echo ""
echo "All fixtures converge."
