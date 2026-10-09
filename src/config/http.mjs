export const mimeTypes={
 '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
 '.js':'text/javascript; charset=utf-8', '.png':'image/png',
 '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml',
 '.webp':'image/webp', '.woff2':'font/woff2',
 '.xml':'application/xml; charset=utf-8', '.txt':'text/plain; charset=utf-8',
};
export const securityHeaders={
 'X-Content-Type-Options':'nosniff',
 'Referrer-Policy':'strict-origin-when-cross-origin',
 'X-Frame-Options':'DENY',
 'Permissions-Policy':'camera=(), microphone=(), geolocation=()',
 'Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
};
