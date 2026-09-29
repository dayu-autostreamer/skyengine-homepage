import {mkdir, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {openSync} from 'fontkit';
import sharp from 'sharp';

// Outlined wordmarks have no font dependencies when downloaded or embedded.
const root = fileURLToPath(new URL('../', import.meta.url));
const sourceFont = openSync(resolve(root, 'assets/brand/Manrope.ttf'));
const font = sourceFont.getVariation({wght: 700});
const regular = sourceFont.getVariation({wght: 500});
const out = resolve(root, 'static/img');
await mkdir(out, {recursive: true});

function word(text, size, x, y, fill, face = font) {
  const run = face.layout(text);
  const scale = size / face.unitsPerEm;
  let advance = 0;
  const paths = run.glyphs
    .map((glyph, i) => {
      const pos = run.positions[i];
      const p = `<path d="${glyph.path.toSVG()}" transform="translate(${advance + pos.xOffset} ${pos.yOffset})"/>`;
      advance += pos.xAdvance;
      return p;
    })
    .join('');
  return `<g fill="${fill}" transform="translate(${x} ${y}) scale(${scale} ${-scale})">${paths}</g>`;
}

function mark(color = '#087f72', accent = '#c38b40') {
  // An open logistics loop surrounds the Chinese 工 (work/manufacturing).
  // The amber node is a workpiece travelling between resources.
  return `<path d="M68 17 48 6 14 26v39l34 20 34-20V43" fill="none" stroke="${color}" stroke-width="7.5" stroke-linecap="square" stroke-linejoin="round"/>
    <path d="M30 29h36v8H53v22h13v8H30v-8h13V37H30Z" fill="${color}"/>
    <path d="m82 19 6 6-6 6-6-6Z" fill="${accent}"/>`;
}
function svg(w, h, body, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;
}

const manifest = [];
for (const white of [false, true]) {
  const suffix = white ? '-white' : '';
  const ink = white ? '#ffffff' : '#17312e';
  const symbol = mark(white ? '#ffffff' : '#087f72', white ? '#ffffff' : '#c38b40');
  const variants = {
    icon: svg(96, 96, `<g transform="translate(0 2)">${symbol}</g>`, 'SkyEngine symbol'),
    text: svg(374, 72, word('SkyEngine', 62, 2, 57, ink), 'SkyEngine wordmark'),
    horizontal: svg(
      428,
      96,
      `<g transform="translate(0 2)">${symbol}</g>${word('SkyEngine', 54, 109, 67, ink)}`,
      'SkyEngine',
    ),
    vertical: svg(
      374,
      232,
      `<g transform="translate(115 0) scale(1.5)">${symbol}</g>${word('SkyEngine', 62, 2, 209, ink)}`,
      'SkyEngine',
    ),
  };
  for (const [name, data] of Object.entries(variants)) {
    const basename = `skyengine-logo-${name}${suffix}`;
    await writeFile(resolve(out, `${basename}.svg`), data);
    await sharp(Buffer.from(data))
      .resize({width: name === 'icon' ? 512 : 1284})
      .png()
      .toFile(resolve(out, `${basename}.png`));
    manifest.push({
      variant: name,
      color: white ? 'white' : 'color',
      svg: `img/${basename}.svg`,
      png: `img/${basename}.png`,
    });
  }
}

const favicon = svg(
  96,
  96,
  `<rect width="96" height="96" rx="21" fill="#087f72"/><g transform="translate(8 7) scale(.84)">${mark('#ffffff', '#f2c481')}</g>`,
  'SkyEngine',
);
await writeFile(resolve(out, 'favicon.svg'), favicon);
const iconImages = await Promise.all(
  [16, 32, 48, 64].map((size) => sharp(Buffer.from(favicon)).resize(size, size).png().toBuffer()),
);
const icoHeader = Buffer.alloc(6 + 16 * iconImages.length);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(iconImages.length, 4);
let offset = icoHeader.length;
iconImages.forEach((buffer, i) => {
  const pos = 6 + 16 * i,
    size = [16, 32, 48, 64][i];
  icoHeader[pos] = size;
  icoHeader[pos + 1] = size;
  icoHeader.writeUInt16LE(1, pos + 4);
  icoHeader.writeUInt16LE(32, pos + 6);
  icoHeader.writeUInt32LE(buffer.length, pos + 8);
  icoHeader.writeUInt32LE(offset, pos + 12);
  offset += buffer.length;
});
await writeFile(resolve(out, 'favicon.ico'), Buffer.concat([icoHeader, ...iconImages]));
await sharp(Buffer.from(favicon))
  .resize(180, 180)
  .png()
  .toFile(resolve(out, 'apple-touch-icon.png'));

const card = svg(
  1200,
  630,
  `<rect width="1200" height="630" fill="#f6f8f5"/>
  <path d="M880 0v630M1000 0v630M1120 0v630M760 0v630M720 150h480M720 270h480M720 390h480M720 510h480" stroke="#dce5dc"/>
  <g transform="translate(805 172) scale(2.6)">${mark()}</g>
  <g transform="translate(68 60) scale(.68)">${mark()}</g>${word('SkyEngine', 40, 145, 108, '#17312e')}
  ${word('A factory for', 64, 68, 266, '#17312e')}${word('your next idea.', 64, 68, 350, '#087f72')}
  ${word('Manufacturing simulation & scheduling', 24, 72, 431, '#5e726a', regular)}
  <path d="M72 514h1060" stroke="#dce5dc"/>${word('OPEN SOURCE. OPEN POSSIBILITIES.', 14, 72, 561, '#087f72', regular)}`,
  'SkyEngine - Manufacturing simulation and scheduling',
);
await writeFile(resolve(out, 'skyengine-social-card.svg'), card);
await sharp(Buffer.from(card)).png().toFile(resolve(out, 'skyengine-social-card.png'));
await mkdir(resolve(root, 'static/brand'), {recursive: true});
await writeFile(
  resolve(root, 'static/brand/manifest.json'),
  JSON.stringify(
    {
      name: 'SkyEngine',
      colors: {jade: '#087f72', ink: '#17312e', amber: '#c38b40', paper: '#f6f8f5'},
      assets: manifest,
    },
    null,
    2,
  ) + '\n',
);
console.log('Generated 8 SVG/PNG logo pairs, favicons, social card, and brand manifest.');
