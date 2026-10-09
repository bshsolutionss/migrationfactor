import {images} from '../../assets/images.mjs';
export function photo(slot,cls='',eager=false){const im=images[slot];return `<img class="${cls}" src="${im.src}" alt="${im.alt}" width="${im.width||1000}" height="${im.height||1000}" style="object-position:${im.position}" ${eager?'fetchpriority="high" loading="eager"':'loading="lazy"'} decoding="async">`}
