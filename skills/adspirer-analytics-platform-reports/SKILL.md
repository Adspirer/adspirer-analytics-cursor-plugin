---
name: adspirer-analytics-platform-reports
description: "Report one ad platform in depth — Google, Meta, TikTok, LinkedIn, Amazon, Microsoft (Bing), ChatGPT or Walmart Ads — at campaign, ad group, ad, keyword, search-term, audience or product level. Use when the user names one platform or asks for its campaigns, search terms, creatives, placements or ACoS."
---

# Per-platform ad analytics

Load adspirer-analytics-tools. Each platform has one read router; the router name is the platform,
so there is no platform argument. Start from references/common-operations.md for the usual report
operations; call {"action":"list_tools"} when you need something else or a name is missing, then
get_tool_schema, then {"action":"execute",...}.

| Platform | Read router | Covers |
| --- | --- | --- |
| Google Ads | google_ads_analytics | campaign/ad-group/keyword/asset performance, search-term and wasted-spend analysis, metrics, and listing accounts/campaigns/ads/keywords/audiences |
| Meta Ads | meta_ads_analytics | Facebook and Instagram campaign/ad-set/ad performance, audience and creative-fatigue analysis, pixel and catalog insights |
| LinkedIn Ads | linkedin_ads_analytics | campaign performance and structure, audience insights and size/forecast estimates, creative analysis, B2B targeting |
| TikTok Ads | tiktok_ads_analytics | campaign/ad-group/ad performance, geo and creative-fatigue analysis, audience insights |
| Amazon Ads | amazon_ads_analytics | Sponsored Products/Brands/Display performance, search-term/placement/targeting analysis, bid and keyword recommendations, reports |
| Microsoft (Bing) Ads | bing_ads_analytics | campaign/ad-group/ad/audience performance, search-term, quality-score, impression-share and share-of-voice analysis |
| ChatGPT Ads | chatgpt_ads_analytics | campaign and ad performance, conversion and audience insights |
| Walmart Ads | walmart_ads_analytics | Walmart Connect Sponsored Products/Display performance at campaign/ad-group/item/SKU level, catalog insights |

Use the platform's real account id as a string (Google customer_id, Meta act_ id, Amazon
profile_id, Walmart advertiser_id, and so on). Confirm currency, timezone, date range and
attribution window rather than assuming. If more than one account exists and none is given, relay
the list the tool returns and let the user choose.

Compute ACoS/ROAS/CPA from comparable totals; zero conversions makes a ratio undefined, not zero.
Warehouse or near-real-time reports can lag — report absence and freshness, do not repeatedly poll.
Do not assume report parity across platforms or present ad-attributed sales as total revenue.
Everything here is read-only; for a campaign change, point the user to a separate Adspirer
connector.
