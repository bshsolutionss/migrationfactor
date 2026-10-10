/** Shared, dependency-free field validation for the browser and the server. */
export interface EnquiryInput {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  website?: string;
  consent?: boolean;
}

export interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  website: string;
  consent: boolean;
}

export interface ValidationResult {
  data: EnquiryData;
  errors: Record<string, string>;
}

export function validateEnquiryFields(
  input: EnquiryInput,
  serviceNames: Set<string>
): ValidationResult {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { data: {} as EnquiryData, errors: { form: 'Invalid enquiry.' } };
  }

  const data: EnquiryData = {
    name: typeof input.name === 'string' ? input.name.trim() : '',
    email: typeof input.email === 'string' ? input.email.trim() : '',
    phone: typeof input.phone === 'string' ? input.phone.trim() : '',
    service: typeof input.service === 'string' ? input.service.trim() : '',
    message: typeof input.message === 'string' ? input.message.trim() : '',
    website: typeof input.website === 'string' ? input.website.trim() : '',
    consent: input.consent === true,
  };

  const errors: Record<string, string> = {};

  if (data.name.length < 2 || data.name.length > 100) {
    errors.name = 'Please enter your full name (2–100 characters).';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254) {
    errors.email = 'Please enter a valid email address.';
  }
  if (data.phone && !/^[+\d\s().-]{6,40}$/.test(data.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!serviceNames.has(data.service)) {
    errors.service = 'Choose a listed service.';
  }
  if (data.message.length < 10 || data.message.length > 3000) {
    errors.message = 'Please enter between 10 and 3,000 characters.';
  }
  if (!data.consent) {
    errors.consent = 'Please agree before submitting your enquiry.';
  }
  if (data.website) {
    errors.form = 'This enquiry could not be accepted.';
  }

  return { data, errors };
}
