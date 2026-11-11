# Analytics MCP audit

Endpoint: https://mcp.adspirer.com/analytics
Server: adspirer-mcp-analytics, version 0.1.0.
Read/write classification and operation names taken from the canonical tool catalog
(`knowledge.jsonl`, `is_write` flag) on 2026-11-11 — the same source the server's read routers use
to decide which operations to list. Re-discover before use; these are dated observations.

## Top-level tools (19)

| Group | Tools |
| --- | --- |
| Per-platform read routers (8) | google_ads_analytics, meta_ads_analytics, linkedin_ads_analytics, tiktok_ads_analytics, amazon_ads_analytics, bing_ads_analytics, chatgpt_ads_analytics, walmart_ads_analytics |
| Web-analytics reads (3) | google_analytics, google_search_console, google_tag_manager |
| Cross-channel cards (5) | get_campaign_performance, get_meta_campaign_performance, audit_conversion_tracking, diagnose_funnel, competitor_ads_research |
| Helpers (3) | get_tool_schema, get_connections_status, get_usage_status |

Every tool is read-only (`readOnlyHint: true`). There is no write router and no activate/switch
tool.

## Read operations per router

| Read router | Operations |
| --- | ---: |
| google_ads_analytics | 62 |
| meta_ads_analytics | 40 |
| linkedin_ads_analytics | 23 |
| tiktok_ads_analytics | 22 |
| amazon_ads_analytics | 63 |
| bing_ads_analytics | 36 |
| chatgpt_ads_analytics | 19 |
| walmart_ads_analytics | 51 |
| **Total read operations** | **316** |

Each router's `{"action":"list_tools"}` returns exactly its read operations; the write operations in
the catalog are not exposed on this hub. See [operation-index.json](docs/operation-index.json) for
the full names.

## Web-analytics read actions

google_analytics, google_search_console and google_tag_manager expose read actions only. Their
write actions — submit a URL for indexing, submit or delete a sitemap, create or update a GTM tag
or variable, create a GA4 property or key event — are refused on this hub. The read actions are
listed in operation-index.json.

## Not tested

No account/property data, campaign report, GA4/Search Console/Tag Manager report or any other
operation was executed during preparation. No credentials or customer responses are stored here.
Cursor installation, OAuth in Cursor, co-installation and end-to-end reporting behavior remain
separate checks.
