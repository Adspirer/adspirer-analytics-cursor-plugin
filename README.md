# Adspirer Analytics for Cursor

Read-only marketing analytics and attribution. Report ad performance across Google, Meta, TikTok, LinkedIn, Amazon, Microsoft, ChatGPT and Walmart Ads, plus GA4, Search Console and Tag Manager. Changes nothing.

Query **marketing analytics** and **cross-channel advertising reporting** from Cursor — spend, clicks, conversions, CPA and ROAS by channel, attribution and funnel diagnosis, conversion-tracking audits and competitor research. A read-only alternative to Supermetrics and Windsor.ai that also carries each platform's own analytics. [Explore Adspirer Analytics](https://www.adspirer.com/analytics).

Company-owned Cursor distribution package using **https://mcp.adspirer.com/analytics**.
Requested category: **Data & Analytics**; Cursor controls final placement and verification.
Cross-channel reporting, attribution, ROAS/CPA measurement and web-analytics reads make this a natural fit for Data & Analytics.
This repository is not a marketplace approval or submission.

## Read-only by design

This connector performs **no writes**. It cannot create, change, pause, resume, delete or spend
anything. There is no write router and no activate/switch-account tool; every tool reports data and
is annotated `readOnlyHint: true`. To create or optimize campaigns, use a separate Adspirer
connector (Search Ads, Social Ads or Retail Media Ads).

## What it includes

- Eight per-platform read routers — `google_ads_analytics`, `meta_ads_analytics`, `linkedin_ads_analytics`, `tiktok_ads_analytics`, `amazon_ads_analytics`, `bing_ads_analytics` (Microsoft), `chatgpt_ads_analytics` and `walmart_ads_analytics` — exposing 316 read operations in total.
- Three web-analytics read tools: Google Analytics (GA4), Google Search Console and Google Tag Manager.
- Five cross-channel tools: campaign-performance cards for Google and Meta, a conversion-tracking audit, a conversion-funnel diagnosis and competitor-ads research. Several render an interactive card.
- Ten task-specific skills, one analytics agent and one task-scoped rule.
- Hosted HTTP MCP with browser OAuth and PKCE; no bundled server, API key or credentials.

Web-analytics tools expose read actions only; writes (submit a URL for indexing, create or edit a
GTM tag, create a GA4 property) are refused here. competitor_ads_research reports public ad-library
observations and cannot prove a competitor's private spend, sales or ROAS.

## Connect in Cursor

Before marketplace publication, copy this repository's plugin files (including the hidden `.cursor-plugin` directory, but not `.git`) into `~/.cursor/plugins/local/adspirer-analytics`. Restart Cursor or run **Developer: Reload Window**, then open **Customize** and verify 10 skills, one agent, one rule and the MCP connection. Local plugin imports must be allowed by your organization. A symlink to a checkout outside the local-plugin directory is not supported by Cursor's documented workflow.

For MCP-only access, merge this entry into your existing Cursor MCP configuration without replacing other servers:

```json
{
  "mcpServers": {
    "adspirer-analytics": {
      "type": "http",
      "url": "https://mcp.adspirer.com/analytics"
    }
  }
}
```

MCP-only setup exposes tools but does not install the packaged skills, agent or rule. Use one connection path at a time to avoid duplicate servers.
Complete the browser authorization flow, then connect the relevant ad accounts and analytics properties at https://adspirer.ai/connections.
After marketplace approval, install the published Adspirer Analytics listing. Do not assume a listing exists from this repository alone.
An Adspirer account and applicable service plan/access are required; ad-platform fees and usage limits apply.
Never paste tokens into chat or commit OAuth credentials.

## Skills

- [adspirer-analytics-tools](skills/adspirer-analytics-tools/SKILL.md)
- [adspirer-analytics-setup](skills/adspirer-analytics-setup/SKILL.md)
- [adspirer-analytics-product-help](skills/adspirer-analytics-product-help/SKILL.md)
- [adspirer-analytics-strategy](skills/adspirer-analytics-strategy/SKILL.md)
- [adspirer-analytics-cross-channel](skills/adspirer-analytics-cross-channel/SKILL.md)
- [adspirer-analytics-platform-reports](skills/adspirer-analytics-platform-reports/SKILL.md)
- [adspirer-analytics-web-analytics](skills/adspirer-analytics-web-analytics/SKILL.md)
- [adspirer-analytics-attribution](skills/adspirer-analytics-attribution/SKILL.md)
- [adspirer-analytics-conversion-tracking](skills/adspirer-analytics-conversion-tracking/SKILL.md)
- [adspirer-analytics-competitor-research](skills/adspirer-analytics-competitor-research/SKILL.md)

See [SKILL-MAPPING.md](SKILL-MAPPING.md) for the skill design and [TOOL-COVERAGE.md](TOOL-COVERAGE.md) for the authenticated audit.

## Example prompts

- “Show me spend, clicks, conversions, CPA and ROAS by channel for the last complete 30 days across Google, Meta and Amazon, with a blended total — account for currency and attribution differences.”
- “Break down my Google Ads campaign performance for last month and flag the search terms and keywords spending without converting.”
- “Pull my Google Search Console data: which queries and pages drive the most clicks, and where did organic impressions drop?”
- “Walk my conversion funnel and tell me where it breaks, then check whether my GA4 and Meta Pixel conversion tracking is set up correctly.”

## Safety

This connector is read-only. Reporting prompts return data, never a confirmation step, because
nothing is changed. Any request to pause, create, edit a budget, submit a URL for indexing or change
a tag is refused with a read-only message; use a separate Adspirer connector for campaign changes.
No unattended jobs or monitoring are configured by this package. Do not infer profits or incremental
sales from attributed revenue, or a competitor's private figures from public ad observations.

## Verification and maintenance

Run `node scripts/validate-plugin.mjs` and `ruby scripts/validate-frontmatter.rb`.
CI also validates the manifest against Cursor's official schema.
The read/write classification and all 316 read operation names were taken from the canonical tool
catalog on 2026-11-11. No ad-platform or analytics operation was executed, and installation inside
Cursor remains untested.
Updates are maintained here; there is no automatic upstream sync that can overwrite this package.
Public marketplace publication/re-indexing is a separate Cursor review step.

## Support

- Support: support@adspirer.com
- Documentation: https://www.adspirer.com/docs
- Privacy: https://www.adspirer.com/privacy
- Terms: https://www.adspirer.com/terms

See [REVIEW.md](REVIEW.md) for remaining validation gates.
See [the submission audit](docs/submission-audit.md) for comparison with recent Cursor examples, search metadata and known limitations.
