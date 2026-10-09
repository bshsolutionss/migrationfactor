import {images} from '../../assets/images.mjs';

/** Preserve the supplied icon's silhouette while using the live brand color. */
export function brandIcon(slot) {
 return `<span class="brand-icon" aria-hidden="true" style="--icon:url('${images[slot].src}')"></span>`;
}
