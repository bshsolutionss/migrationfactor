import './environment.mjs';
export const origin=new URL(process.env.SITE_URL||'https://migrationfactor.com').origin;
