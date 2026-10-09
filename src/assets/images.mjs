// Exact original image files from the requested reference. Placements remain editable.
import {readFileSync} from 'node:fs';
const manifest=JSON.parse(readFileSync(new URL('./image-manifest.json',import.meta.url),'utf8'));
export const images=Object.fromEntries(Object.entries(manifest).map(([slot,item])=>[slot,{...item,alt:'',position:'center'}]));
Object.assign(images.hero,{alt:'Family with luggage at an airport'});
Object.assign(images.about,{alt:'Reference photograph of a visa consultant'});
Object.assign(images.enquiry,{alt:'Traveller holding a passport and travel documents'});
Object.assign(images.cta,{alt:'Traveller with luggage and a passport'});
Object.assign(images.preparation,{alt:'People discussing travel documents'});
Object.assign(images.documents,{alt:'A consultation about travel documents'});
