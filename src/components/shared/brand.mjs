/** Consistent company mark and wordmark for the header and footer. */
export function brand(showName=true) {
 return `<a class="brand" href="/" aria-label="Migration Factor home"><img class="brand-mark" src="/brand/mark.webp" width="200" height="200" alt="" decoding="async">${showName?'<span class="brand-name">Migration <span>Factor</span></span>':''}</a>`;
}
export const headerBrand=()=>brand(false);

/** Use the supplied dark logo, with its original company name and tagline. */
export function footerBrand() {
 return `<a class="brand" href="/" aria-label="Migration Factor home"><svg class="brand-mark footer-logo" viewBox="0 0 600 554" width="600" height="554" aria-hidden="true" focusable="false"><defs><filter id="footer-logo-alpha" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 9 9 9 0 -8.1"/></filter><clipPath id="footer-logo-symbol"><rect width="600" height="445"/></clipPath><clipPath id="footer-logo-lettering"><rect y="445" width="600" height="65"/></clipPath><clipPath id="footer-logo-tagline"><rect y="510" width="600" height="44"/></clipPath></defs><g filter="url(#footer-logo-alpha)"><image href="/brand/footer-logo.webp" x="-103" width="600" height="554" clip-path="url(#footer-logo-symbol)"/><image href="/brand/footer-logo.webp" width="600" height="554" clip-path="url(#footer-logo-lettering)"/><image href="/brand/footer-logo.webp" x="-58" width="600" height="554" clip-path="url(#footer-logo-tagline)"/></g></svg></a>`;
}
