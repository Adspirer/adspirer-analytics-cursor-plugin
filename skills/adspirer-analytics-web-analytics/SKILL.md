---
name: adspirer-analytics-web-analytics
description: "Read Google Analytics 4, Google Search Console and Google Tag Manager — traffic, key events, organic queries and pages, URL inspection and tag configuration. Use when the user asks about sessions, conversions in GA4, organic search, rankings, indexing status or which tags are installed."
---

# Web analytics (GA4, Search Console, Tag Manager)

Load adspirer-analytics-tools. These three tools use the router shape — {"action":"list_tools"}
then {"action":"execute","tool_name":...} — and expose only read actions. Any write (submit a URL
for indexing, submit or delete a sitemap, create or update a GTM tag or variable, create a GA4
property or key event) is refused here. If the user hasn't connected one, the tool returns a
friendly message asking them to authorize it in Settings → Connections; relay it.

- **google_analytics** — GA4 reports and metadata: sessions, users, page views, engagement, bounce
  rate; conversions and key events; audience demographics, geography and device; traffic sources
  (organic, paid, referral, social, direct). Use it to compare ad spend against actual site
  outcomes.
- **google_search_console** — organic-search performance: clicks, impressions, CTR and average
  position; which queries bring traffic and which pages rank; breakdowns by query, page, country,
  device or date; comparing paid search against organic.
- **google_tag_manager** — read the tags, triggers and variables in the user's containers: which
  conversion pixels and analytics tags are installed and how they're configured. Use it to diagnose
  why a conversion pixel isn't firing by inspecting the tag config.

Picking the resource is not a write and do not guess it. A connected account often has several GA4
properties, verified Search Console sites or GTM accounts/containers/workspaces. If you call an
action without the id and more than one exists, the tool returns the labelled list for the missing
level and asks which to use — relay it and let the user pick, one level at a time. Never invent a
property id, siteUrl, accountId, containerId or workspaceId.

Report the real metrics, date range and sampling or freshness the tool returns; do not fabricate
zeros for missing data. Keep GA4/Search Console reporting and ad-platform reporting as separate
measurement systems with their own attribution — do not silently merge them.
