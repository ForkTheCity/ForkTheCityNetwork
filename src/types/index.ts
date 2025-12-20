// Core entity types for ForkTheCity microsite template
// All data stored locally in localStorage for dev/testing

export type EntityType = 'organization' | 'local-business';
export type OrganizationType = 'nonprofit' | 'grassroots' | 'school' | 'university' | 'university-org';
export type PostStatus = 'open' | 'in-progress' | 'resolved' | 'closed';

// Built-in post categories
export const DEFAULT_POST_CATEGORIES = [
  'volunteers-needed',
  'feature-request',
  'concern',
  'question',
  'update',
  'announcement'
] as const;

export type DefaultPostCategory = typeof DEFAULT_POST_CATEGORIES[number];

// Member Account (Step 1 of registration)
export interface Member {
  id: string;
  email: string;
  name: string;
  createdAt: string; // ISO timestamp
  isVolunteer: boolean;
  volunteerProfileId?: string;
  // One member can own multiple entities
  ownedOrganizationIds: string[];
  ownedBusinessIds: string[];
}

// Volunteer Profile (Optional Step 2)
export interface VolunteerProfile {
  id: string;
  memberId: string;
  skills: string[]; // e.g., ["carpentry", "gardening", "tutoring"]
  availability: string; // e.g., "Weekends", "Evenings", "Flexible"
  preferredJobs: string[]; // What they're most willing to do
  hoursContributed: number;
  projectsParticipated: number;
  bio?: string;
  createdAt: string;
}

// Organization (nonprofits, grassroots, schools, universities)
export interface Organization {
  id: string;
  ownerId: string; // Member who registered this
  name: string;
  type: OrganizationType;
  missionStatement: string;
  is501c3: boolean;
  ein?: string; // Tax ID for nonprofits
  address: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  volunteerNeeds?: string; // What volunteers they need
  logo?: string; // base64 image
  createdAt: string;
  verified: boolean; // For future admin verification
}

// Local Business
export interface LocalBusiness {
  id: string;
  ownerId: string; // Member who registered this
  name: string;
  businessType: string; // e.g., "Restaurant", "Cafe", "Bookstore"
  description: string;
  services: string[]; // What they offer
  address: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  hours?: string; // Business hours as string
  logo?: string; // base64 image
  createdAt: string;
  verified: boolean;
}

// Custom Category (created by users, verified for appropriateness)
export interface CustomCategory {
  id: string;
  name: string; // lowercase-with-hyphens format
  displayName: string; // Human readable
  createdBy: string; // Member ID
  createdAt: string;
  usageCount: number; // Track popularity
  verified: boolean; // Admin can verify appropriate categories
}

// Post (issues, feature requests, concerns, questions, updates)
export interface Post {
  id: string;
  authorId: string; // Member ID
  title: string;
  description: string;
  category: string; // Can be DefaultPostCategory or custom category name
  status: PostStatus;
  location: string;
  images?: string[]; // Array of base64 strings
  supporters: number; // Count of upvotes/supporters
  createdAt: string;
  updatedAt: string;
  // Optional entity association
  organizationId?: string;
  businessId?: string;
}

// Post Response/Reply
export interface PostResponse {
  id: string;
  postId: string;
  authorId: string; // Member ID
  content: string;
  images?: string[]; // Optional images in response
  createdAt: string;
  updatedAt: string;
  // For threading (future enhancement)
  parentResponseId?: string;
}

// Helper type for display
export interface PostWithAuthor extends Post {
  author: Member;
  organization?: Organization;
  business?: LocalBusiness;
}

export interface ResponseWithAuthor extends PostResponse {
  author: Member;
}

// Authentication state
export interface AuthState {
  isAuthenticated: boolean;
  currentMember: Member | null;
}

// Registration flow state
export interface RegistrationState {
  step: 'member' | 'volunteer' | 'entity' | 'complete';
  memberId?: string;
  completedVolunteerSetup: boolean;
  completedEntitySetup: boolean;
}

// Form data types for each registration step
export interface MemberSignupForm {
  email: string;
  name: string;
  password: string; // In real app, would be hashed
  wantsToVolunteer: boolean;
}

export interface VolunteerProfileForm {
  skills: string[];
  availability: string;
  preferredJobs: string[];
  bio?: string;
}

export interface OrganizationForm {
  name: string;
  type: OrganizationType;
  missionStatement: string;
  is501c3: boolean;
  ein?: string;
  address: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  volunteerNeeds?: string;
  logo?: File | null;
}

export interface LocalBusinessForm {
  name: string;
  businessType: string;
  description: string;
  services: string[];
  address: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  hours?: string;
  logo?: File | null;
}

export interface PostForm {
  title: string;
  description: string;
  category: string;
  customCategory?: string; // If category is "custom"
  location: string;
  images?: FileList | null;
  organizationId?: string;
  businessId?: string;
}

export interface PostResponseForm {
  content: string;
  images?: FileList | null;
}
