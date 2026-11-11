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
assert.notEqual(m.minClientVersions?.cursor, 'never', 'Do not hide this Cursor plugin');
for (const p of [m.logo, m.skills, m.agents, m.rules, m.mcpServers]) {
  assert.ok(typeof p === 'string' && !path.isAbsolute(p) && !p.split('/').includes('..'), 'Unsafe package path');
}
assert.deepEqual(JSON.parse(read('mcp.json')), {mcpServers:{'adspirer-analytics':{type:'http',url:'https://mcp.adspirer.com/analytics'}}});
for (const p of [m.logo, m.skills, m.agents, m.rules, 'README.md','LICENSE','SECURITY.md','REVIEW.md','SKILL-MAPPING.md','TOOL-COVERAGE.md']) assert.ok(fs.existsSync(p),p);

const skills = fs.readdirSync('skills').filter(n=>fs.existsSync(path.join('skills',n,'SKILL.md')));
assert.equal(skills.length,10);
for(const n of skills) {
  assert.match(n,/^adspirer-analytics-[a-z-]+$/);
  assert.ok(n.length<=64);
  const c=read(path.join('skills',n,'SKILL.md'));
  assert.ok(c.includes('name: '+n+'\n'));
  for(const r of c.matchAll(/references\/[a-z-]+\.md/g)) assert.ok(fs.existsSync(path.join('skills',n,r[0])), r[0]);
}

// Read-only, platform/tool integrity.
const index=JSON.parse(read('docs/operation-index.json'));
assert.equal(index.readOnly,true);
assert.equal(index.endpoint,'https://mcp.adspirer.com/analytics');
const routerNames=['google_ads_analytics','meta_ads_analytics','linkedin_ads_analytics','tiktok_ads_analytics','amazon_ads_analytics','bing_ads_analytics','chatgpt_ads_analytics','walmart_ads_analytics'];
assert.deepEqual(Object.keys(index.routers),routerNames);
assert.deepEqual(index.topLevelTools.routers,routerNames);
assert.deepEqual(index.topLevelTools.integrations,['google_analytics','google_search_console','google_tag_manager']);
assert.deepEqual(index.topLevelTools.widgets,['get_campaign_performance','get_meta_campaign_performance','audit_conversion_tracking','diagnose_funnel','competitor_ads_research']);
assert.deepEqual(index.topLevelTools.helpers,['get_tool_schema','get_connections_status','get_usage_status']);
const perRouter={google_ads_analytics:62,meta_ads_analytics:40,linkedin_ads_analytics:23,tiktok_ads_analytics:22,amazon_ads_analytics:63,bing_ads_analytics:36,chatgpt_ads_analytics:19,walmart_ads_analytics:51};
assert.deepEqual(Object.fromEntries(Object.entries(index.routers).map(([k,v])=>[k,v.length])),perRouter);
const operations=new Set(Object.values(index.routers).flat());
assert.equal(operations.size,316,'316 distinct read operations');
// No write-verb operation may appear in a read router's index.
for(const op of operations) assert.ok(!/^(create|update|delete|add|set|pause|resume|remove|archive|associate|attach|upload|submit|cancel|rename|enable|disable)_/.test(op),'write op in read index: '+op);
const intReads=new Set(Object.values(index.integrationReadActions).flat());
for(const a of intReads) assert.ok(!/(submit|create|update|delete)-/.test(a),'write integration action: '+a);

const files=skills.map(n=>path.join('skills',n,'SKILL.md'));
for(const dir of ['agents','rules']) for(const n of fs.readdirSync(dir)) files.push(path.join(dir,n));
for(const p of files) {
  const c=read(p),body=c.replace(/^---\n[\s\S]*?\n---\n/,'');
  // Only the Analytics endpoint — never the main hub or a sibling ad-ops hub.
  assert.ok(!/https:\/\/mcp\.adspirer\.com\/(?:mcp|social-ads|search-ads|retail-ads)\b/.test(c),p+': wrong endpoint');
  for(const x of body.matchAll(/\badspirer-analytics-[a-z-]+\b/g)) assert.ok(skills.includes(x[0]),p+': '+x[0]);
  // Every router name referenced in a skill body must be a real router.
  for(const x of body.matchAll(/\b[a-z_]+_ads_analytics\b/g)) assert.ok(routerNames.includes(x[0]),p+': unknown router '+x[0]);
}
for(const file of ['README.md','SKILL-MAPPING.md','TOOL-COVERAGE.md','REVIEW.md']) {
  for(const match of read(file).matchAll(/\]\(([^)]+)\)/g)) {
    const target=match[1].split('#')[0];
    if(target && !/^https?:/.test(target)) assert.ok(fs.existsSync(path.resolve(path.dirname(file),target)),file+': broken link '+target);
  }
}
const logo=fs.readFileSync(m.logo);
assert.equal(logo.subarray(1,4).toString(),'PNG');
assert.equal(logo.readUInt32BE(16),logo.readUInt32BE(20),'Logo must be square');
assert.ok(logo.readUInt32BE(16)>=256);
assert.match(read('rules/use-adspirer-analytics.mdc'), /alwaysApply: false/);
assert.ok(!fs.existsSync('.github/workflows/sync-from-ads-mcp.yml'));
console.log('PASS: manifest, endpoint, 10 analytics skills, read-only surface, 19 top-level tools, 316 read operations, scope and assets');
