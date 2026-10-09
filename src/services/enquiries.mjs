import {services,coaching} from '../constants/content.mjs';
import {validateEnquiryFields} from '../lib/enquiry-validation.mjs';

const serviceNames=new Set([...services,...coaching].map(service=>service.name));
export const validateEnquiry=input=>validateEnquiryFields(input,serviceNames);
