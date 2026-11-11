---
name: adspirer-analytics-attribution
description: "Diagnose attribution and the conversion funnel across channels — where conversions are credited, where the funnel drops and why ads may not convert. Use when the user asks why ads are not converting, which channel deserves credit, or why platform and GA4 numbers disagree."
---

# Attribution and funnel diagnosis

Load adspirer-analytics-tools. Confirm the channels in scope, the date window, the conversion event
and the attribution window each platform is using before drawing conclusions. Everything here is
read-only.

Use diagnose_funnel for a structured walk of the funnel; it renders an interactive card. Combine it
with per-platform reads (the *_ads_analytics routers) and, where connected, GA4 (google_analytics)
and Search Console (google_search_console) so platform-reported conversions can be read next to
site-side outcomes.

Keep each platform's attribution honest: Google, Meta, Amazon and GA4 each count conversions under
their own model and window, so the same sale can appear in more than one. Do not add conversions
across platforms as if they were distinct, and do not treat platform-attributed conversions as
incremental. When one channel is "getting credit" for conversions another drove, present it as an
attribution overlap to investigate, not a proven fact.

For "why aren't my ads converting", walk the funnel in order — impressions → clicks → landing →
conversion — and locate the stage where the drop is, using the actual rates, before blaming any one
cause. Separate evidence (the numbers) from hypotheses (the likely cause) from recommendations
(what the user might change in their own tools). This skill never changes a campaign; hand a
tracking question to adspirer-analytics-conversion-tracking.
