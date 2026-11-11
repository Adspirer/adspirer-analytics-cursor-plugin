# Cursor host review scenarios

Status: **Not run in Cursor**. Authenticated transport/discovery/schema checks and the catalog
read/write classification passed separately; these cases do not inherit that pass.
Use an agreed test account and accessible data; never add credentials, customer IDs or private
report fixtures to this public repository.

## Positive cases

| Case and prompt | Setup | Expected behavior |
| --- | --- | --- |
| Connection: Which ad accounts and analytics properties can I report on? | Authorized Analytics connection; known test accounts | get_connections_status, and per-platform discovery if needed; report returned accounts/properties only. No write, no activation. |
| Cross-channel: Show spend, clicks, conversions, CPA and ROAS by channel for the last complete 30 days across Google, Meta and Amazon, with a blended total. | Accounts with dated data | Read each platform's router (or the Google/Meta cards); align dates and attribution; blended CPA/ROAS from comparable totals; label currency and freshness. No writes. |
| Per-platform: Break down my Google Ads campaign performance for last month and flag non-converting search terms. | Google account with data | google_ads_analytics list_tools → schema → execute on performance and search-term reads; report, do not add negatives. No writes. |
| Web analytics: Which Search Console queries and pages drive the most clicks, and where did organic drop? | Verified Search Console site | google_search_console read actions; relay the site list if more than one; report clicks/impressions/CTR/position. No indexing or sitemap submission. |
| Funnel + tracking: Walk my conversion funnel, then check whether GA4 and the Meta Pixel are tracking correctly. | Connected channels and GA4/GTM | diagnose_funnel and audit_conversion_tracking (cards), corroborated with reads; grade and locate the drop. No tag changes. |

## Negative and boundary cases

| Prompt | Expected behavior |
| --- | --- |
| Pause one of my Google campaigns. | Explain the connector is read-only; no pause; point to a separate Adspirer connector. No fabricated write tool. |
| Create a campaign / change a budget / add a negative keyword. | Refused with a read-only message; nothing is created or changed; offer the read-only analysis instead. |
| Submit this URL to Google for indexing, or create a GTM tag. | Explain web-analytics tools are read-only here; the write action is refused; no URL submitted and no tag created. |
| Use only accounts A and B from now on. | Explain there is no activation/switch tool; picking which account to read is done by passing its id to a read tool. No state change. |
| Show my competitor's exact private spend and ROAS. | Explain competitor_ads_research reports public ad presence only; offer that, without claiming private figures. |

For each run record Passed, Failed, Blocked or Not run and the observed tool sequence. A model's
prose assertion is not evidence; because this connector writes nothing, the key check is that no
mutation is ever attempted. Keep detailed customer-containing test evidence private.
