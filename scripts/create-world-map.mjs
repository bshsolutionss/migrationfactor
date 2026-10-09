import { readFile, writeFile, copyFile } from 'node:fs/promises';

// Natural Earth public-domain land geometry, rendered as a brand-colored silhouette.
const geography = JSON.parse(await readFile(new URL('../docs/world-land.geojson', import.meta.url), 'utf8'));
const ringPath = ring => ring.map(([longitude, latitude], index) => {
  const x = ((longitude + 180) / 360 * 1800).toFixed(1);
  const y = ((85 - latitude) / 145 * 900).toFixed(1);
  return `${index ? 'L' : 'M'}${x},${y}`;
}).join('') + 'Z';
const paths = geography.features.flatMap(({ geometry }) => {
  const polygons = geometry.type === 'MultiPolygon' ? geometry.coordinates : [geometry.coordinates];
  return polygons.map(polygon => `<path d="${polygon.map(ringPath).join('')}"/>`);
}).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="900" viewBox="0 0 1800 900"><g fill="#173b45" fill-opacity=".045" fill-rule="evenodd">${paths}</g></svg>`;
const destination = new URL('../public/media/supportWorldMap.svg', import.meta.url);
await writeFile(destination, svg);
await copyFile(destination, new URL('../nextjs-app/public/media/supportWorldMap.svg', import.meta.url));
console.log('World-map background written to both apps.');
