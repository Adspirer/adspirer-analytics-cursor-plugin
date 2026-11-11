# Common read operations by platform

Starting points for the most frequent questions, from the read catalog verified on 2026-11-11.
Operation names can change: if one is missing, call the router's {"action":"list_tools"}. Always
fetch arguments with get_tool_schema before executing; do not guess parameter names.

Call shape: `<router>` with
`{"action":"execute","tool_name":"<operation>","arguments":{...}}`.

## Google Ads — `google_ads_analytics` (id: `customer_id`, string)

| Question | Operation |
| --- | --- |
| Which campaigns exist | list_campaigns |
| Campaign performance | get_campaign_performance |
| Ad and ad-group detail | get_ad_performance, get_ad_group_settings |
| Search terms | analyze_search_terms |
| Spend without conversions | analyze_wasted_spend |
| Performance Max | get_pmax_asset_performance, analyze_pmax_search_terms |
| Conversion actions | list_conversion_actions, get_conversion_action_performance |
| "Why did it change?" | explain_performance_anomaly |

## Meta Ads — `meta_ads_analytics` (id: `act_` account id, string)

| Question | Operation |
| --- | --- |
| Campaigns | list_meta_campaigns, get_meta_campaign_performance |
| Ad sets and ads | get_meta_adset_performance, analyze_meta_ad_performance |
| Creative fatigue | detect_meta_creative_fatigue |
| Wasted spend | analyze_meta_wasted_spend |
| Pixel health | list_meta_pixels, get_meta_pixel_stats |
| Catalog / product ads | analyze_meta_catalog_performance, get_meta_product_performance |
| "Why did it change?" | explain_meta_anomaly |

## LinkedIn Ads — `linkedin_ads_analytics`

| Question | Operation |
| --- | --- |
| Campaigns | list_linkedin_campaigns, get_linkedin_campaign_performance |
| Creatives | analyze_linkedin_creative_performance |
| Engagement | get_linkedin_engagement_metrics |
| Wasted spend | analyze_linkedin_wasted_spend |
| Conversions | list_linkedin_conversions |

## TikTok Ads — `tiktok_ads_analytics`

| Question | Operation |
| --- | --- |
| Campaigns | list_tiktok_campaigns, get_tiktok_campaign_performance |
| Ads | get_tiktok_ad_performance |
| Creative fatigue | detect_tiktok_creative_fatigue |
| Geography | analyze_tiktok_geo_performance |
| Wasted spend | analyze_tiktok_wasted_spend |

## Amazon Ads — `amazon_ads_analytics` (id: `profile_id`, string)

| Question | Operation |
| --- | --- |
| Profiles / marketplaces | list_amazon_profiles |
| Campaign performance | get_amazon_campaign_performance, get_amazon_combined_performance |
| Search terms | get_amazon_search_terms |
| Negative candidates | find_amazon_negative_keyword_candidates |
| Placements and targeting | analyze_amazon_placements, analyze_amazon_targeting |
| Wasted spend | analyze_amazon_wasted_spend |
| Product / ASIN | get_amazon_product_performance |

## Microsoft (Bing) Ads — `bing_ads_analytics`

| Question | Operation |
| --- | --- |
| Accounts and campaigns | list_microsoft_accounts, get_microsoft_campaign_performance |
| Keywords and search terms | get_microsoft_keyword_performance, analyze_microsoft_search_terms |
| Quality score | analyze_microsoft_quality_score |
| Impression share | analyze_microsoft_impression_share |
| Wasted spend | analyze_microsoft_wasted_spend |

## ChatGPT Ads — `chatgpt_ads_analytics`

| Question | Operation |
| --- | --- |
| Accounts and campaigns | list_chatgpt_accounts, list_chatgpt_campaigns |
| Performance | get_chatgpt_performance, get_chatgpt_insights |
| Conversions | get_chatgpt_conversion_insights |

## Walmart Ads — `walmart_ads_analytics` (id: `advertiser_id`, string)

| Question | Operation |
| --- | --- |
| Advertisers and campaigns | list_walmart_advertisers, list_walmart_campaigns |
| Ad group / item performance | get_walmart_ad_group_performance, get_walmart_ad_item_performance |
| Keywords and search terms | get_walmart_keyword_performance, get_walmart_search_term_performance |
| Data freshness | display_latest_report_date |

## Web analytics

| Tool | Common actions |
| --- | --- |
| google_analytics | google-analytics-list-property-options, google-analytics-run-report |
| google_search_console | google-search-console-list-sites, google-search-console-retrieve-site-performance-data, google-search-console-compare-search-analytics, google-search-console-inspect-urls |
| google_tag_manager | google-tag-manager-list-account-id-options, google-tag-manager-get-tags, google-tag-manager-get-tag |

Some read routers also expose planning helpers (recommendations, budget-allocation suggestions,
audience estimates). Their output is advice for the user; nothing is applied.
