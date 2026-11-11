# Security

Report vulnerabilities privately to support@adspirer.com.
Do not put OAuth tokens, signed links, customer accounts or raw customer data in public issues.
This static package connects to the existing hosted MCP server. It contains no credentials or
server code.
This connector is read-only: it reports data and performs no writes. It cannot create, change,
pause, resume, delete or spend anything, and it has no activate/switch-account tool. Web-analytics
write actions (URL indexing, sitemap or tag changes, GA4 property creation) are refused.
