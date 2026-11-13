# Adspirer Marketing Analytics for Cursor

Read-only marketing analytics and attribution. Report ad performance across Google, Meta, TikTok, LinkedIn, Amazon, Microsoft, ChatGPT and Walmart Ads, plus GA4, Search Console and Tag Manager. Changes nothing.

Ask Cursor how your advertising is doing and get answers from your real accounts: spend, clicks,
conversions, CPA and ROAS by channel, a blended cross-channel view, attribution and funnel
diagnosis, conversion-tracking audits, wasted-spend analysis and competitor ad research.
[Explore Adspirer Marketing Analytics](https://www.adspirer.com/analytics).

## Read-only by design

Adspirer Marketing Analytics performs **no writes**. It cannot create, change, pause, resume or delete a
campaign, budget, tag or property, and it never spends money. To create or optimize campaigns, use
a separate Adspirer plugin (Adspirer, Search Ads, Social Ads or Retail Ads).

## What's included

- **Hosted MCP connection** at `https://mcp.adspirer.com/analytics` with browser OAuth. No API key,
  bundled server or stored credentials.
- **Ad platforms:** Google, Meta (Facebook and Instagram), TikTok, LinkedIn, Amazon, Microsoft
  (Bing), ChatGPT and Walmart Ads.
- **Web analytics:** Google Analytics 4, Google Search Console and Google Tag Manager (read only).
- **Cross-channel tools:** Google and Meta performance cards, conversion-tracking audit, funnel
  diagnosis and competitor ad research.
- **10 skills, 3 commands, 1 agent and 1 rule** that teach the agent to report accurately.

| Skill | Use it for |
| --- | --- |
| [Cross-channel](skills/adspirer-analytics-cross-channel/SKILL.md) | Blended spend, CPA and ROAS by channel |
| [Platform reports](skills/adspirer-analytics-platform-reports/SKILL.md) | One platform in depth: campaigns, search terms, creatives, products |
| [Web analytics](skills/adspirer-analytics-web-analytics/SKILL.md) | GA4 traffic and key events, Search Console queries and pages, GTM tags |
| [Attribution](skills/adspirer-analytics-attribution/SKILL.md) | Funnel drop-off and why platform and GA4 numbers disagree |
| [Conversion tracking](skills/adspirer-analytics-conversion-tracking/SKILL.md) | Is tracking set up correctly, and what's missing |
| [Wasted spend and competitors](skills/adspirer-analytics-competitor-research/SKILL.md) | Non-converting spend; competitors' public ads |
| [Setup](skills/adspirer-analytics-setup/SKILL.md) | Connected accounts and properties |
| [Strategy](skills/adspirer-analytics-strategy/SKILL.md) | Routing broad questions |
| [Tools](skills/adspirer-analytics-tools/SKILL.md) | How the agent calls the MCP tools |
| [Product help](skills/adspirer-analytics-product-help/SKILL.md) | Plans, quota and troubleshooting |

| Command | What it does |
| --- | --- |
| `/adspirer-analytics-weekly-report` | Last complete week across your channels, with week-over-week change |
| `/adspirer-analytics-tracking-audit` | Grade conversion tracking across platforms, GA4, GTM and the Meta Pixel |
| `/adspirer-analytics-wasted-spend` | Spend that isn't converting, with proposed fixes you apply yourself |

## Get started

1. Install **Adspirer Marketing Analytics** from the Cursor Marketplace.
2. Use any tool or command; Cursor opens a browser window to sign in to Adspirer.
3. Connect your ad accounts and analytics properties at https://adspirer.ai/connections.

An Adspirer account and an applicable plan are required; platform permissions and usage limits
apply.

### MCP only

To use the tools without the skills, commands, agent and rule, add this to your Cursor MCP
configuration alongside your other servers:

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

Use one connection path at a time to avoid duplicate tools.

## Example prompts

- "Show me spend, clicks, conversions, CPA and ROAS by channel for the last complete 30 days across Google, Meta and Amazon, with a blended total."
- "Break down my Google Ads campaign performance for last month and flag the search terms spending without converting."
- "Which Search Console queries and pages drive the most clicks, and where did organic impressions drop?"
- "Walk my conversion funnel and tell me where it breaks, then check whether my GA4 and Meta Pixel tracking is set up correctly."
- "What ads is <competitor> running right now?"

## Safety

- **No writes.** Requests to pause, create, change a budget, submit a URL for indexing or edit a tag
  are declined with a read-only message.
- **No purchases.** The agent never buys, upgrades, renews or starts a trial of a monthly or yearly
  subscription or any paid feature for you, including when running autonomously (for example in
  Grok Bot) with browser or payment tools. If a quota or plan limit is reached, it stops, explains
  the limit and links pricing; you decide.
- **Confirmation first.** The agent asks before quota-heavy runs, such as reporting on every
  account or property.
- **Honest numbers.** Currency, dates, attribution window and data freshness are stated; ratios are
  computed from totals; missing data is never reported as zero; platform-attributed revenue is not
  treated as incremental profit; competitor research covers public ads only.
- No scheduled jobs or background monitoring are configured by this plugin.
- Never paste tokens into chat.

## Support

- Support: support@adspirer.com
- Documentation: https://www.adspirer.com/docs
- Privacy: https://www.adspirer.com/privacy
- Terms: https://www.adspirer.com/terms
- Security: see [SECURITY.md](SECURITY.md)

## Development

Run `node scripts/validate-plugin.mjs` and `ruby scripts/validate-frontmatter.rb`. Maintainer notes,
the tool audit and review scenarios are in [.github/maintainers](.github/maintainers/REVIEW.md).

## License

[MIT](LICENSE)
