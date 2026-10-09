/** Shared, dependency-free field validation for the browser and the server. */
export function validateEnquiryFields(input, serviceNames) {
 if(!input||typeof input!=='object'||Array.isArray(input))return {errors:{form:'Invalid enquiry.'}};
 const data=Object.fromEntries(['name','email','phone','service','message','website'].map(key=>[key,typeof input[key]==='string'?input[key].trim():'']));
 data.consent=input.consent===true;
 const errors={};
 if(data.name.length<2||data.name.length>100)errors.name='Please enter your full name (2–100 characters).';
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)||data.email.length>254)errors.email='Please enter a valid email address.';
 if(data.phone&&!/^[+\d\s().-]{6,40}$/.test(data.phone))errors.phone='Please enter a valid phone number.';
 if(!serviceNames.has(data.service))errors.service='Choose a listed service.';
 if(data.message.length<10||data.message.length>3000)errors.message='Please enter between 10 and 3,000 characters.';
 if(!data.consent)errors.consent='Please agree before submitting your enquiry.';
 if(data.website)errors.form='This enquiry could not be accepted.';
 return {data,errors};
}
