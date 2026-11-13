# Cursor submission audit — 2026-11-11

## Verdict

Package structure and catalog-based read/write classification pass. Ready for Cursor host testing
and publisher review preparation, not a claim of marketplace submission, approval, ranking or
end-to-end reporting success.

## Primary sources and examples

- [Cursor plugin reference](https://cursor.com/docs/reference/plugins): manifest paths, component discovery, frontmatter, HTTP MCP, skills and rules.
- [Official template](https://github.com/cursor/plugin-template): single-plugin repositories explicitly omit marketplace.json; its default multi-plugin wrapper is unnecessary here.
- Prior Adspirer Main, Search Ads, Social Ads and Retail Ads manifests: same single-plugin layout, relative logo, skill/agent/rule paths, HTTP MCP and company author. Categories are requests, not guaranteed storefront placement.
- Retail Ads Cursor package (sibling): the same validation harness, operation-index and submission-doc shape, adapted here for a read-only surface.

These examples demonstrate accepted source patterns, not proof that every merged change is already
visible in the public marketplace. No extra commands, hooks, dynamic variables, stdio bridge or
multi-plugin catalog is needed for the existing OAuth HTTP endpoint.

## Checks performed

- Official current Cursor manifest schema; JSON and YAML parsing.
- Ten matching analytics-prefixed skill names, each description stating when to use it, and existing skill/reference links.
- Three analytics-prefixed commands; operation names cited in skills, references and commands exist in the read index.
- Purchase/consent guardrail present in the tools contract, rule, agent and product help.
- Maintainer docs live in .github/maintainers, not the plugin root.
- One scoped agent and one non-global rule; no unrelated endpoint or write-tool references.
- Nineteen top-level tools confirmed read-only; 316 read operation names taken from the canonical catalog and cross-checked against the per-router list.
- Logo is a committed square SVG with a black background plate (plus a 640x640 PNG and a light variant); no credential placeholders, customer data or auth cache bundled.
- CI validates package shape, YAML, schema and whitespace. Copy consistency and primary search terms are regression checks.

## Search discovery

Name: Adspirer Marketing Analytics. Preview: Read-only marketing analytics and attribution.
Keywords include marketing analytics, ad analytics, cross-channel reporting, attribution, ROAS,
CPA, per-platform analytics terms, GA4, Search Console, conversion tracking and wasted spend.
Competitor product names are deliberately not used as keywords.
README and GitHub About should use consistent descriptions, a public analytics-product homepage and
relevant topics. All ten skills retain the requested adspirer-analytics- prefix. Their descriptions
explain actual tasks; do not repeat synonyms merely to stuff keywords.

Cursor documents keywords as discovery metadata but does not publish guaranteed ranking weights.
Skill and tool names do not guarantee marketplace search placement. Website indexing, GitHub
search, Cursor search and model skill selection are separate mechanisms.
Keep the primary display name stable and request appropriate publisher/category association. Do not
claim verified status until Cursor grants it.

## Remaining checks and decisions

1. Run the local installation and OAuth checks in Cursor itself. MCP client authentication is not proof of Cursor installation/co-installation behavior.
2. Run the read-only report cases with an agreed account. Confirm that every write request (pause, create, budget, URL indexing, GTM tag edit) is refused and nothing changes.
3. Confirm final category with Cursor. Data & Analytics is requested, not assigned by this repository.
4. Ensure the live storefront matches submitted copy after publication/re-indexing.
5. The Analytics homepage (https://www.adspirer.com/analytics) should be indexable; consider adding Cursor to the website's copy/title in a separate website change. No website was changed here.
6. Published privacy/terms cover MCP integrations broadly; have the policy owner confirm coverage of the Google Analytics / Search Console / Tag Manager reads. This audit is not a legal certification.

No changes were made to the server or to the original Main, Search Ads, Social Ads or Retail Ads
plugins.
