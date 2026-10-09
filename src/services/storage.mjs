import {mkdir,open} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

/** Append and flush a validated enquiry before reporting success. */
export async function saveEnquiry(dataDir, record) {
 try {
  await mkdir(dataDir,{recursive:true,mode:0o700});
  const file=await open(path.join(dataDir,'enquiries.ndjson'),'a',0o600);
  try {
   await file.writeFile(JSON.stringify(record)+'\n');
   await file.sync();
  } finally {
   await file.close();
  }
 } catch (err) {
  if (err.code === 'EROFS' || err.code === 'EACCES') {
   const fallbackDir = path.join(os.tmpdir(), 'migrationfactor-data');
   await mkdir(fallbackDir, {recursive:true, mode:0o700});
   const file = await open(path.join(fallbackDir, 'enquiries.ndjson'), 'a', 0o600);
   try {
    await file.writeFile(JSON.stringify(record)+'\n');
    await file.sync();
   } finally {
    await file.close();
   }
  } else {
   throw err;
  }
 }
}
