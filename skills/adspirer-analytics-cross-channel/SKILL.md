---
name: adspirer-analytics-cross-channel
description: "Build blended cross-platform ad reports — spend, clicks, conversions, CPA, ROAS and trends by channel across Google, Meta, TikTok, LinkedIn, Amazon, Microsoft, ChatGPT and Walmart Ads. Use when the user asks to compare channels, wants a blended total, or asks for a weekly or monthly performance report."
---

# Cross-channel reporting

Load adspirer-analytics-tools. Confirm which platforms, the date window, timezone, currency and
attribution window before pulling anything. Everything here is read-only.

Pull each platform through its own read router (google_ads_analytics, meta_ads_analytics,
linkedin_ads_analytics, tiktok_ads_analytics, amazon_ads_analytics, bing_ads_analytics,
chatgpt_ads_analytics, walmart_ads_analytics). get_campaign_performance renders an interactive
Google card and get_meta_campaign_performance a Meta card; the other platforms report through their
routers. The usual performance operation per platform is listed in
adspirer-analytics-platform-reports (references/common-operations.md there).

Normalize before combining: align the date range and, where platforms differ, the attribution
window. Do not sum spend or revenue across different currencies without converting and stating the
rate and source; if you cannot, report per-currency subtotals instead of a false blended total.
Compute blended CPA and ROAS from comparable totals (total cost, total conversions, total revenue),
never as an average of per-platform ratios.

Lead with a channel-by-channel table (spend, impressions, clicks, CTR, CPC, conversions, CPA,
ROAS where available), then the blended view, then trend and the few differences that matter.
Mark any platform with missing, partial or stale data; missing data is not zero performance.
Separate ad-attributed sales from incremental or total revenue. Hand attribution questions to
adspirer-analytics-attribution. This skill changes nothing.
