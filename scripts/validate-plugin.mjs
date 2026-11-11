import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const read = p => fs.readFileSync(p, 'utf8');
const m = JSON.parse(read('.cursor-plugin/plugin.json'));
assert.equal(m.name, 'adspirer-analytics');
assert.equal(m.displayName, 'Adspirer Analytics');
assert.equal(m.repository, 'https://github.com/Adspirer/adspirer-analytics-cursor-plugin');
assert.match(m.version, /^\d+\.\d+\.\d+$/);
assert.equal(m.homepage, 'https://www.adspirer.com/analytics');
assert.ok(read('README.md').split('\n\n').includes(m.description), 'README introduction must match manifest');
assert.ok(m.description.startsWith('Read-only marketing analytics and attribution.'));
assert.ok(/Changes nothing\.$/.test(m.description), 'description must assert read-only');
assert.equal(m.category, 'data_and_analytics');
for (const term of ['marketing analytics', 'attribution', 'ROAS', 'CPA', 'GA4', 'Search Console']) assert.ok(m.keywords.includes(term), term);
for (const k of m.keywords) assert.ok(!/alternative/i.test(k), 'Do not use competitor names as keywords: '+k);
assert.notEqual(m.minClientVersions?.cursor, 'never', 'Do not hide this Cursor plugin');
for (const p of [m.logo, m.skills, m.commands, m.agents, m.rules, m.mcpServers]) {
  assert.ok(typeof p === 'string' && !path.isAbsolute(p) && !p.split('/').includes('..'), 'Unsafe package path');
}
assert.deepEqual(JSON.parse(read('mcp.json')), {mcpServers:{'adspirer-analytics':{type:'http',url:'https://mcp.adspirer.com/analytics'}}});
const MAINT='.github/maintainers';
for (const p of [m.logo, m.skills, m.commands, m.agents, m.rules, 'README.md','LICENSE','SECURITY.md',...['REVIEW.md','SKILL-MAPPING.md','TOOL-COVERAGE.md','operation-index.json'].map(f=>path.join(MAINT,f))]) assert.ok(fs.existsSync(p),p);
for (const f of ['REVIEW.md','SKILL-MAPPING.md','TOOL-COVERAGE.md','docs']) assert.ok(!fs.existsSync(f), f+' belongs in '+MAINT+', not the shipped plugin root');

const skills = fs.readdirSync('skills').filter(n=>fs.existsSync(path.join('skills',n,'SKILL.md')));
assert.equal(skills.length,10);
for(const n of skills) {
  assert.match(n,/^adspirer-analytics-[a-z-]+$/);
  assert.ok(n.length<=64);
  const c=read(path.join('skills',n,'SKILL.md'));
  assert.ok(c.includes('name: '+n+'\n'));
  const desc=(c.match(/^description: "(.*)"$/m)||[])[1]||'';
  assert.ok(/\bUse (when|before)\b/.test(desc), n+': description must say when to use the skill');
  assert.ok(desc.length<=400, n+': description too long');
}
// A references/ path must exist in the citing skill or in a skill the text points to.
const refExists=r=>skills.some(s=>fs.existsSync(path.join('skills',s,r)));

// Read-only, platform/tool integrity.
const index=JSON.parse(read(path.join(MAINT,'operation-index.json')));
assert.equal(index.readOnly,true);
assert.equal(index.endpoint,'https://mcp.adspirer.com/analytics');
const routerNames=['google_ads_analytics','meta_ads_analytics','linkedin_ads_analytics','tiktok_ads_analytics','amazon_ads_analytics','bing_ads_analytics','chatgpt_ads_analytics','walmart_ads_analytics'];
assert.deepEqual(Object.keys(index.routers),routerNames);
assert.deepEqual(index.topLevelTools.routers,routerNames);
assert.deepEqual(index.topLevelTools.integrations,['google_analytics','google_search_console','google_tag_manager']);
assert.deepEqual(index.topLevelTools.widgets,['get_campaign_performance','get_meta_campaign_performance','audit_conversion_tracking','diagnose_funnel','competitor_ads_research']);
assert.deepEqual(index.topLevelTools.helpers,['get_tool_schema','get_connections_status','get_usage_status']);
// Counts are documented in TOOL-COVERAGE.md; regenerate the index and the table together.
const coverage=read(path.join(MAINT,'TOOL-COVERAGE.md'));
for(const [k,v] of Object.entries(index.routers)) {
  const row=coverage.match(new RegExp('\\| '+k+' \\| (\\d+) \\|'));
  assert.ok(row && Number(row[1])===v.length, 'TOOL-COVERAGE count for '+k+' must be '+v.length);
  assert.equal(new Set(v).size,v.length,'duplicate operation in '+k);
}
const operations=new Set(Object.values(index.routers).flat());
const total=Number((coverage.match(/\*\*Total read operations\*\* \| \*\*(\d+)\*\*/)||[])[1]);
assert.equal(operations.size,total,'TOOL-COVERAGE total must equal distinct read operations');
// No write-verb operation may appear in a read router's index.
for(const op of operations) assert.ok(!/^(create|update|delete|add|set|pause|resume|remove|archive|associate|attach|upload|submit|cancel|rename|enable|disable)_/.test(op),'write op in read index: '+op);
const intReads=new Set(Object.values(index.integrationReadActions).flat());
for(const a of intReads) assert.ok(!/(submit|create|update|delete)-/.test(a),'write integration action: '+a);

const files=skills.map(n=>path.join('skills',n,'SKILL.md'));
for(const dir of ['agents','rules','commands']) for(const n of fs.readdirSync(dir)) files.push(path.join(dir,n));
for(const n of skills) {
  const dir=path.join('skills',n,'references');
  if(fs.existsSync(dir)) for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.md'))) files.push(path.join(dir,f));
}
const commands=fs.readdirSync('commands').filter(f=>f.endsWith('.md'));
assert.ok(commands.length>=1,'commands');
for(const f of commands) assert.match(f,/^adspirer-analytics-[a-z-]+\.md$/);
for(const p of files) {
  const c=read(p),body=c.replace(/^---\n[\s\S]*?\n---\n/,'');
  // Only the Analytics endpoint — never the main hub or a sibling ad-ops hub.
  assert.ok(!/https:\/\/mcp\.adspirer\.com\/(?:mcp|social-ads|search-ads|retail-ads)\b/.test(c),p+': wrong endpoint');
  for(const x of body.matchAll(/\badspirer-analytics-[a-z-]+\b/g)) assert.ok(skills.includes(x[0]),p+': '+x[0]);
  for(const x of body.matchAll(/references\/[a-z-]+\.md/g)) assert.ok(refExists(x[0]),p+': missing '+x[0]);
  // Operation names cited in skills/commands must exist in the read index.
  for(const x of body.matchAll(/\b((?:get|list|analyze|detect|find|explain)_[a-z_]+)\b/g)) if(!['list_tools','get_tool_schema','get_connections_status','get_usage_status','get_campaign_performance','get_meta_campaign_performance'].includes(x[1])) assert.ok(operations.has(x[1]),p+': unknown operation '+x[1]);
  // Every router name referenced in a skill body must be a real router.
  for(const x of body.matchAll(/\b[a-z_]+_ads_analytics\b/g)) assert.ok(routerNames.includes(x[0]),p+': unknown router '+x[0]);
}
// Purchase/consent guardrail must stay in the always-loaded contract, the rule and the agent.
for(const p of ['skills/adspirer-analytics-tools/SKILL.md','rules/use-adspirer-analytics.mdc','agents/analytics-agent.md','skills/adspirer-analytics-product-help/SKILL.md']) assert.match(read(p),/[Nn]ever (buy|select, buy)/,p+': purchase-consent guardrail missing');
for(const file of ['README.md',...['SKILL-MAPPING.md','TOOL-COVERAGE.md','REVIEW.md','submission-audit.md','review-scenarios.md'].map(f=>path.join(MAINT,f))]) {
  for(const match of read(file).matchAll(/\]\(([^)]+)\)/g)) {
    const target=match[1].split('#')[0];
    if(target && !/^https?:/.test(target)) assert.ok(fs.existsSync(path.resolve(path.dirname(file),target)),file+': broken link '+target);
  }
}
// Manifest logo: square SVG with a background plate and no scripts or external references.
assert.match(m.logo,/\.svg$/,'Manifest logo should be the SVG');
for(const f of [m.logo,'assets/icon-light.svg']) {
  const svg=read(f);
  const vb=svg.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
  assert.ok(vb && vb[1]===vb[2] && Number(vb[1])>=256, f+': viewBox must be square and at least 256');
  assert.match(svg,/<rect width="\d+" height="\d+" fill="(black|white)"\/>/, f+': background plate missing');
  assert.ok(!/<script|\bon[a-z]+=|href="(?!#)|<image/i.test(svg), f+': no scripts, handlers, external links or embedded rasters');
}
// Raster fallback for forms that require PNG.
const png=fs.readFileSync('assets/icon.png');
assert.equal(png.subarray(1,4).toString(),'PNG');
assert.equal(png.readUInt32BE(16),png.readUInt32BE(20),'PNG logo must be square');
assert.ok(png.readUInt32BE(16)>=256);
assert.match(read('rules/use-adspirer-analytics.mdc'), /alwaysApply: false/);
assert.ok(!fs.existsSync('.github/workflows/sync-from-ads-mcp.yml'));
console.log(`PASS: manifest, endpoint, ${skills.length} analytics skills, ${commands.length} commands, read-only surface, 19 top-level tools, ${operations.size} read operations, consent guardrail, scope and assets`);
