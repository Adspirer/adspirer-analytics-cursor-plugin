# Review checklist

- [x] Authenticated initialize and tools/list on the hosted endpoint.
- [x] Nineteen top-level tools confirmed: 8 read routers, 3 web-analytics tools, 5 cross-channel cards, 3 helpers.
- [x] Read/write split taken from the canonical catalog: every read router lists only read operations (316 total); no write router exists.
- [x] Skills match Analytics routing and the read-only scope; no credentials or customer data packaged.
- [ ] Install in Cursor and verify all 10 skills, 3 commands, agent and rule.
- [ ] Complete fresh OAuth in Cursor; inspect account/property-selection behavior.
- [ ] Execute a user-approved read-only account/report smoke test.
- [ ] Confirm that a write request (pause, create, budget, URL indexing, GTM tag) is refused with a read-only message and nothing changes.
- [ ] Verify co-installation with other Adspirer plugins without the Analytics connector performing any write.
- [ ] Confirm the agent never buys, upgrades or starts a trial of a subscription (Cursor and Grok Bot), and stops with a pricing link at a quota limit.
- [ ] Confirm final category/publisher association with Cursor and submit/request review.

Not submitted, listed or verified by Cursor merely because the repository exists.

See [review scenarios](review-scenarios.md) for positive, boundary and negative cases with explicit expected behavior. These are proposed host tests, not claims of successful execution.
See [submission audit](submission-audit.md) for current package checks and remaining publication decisions.
