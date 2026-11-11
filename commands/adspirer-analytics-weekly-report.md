---
name: adspirer-analytics-weekly-report
description: Build a read-only cross-channel performance report for the last complete week (or a period you name) across your connected ad platforms.
---

# Weekly performance report

Load adspirer-analytics-strategy, adspirer-analytics-tools and adspirer-analytics-cross-channel.

1. Call get_connections_status. If the user has not said which platforms and accounts to include,
   list what is connected and ask; never invent an account id.
2. Default to the last complete Monday–Sunday week in each account's timezone unless the user gave
   a period. Pull the previous equivalent period for comparison.
3. Read each platform through its own router (see references/common-operations.md in
   adspirer-analytics-platform-reports).
4. Report:
   - a channel table: spend, impressions, clicks, CTR, CPC, conversions, CPA, ROAS where available;
   - a blended total computed from comparable totals, with per-currency subtotals if currencies
     differ and no conversion rate is given;
   - week-over-week change and the three changes that matter most, with evidence;
   - gaps: platforms with missing, partial or lagging data, and attribution-window differences.
5. End with suggested next questions. Nothing is changed; for a campaign change, point to a
   separate Adspirer connector.

If a quota or plan limit blocks the report, stop and explain it. Never buy or upgrade a plan.
