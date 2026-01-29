/**
 * Strapi API helper for fetching content
 * TypeScript types matching Strapi Single Type schemas
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// ============================================================================
// Strapi Response Types
// ============================================================================

export interface StrapiResponse<T> {
  data: T & { id: number };
  meta: Record<string, unknown>;
}

export interface StrapiArrayResponse<T> {
  data: Array<T & { id: number }>;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
}

// ============================================================================
// Shared Component Types (matching Strapi components)
// ============================================================================

/** Stat Item component - shared.stat-item */
export interface StatItem {
  id?: number;
  value: string;
  label: string;
}

/** Unit Item component - shared.unit-item */
export interface UnitItem {
  id?: number;
  title: string;
  size: string;
  count: number;
  price: string;
}

/** Developer Info component - shared.developer-info */
export interface DeveloperInfo {
  id?: number;
  name: string;
  address: string;
  telephone: string;
  email: string;
  reraNumber: string;
  logo?: StrapiMedia;
}

/** EOI Step component - shared.eoi-step */
export interface EOIStep {
  id?: number;
  step: string;
  order?: number;
}

/** Dropdown Option component - shared.dropdown-option */
export interface DropdownOption {
  id?: number;
  value: string;
  label: string;
  isDefault?: boolean;
}

/** Sales Manager component - shared.sales-manager */
export interface SalesManager {
  id?: number;
  name: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
}

/** Form Section component - shared.form-section */
export interface FormSection {
  id?: number;
  title: string;
  subtitle?: string;
  icon?: 'user' | 'building' | 'dollar' | 'users' | 'briefcase' | 'file';
  order?: number;
  isOptional?: boolean;
}

// ============================================================================
// Single Type Content Types (matching Strapi schemas)
// ============================================================================

/** Hero Single Type - api::hero.hero */
export interface HeroContent {
  tagline: string;
  title: string;
  subtitle: string;
  description?: string;
  buttonText: string;
  backgroundImage?: StrapiMedia;
  stats?: StatItem[];
}

/** Overview Single Type - api::overview.overview */
export interface OverviewContent {
  sectionTitle: string;
  totalUnitsLabel: string;
  totalUnits: number;
  projectName: string;
  units: UnitItem[];
}

/** EOI Form Single Type - api::eoi-form.eoi-form */
export interface EOIFormContent {
  sectionTitle: string;
  depositAmount: string;
  depositDescription?: string;
  developerInfo?: DeveloperInfo;
  eoiSteps: EOIStep[];
  processDescription: string;
  unitAllocationNote: string;
  refundNote: string;
  termsAndConditions: string;
  downPaymentOptions?: DropdownOption[];
  unitNumberOptions?: DropdownOption[];
  salesManagers?: SalesManager[];
  formSections?: FormSection[];
  // Legacy fields for backward compatibility
  developerName?: string;
  developerAddress?: string;
  developerTel?: string;
  developerEmail?: string;
  reraNumber?: string;
}

// ============================================================================
// API Helper Functions
// ============================================================================

/**
 * Fetch data from Strapi API
 * @param endpoint - API endpoint (e.g., 'hero', 'overview', 'eoi-form')
 * @param params - Optional query parameters
 */
export async function fetchStrapi<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<StrapiResponse<T>> {
  const queryString = new URLSearchParams({
    populate: '*',
    ...params,
  }).toString();

  const url = `${STRAPI_URL}/api/${endpoint}?${queryString}`;

  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Strapi API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching from Strapi (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Fetch with deep populate for nested components
 * @param endpoint - API endpoint
 */
export async function fetchStrapiDeep<T>(
  endpoint: string
): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api/${endpoint}?populate=deep`;

  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Strapi API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching from Strapi (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Fetch array data from Strapi API
 */
export async function fetchStrapiArray<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<StrapiArrayResponse<T>> {
  const queryString = new URLSearchParams({
    populate: '*',
    ...params,
  }).toString();

  const url = `${STRAPI_URL}/api/${endpoint}?${queryString}`;

  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Strapi API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching from Strapi (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Get full image URL from Strapi
 */
export function getStrapiMediaUrl(media: StrapiMedia | string | undefined): string {
  if (!media) return '';
  if (typeof media === 'string') {
    if (media.startsWith('http')) return media;
    return `${STRAPI_URL}${media}`;
  }
  const url = media.url;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

// ============================================================================
// Default/Fallback Content (used when Strapi is unavailable)
// ============================================================================

export const defaultHeroContent: HeroContent = {
  tagline: 'Luxury Living Experience',
  title: 'Treppan Living Prive',
  subtitle: 'Expression of Interest',
  description: 'This EOI is simply a declaration of interest to purchase a property within the Project and is not intended to create a legally binding contract.',
  buttonText: 'Express Interest',
  stats: [],
};

export const defaultOverviewContent: OverviewContent = {
  sectionTitle: 'Luxury Residences',
  totalUnitsLabel: 'Total Available',
  totalUnits: 2,
  projectName: 'Treppan Living Prive',
  units: [
    { title: '1 Bed Suite', size: '1,028 sq ft - 1,103 sq ft', count: 20, price: '' },
    { title: '2 Bed Suite', size: '1,617 sq ft - 2,127 sq ft', count: 43, price: '' },
    { title: '4 Bed Penthouse', size: '3,592 sq ft - 3,647 sq ft', count: 2, price: '' },
  ],
};

export const defaultEOIFormContent: EOIFormContent = {
  sectionTitle: 'Expression of Interest Form',
  depositAmount: 'AED 50,000 (Fifty Thousand Dirhams)',
  depositDescription: 'This amount is refundable if you choose not to proceed',
  developerName: 'Fakhruddin Properties',
  developerAddress: 'Office 123, ABC DEF AAAA 3, Dubai, UAE',
  developerTel: '+971 1 234 5678 or 800 ABCD (7236)',
  developerEmail: 'EOI@fakhruddinproperties.com',
  reraNumber: '1234',
  developerInfo: {
    name: 'Fakhruddin Properties',
    address: 'Office 123, ABC DEF AAAA 3, Dubai, UAE',
    telephone: '+971 1 234 5678 or 800 ABCD (7236)',
    email: 'EOI@fakhruddinproperties.com',
    reraNumber: '1234',
  },
  eoiSteps: [
    { step: 'The EOI Deposit Cheque will not be cashed and is fully refundable should a Client choose not to proceed with booking a Unit in the Project.' },
    { step: 'An acknowledgement receipt for the EOI Deposit Cheque will be issued by Fakhruddin Properties.' },
    { step: 'The EOI Deposit Cheque should mention Fakhruddin Properties as the beneficiary.' },
    { step: 'The EOI Form should be duly filled with the correct contact information of the Client.' },
    { step: 'Any EOI submission missing the above-mentioned documents or information will not be accepted.' },
    { step: 'Units will be allocated on a priority basis for Clients ready to complete full payment for their units, followed by higher down payments until reaching the standard payment terms.' },
  ],
  processDescription: 'The Interested Party should submit a EOI Deposit Cheque in favour of Fakhruddin Properties within 5 working days of completing this EOI Form in order to finalize their EOI.',
  unitAllocationNote: 'Upon confirmation of Unit Allocation for successful EOIs, the Interested Party must complete payment of 10% of the Property Purchase Price and submit all required documents and information requested by Fakhruddin Properties.',
  refundNote: 'Should the Interested Party choose not to proceed with booking a Unit in the Project, the EOI Deposit Cheque will be returned to the Interested Party within 5 working days.',
  termsAndConditions: `The Developer has called any interested person/s or company (the "Interested Party") to reserve and later purchase some of the proposed properties within the Project, the parties will then proceed to a formal booking form/sale and purchase agreement. The full terms and conditions for the purchase and ownership of the Property will be contained in the sale and purchase agreement with related documents as may be required under relevant Dubai laws (together the "SPA"). The SPA will contain (or be subject to) usual rights and obligations.

The information mentioned above is not an offer or a contract and does not constitute an interest in land. The purpose of this EOI is to provide the Developer's customers with an opportunity to express an interest within the Project prior to the official launch.

The completion and submission of this EOI (and the EOI Amount) in no way obligates the Developer to sell the Property to the Purchaser.

The Developer reserves the right to negotiate with only those interested parties that the Developer determines in its sole discretion. The Developer reserves the right to amend or cancel this EOI at any time prior to entering into a formal booking form/SPA without the requirement for a court order and/or any other formality. In the event that this EOI is cancelled by the Developer, the cheque for the EOI Amount shall be returned to the Interested Party as soon as reasonably practicable.

The Interested Party reserves the right to cancel this EOI at any time prior to entering into a formal booking form/SPA without the requirement for a court order and/or any other formality. In the event that this EOI is cancelled by the Interested Party, the cheque for the EOI Amount shall be returned to the Interested Party as soon as reasonably practicable.

The EOI Amount is provided to confirm the Interested Party's interest in the Property only and is not intended to be used to complete or fund the Project.

This EOI is personal to the Interested Party and is not assignable or transferable and the Interested Party may not at any time assign its rights and obligations under this EOI to any third party without the express written consent of the Developer.`,
  downPaymentOptions: [
    { value: '100', label: '100%' },
    { value: '50', label: '50%' },
    { value: '20', label: '20%' },
  ],
  unitNumberOptions: [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ],
  salesManagers: [
    { name: 'Ahmed Al Maktoum', isActive: true },
    { name: 'Sarah Johnson', isActive: true },
    { name: 'Mohammed Rashid', isActive: true },
    { name: 'Fatima Al Nahyan', isActive: true },
    { name: 'James Wilson', isActive: true },
  ],
  formSections: [
    { title: 'Interested Party', subtitle: 'Primary applicant details', icon: 'user', order: 1 },
    { title: 'Unit Preferences', subtitle: 'Select your preferred options', icon: 'building', order: 2 },
    { title: 'EOI Value', subtitle: 'Expression of Interest deposit amount', icon: 'dollar', order: 3 },
    { title: 'Fakhruddin Sales Manager', subtitle: 'Select your assigned sales manager', icon: 'users', order: 4 },
    { title: 'Agency Information', subtitle: 'If applicable, provide agency details', icon: 'briefcase', order: 5, isOptional: true },
  ],
};

