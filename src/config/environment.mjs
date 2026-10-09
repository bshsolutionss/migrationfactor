import {fileURLToPath} from 'node:url';

// Shared by the build and server so canonical URLs and delivery use the same environment.
try {
 if (typeof process.loadEnvFile === 'function') {
  process.loadEnvFile(fileURLToPath(new URL('../../.env',import.meta.url)));
 }
} catch(error) {
 if(error.code!=='ENOENT')throw error;
}
