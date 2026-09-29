import {readdir, readFile, stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {resolve, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {load as parseYaml} from 'js-yaml';

const root = fileURLToPath(new URL('../', import.meta.url));
async function files(dir) {
  const entries = await readdir(dir, {withFileTypes: true});
  return (
    await Promise.all(
      entries.map((e) => (e.isDirectory() ? files(resolve(dir, e.name)) : resolve(dir, e.name))),
    )
  ).flat();
}
const body = (content) => content.replace(/^---\n[\s\S]*?\n---(?:\n|$)/, '').trim();
async function checkContentTree(directory, translatedDirectory) {
  const enRoot = resolve(root, directory);
  const zhRoot = resolve(root, translatedDirectory);
  const en = (await files(enRoot)).map((f) => relative(enRoot, f)).sort();
  const zh = (await files(zhRoot)).map((f) => relative(zhRoot, f)).sort();
  assert.deepEqual(zh, en, `${directory}: English and Chinese content trees must match.`);
  const pages = en.filter((f) => /\.mdx?$/.test(f));
  for (const path of pages) {
    const [original, translated] = await Promise.all([
      readFile(resolve(enRoot, path), 'utf8'),
      readFile(resolve(zhRoot, path), 'utf8'),
    ]);
    assert.match(original, /^---\n[\s\S]*?title:/, `${directory}/${path}: missing English title`);
    assert.match(translated, /^---\n[\s\S]*?title:/, `${directory}/${path}: missing Chinese title`);
    assert.equal(
      Boolean(body(original)),
      Boolean(body(translated)),
      `${directory}/${path}: both languages must have content or both have title only`,
    );
  }
  return pages.length;
}
const [docsCount, communityCount] = await Promise.all([
  checkContentTree('docs', 'i18n/zh/docusaurus-plugin-content-docs/current'),
  checkContentTree('community', 'i18n/zh/docusaurus-plugin-content-docs-community/current'),
]);

const community = JSON.parse(await readFile(resolve(root, 'src/data/community.json'), 'utf8'));
const people = new Map(community.people.map((person) => [person.id, person]));
assert.equal(people.size, community.people.length, 'Community member IDs must be unique.');
for (const [locale, path] of [
  ['en', 'blog/authors.yml'],
  ['zh', 'i18n/zh/docusaurus-plugin-content-blog/authors.yml'],
]) {
  const authors = parseYaml(await readFile(resolve(root, path), 'utf8'));
  for (const person of community.people) {
    assert.ok(authors[person.id], `${path}: missing author ${person.id}`);
    assert.ok(community.roles[person.role]?.[locale], `${person.id}: invalid role ${person.role}`);
    assert.ok(person.affiliation?.[locale], `${person.id}: missing ${locale} affiliation`);
    assert.equal(
      authors[person.id].name,
      person.name[locale],
      `${person.id}: ${locale} name differs`,
    );
    assert.equal(authors[person.id].url, person.url, `${person.id}: ${locale} profile differs`);
    assert.equal(
      authors[person.id].title,
      `SkyEngine ${community.roles[person.role][locale]} · ${person.affiliation[locale]}`,
      `${person.id}: ${locale} blog role or affiliation differs`,
    );
  }
}
for (const role of Object.keys(community.roles))
  assert.ok(
    community.people.some((person) => person.role === role),
    `${role}: no members`,
  );
for (const contact of community.contacts)
  assert.ok(people.has(contact.id) && contact.email, `${contact.id}: invalid contact`);
const brand = JSON.parse(await readFile(resolve(root, 'static/brand/manifest.json'), 'utf8'));
assert.equal(brand.assets.length, 8);
for (const asset of brand.assets) {
  for (const format of ['svg', 'png'])
    assert.ok((await stat(resolve(root, 'static', asset[format]))).size > 0);
  assert.ok(
    !(await readFile(resolve(root, 'static', asset.svg), 'utf8')).includes('<text'),
    'Logo wordmarks must use outlined text',
  );
}
console.log(
  `Content OK: ${docsCount} documentation and ${communityCount} Community pages per locale; ${people.size} member profiles, author roles, and affiliations aligned; 8 logo pairs.`,
);
