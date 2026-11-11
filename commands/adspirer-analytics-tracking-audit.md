---
name: adspirer-analytics-tracking-audit
description: Audit and grade conversion tracking across your ad platforms, GA4, Tag Manager and the Meta Pixel, read-only, and list the gaps to fix.
---

# Conversion-tracking audit

Load adspirer-analytics-tools and adspirer-analytics-conversion-tracking.

1. Confirm which channels and, if relevant, which GA4 property and GTM container to inspect.
2. Run audit_conversion_tracking. If the card is not visible to the user, summarize it in text.
3. Corroborate with reads: platform conversion actions and recent conversion counts, GA4 key
   events, GTM tags and the Meta Pixel stats.
4. Report per channel: what is tracked, the grade, what looks missing or misconfigured, the
   evidence, and the fix the user would apply in their own tools.

Distinguish "zero conversions" from "no tracking". This command changes no tag, pixel or
conversion action, and cannot confirm a fix until a later read.
