export interface EmailContext {
  name: string;
  subject: string;
  appUrl?: string;
  activationLink?: string;
  resetLink?: string;
  [key: string]: string | undefined; // Allow additional properties as strings or undefined
}
