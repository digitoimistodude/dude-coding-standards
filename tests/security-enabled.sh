#!/bin/bash
# Security rules are never disabled in DCS.
#
# Style rules are a matter of taste and get switched off freely. Security,
# database and PHP compatibility rules are not. This test makes that a build
# failure rather than a code review someone has to remember to do.

set -u

RULESET='DCS/ruleset.xml'
FAILED=0

# Sniff namespaces that must never appear with severity 0
PROTECTED='WordPress\.Security|WordPress\.DB\.(Prepared|Restricted|Direct)|WordPress\.WP\.GlobalVariablesOverride|WordPress\.PHP\.(DontExtract|DiscouragedPHPFunctions)|PHPCompatibility|WordPress\.XSS'

# Pull out every sniff that is disabled, whether written inline or over two lines
disabled=$( tr '\n' ' ' < "$RULESET" \
  | grep -oE '<rule ref="[^"]+">[^<]*<severity>0</severity>' \
  | sed -E 's/<rule ref="([^"]+)".*/\1/' )

while read -r sniff; do
  [ -z "$sniff" ] && continue
  if echo "$sniff" | grep -qE "$PROTECTED"; then
    echo "FORBIDDEN  $sniff is disabled, but security and compatibility rules must stay on"
    FAILED=1
  fi
done <<< "$disabled"

if [ "$FAILED" = "1" ]; then
  echo ""
  echo "Re-enable the rules above. If one is genuinely too noisy, lower its"
  echo "severity so it still reports, but never silence it."
  exit 1
fi

count=$( echo "$disabled" | grep -c . )
echo "ok  $count rules disabled, none of them security or compatibility"
