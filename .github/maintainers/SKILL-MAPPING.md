# Skill design

Purpose-built for the read-only Adspirer Analytics endpoint, adapted from the Adspirer Cursor
family (Main, Search Ads, Social Ads, Retail Ads). Because this connector performs no writes, the
write-oriented workflows from the ad-ops packages (campaign launch, ad creative, write
optimization, account activation) are deliberately omitted. Every skill name includes `analytics`
to distinguish it from Main, Search, Social and Retail.

Routing and tool details were checked against the canonical read/write catalog on 2026-11-11.

| Workflow | Analytics skill | Scope |
| --- | --- | --- |
| MCP contract | adspirer-analytics-tools | 19 read-only top-level tools; router/integration/widget dispatch; no write path |
| Setup | adspirer-analytics-setup | Connect ad accounts and GA4/Search Console/Tag Manager; no activation step |
| Docs/product help | adspirer-analytics-product-help | Current docs and account helpers, no cached prices |
| Agent strategy | adspirer-analytics-strategy | Read-only routing, evidence, honesty on gaps |
| Cross-channel reporting | adspirer-analytics-cross-channel | Blended spend/CPA/ROAS across 8 platforms, currency- and attribution-aware |
| Per-platform reports | adspirer-analytics-platform-reports | One read router per platform; the router name is the platform |
| Web analytics | adspirer-analytics-web-analytics | GA4, Search Console, Tag Manager read actions only |
| Attribution | adspirer-analytics-attribution | diagnose_funnel plus per-platform and site-side reads; overlap, not proof |
| Conversion tracking | adspirer-analytics-conversion-tracking | audit_conversion_tracking; read config, grade, never fix |
| Wasted spend + competitors | adspirer-analytics-competitor-research | Read wasted-spend analysis and public competitor_ads_research |

## Commands

| Command | Skills it loads |
| --- | --- |
| adspirer-analytics-weekly-report | strategy, tools, cross-channel |
| adspirer-analytics-tracking-audit | tools, conversion-tracking |
| adspirer-analytics-wasted-spend | tools, competitor-research |

## Consent and purchases

The purchase/consent guardrail lives in the always-loaded tools contract, the rule and the agent
(not a separate skill, which might not be selected), with a pointer in product-help. It covers
Grok Bot and any autonomous agent: never buy, upgrade, renew or start a trial of a monthly or
yearly plan; stop at quota limits with a pricing link; confirm quota-heavy runs. CI fails if the
guardrail is removed.

## What is deliberately not here

- No campaign creation, update, pause/resume, delete, bid, budget or targeting write of any kind.
- No `activate_ad_accounts` / switch-account tool; picking which account to read is not a write.
- No write actions on GA4, Search Console or Tag Manager (indexing, sitemaps, tag edits).
- No unattended monitoring, scheduling or onboarding workflow.
- No purchase, upgrade or billing action of any kind.

Original repositories and server implementation were not changed.
