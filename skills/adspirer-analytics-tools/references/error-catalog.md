# Recovery

- Missing operation: call the relevant router's list_tools again; distinguish nested operations
  from top-level tools. Never invent tools or silently use the main hub.
- Write requested: this connector has no write tools. Explain it is read-only and point to a
  separate Adspirer connector for campaign changes. Never fabricate a write or claim a change ran.
- 401: reconnect through the host's browser OAuth flow. Never ask for or display access tokens.
- 403 / account ambiguity: inspect permitted connections and ask which account, property, site or
  container. Do not omit an id to bypass access checks.
- Not connected: a web-analytics tool (GA4, Search Console, Tag Manager) returns a friendly message
  asking the user to connect it in Settings → Connections. Relay it; do not invent data.
- Quota/rate limits or plan paywall: report the actual condition from get_usage_status, link the
  official pricing page and stop. Never buy, upgrade or start a trial for the user; do not route
  around billing.
- Missing/stale warehouse data: state the gap and freshness; do not fabricate zeros or repeatedly
  poll.
- Multiple properties/sites/containers: relay the labelled list the tool returns and let the user
  pick one, a few or all. For "all", warn it means one report call per item, then confirm.
