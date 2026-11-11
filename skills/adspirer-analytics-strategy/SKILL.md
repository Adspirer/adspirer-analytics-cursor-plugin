---
name: adspirer-analytics-strategy
description: "Plan a read-only marketing-analytics answer and route it to the right Analytics skill. Use when a request is broad or mixed, such as 'how are my ads doing', 'where should I focus', or a question spanning several platforms, attribution and site analytics."
---

# Marketing analytics agent

Start with the question behind the request: which channels, which metric, which date window,
which account, and what decision it informs. This connector answers with data; the user acts on it
in their own tools.

Load adspirer-analytics-tools before any call. Read relevant authorized BRAND.md/STRATEGY.md as
context only; nothing here mutates an account.

| Task | Skill |
| --- | --- |
| Connect accounts or analytics properties | adspirer-analytics-setup |
| Blended, cross-platform performance | adspirer-analytics-cross-channel |
| One platform in depth (Google, Meta, LinkedIn, TikTok, Amazon, Microsoft, ChatGPT, Walmart) | adspirer-analytics-platform-reports |
| GA4, Search Console or Tag Manager | adspirer-analytics-web-analytics |
| Attribution questions and funnel diagnosis | adspirer-analytics-attribution |
| Conversion-tracking audit | adspirer-analytics-conversion-tracking |
| Wasted-spend and competitor research | adspirer-analytics-competitor-research |
| Product, pricing, quota questions | adspirer-analytics-product-help |

Use only the requested Analytics connection; if the user wants to change a campaign, say this
connector is read-only and point to a separate Adspirer connector.
Separate evidence, hypotheses and forecasts. Explain tradeoffs without promising growth or profit.
Lead with supported findings, name the currency, dates, attribution window and freshness, and flag
uncertainty and gaps. Reporting returns data, never a confirmation step, because nothing changes.
No unattended reporting or monitoring exists just because this package is installed.
