/** Delivery is optional. A failure never discards the durably saved enquiry. */
export async function forwardEnquiry(record, webhook, token) {
 if(!webhook) return false;
 try {
  if(new URL(webhook).protocol!=='https:') throw new Error('HTTPS required');
  const response=await fetch(webhook,{
   method:'POST',
   headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},
   body:JSON.stringify(record),signal:AbortSignal.timeout(8000),redirect:'error',
  });
  if(!response.ok)console.warn('Enquiry saved; delivery rejected. Reference:',record.id);
  return response.ok;
 } catch {
  console.warn('Enquiry saved; delivery failed. Reference:',record.id);
  return false;
 }
}
