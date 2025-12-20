// LocalStorage API for ForkTheCity microsite
// All CRUD operations for members, volunteers, organizations, businesses, posts, and responses
// Data persists in browser localStorage for dev/testing

import {
  Member,
  VolunteerProfile,
  Organization,
  LocalBusiness,
  Post,
  PostResponse,
  CustomCategory,
  AuthState,
  PostWithAuthor,
  ResponseWithAuthor,
  DEFAULT_POST_CATEGORIES,
  PostStatus
} from '@/types';

// Storage keys
const KEYS = {
  MEMBERS: 'ftc_members',
  VOLUNTEERS: 'ftc_volunteers',
  ORGANIZATIONS: 'ftc_organizations',
  BUSINESSES: 'ftc_businesses',
  POSTS: 'ftc_posts',
  RESPONSES: 'ftc_responses',
  CATEGORIES: 'ftc_custom_categories',
  CURRENT_USER: 'ftc_current_user',
  AUTH_STATE: 'ftc_auth_state'
};

// Helper functions for localStorage operations
const getFromStorage = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return [];
  }
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
    throw new Error('Failed to save data. Storage might be full.');
  }
};

// Generate unique IDs
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// ==================== AUTHENTICATION ====================

export const authApi = {
  login: (email: string, _password: string): Member | null => {
    const members = getFromStorage<Member>(KEYS.MEMBERS);
    const member = members.find(m => m.email === email);
    
    // In real app, would verify hashed password
    // For dev, we just check if member exists
    if (member) {
      localStorage.setItem(KEYS.CURRENT_USER, member.id);
      const authState: AuthState = {
        isAuthenticated: true,
        currentMember: member
      };
      localStorage.setItem(KEYS.AUTH_STATE, JSON.stringify(authState));
      return member;
    }
    return null;
  },

  logout: (): void => {
    localStorage.removeItem(KEYS.CURRENT_USER);
    localStorage.setItem(KEYS.AUTH_STATE, JSON.stringify({
      isAuthenticated: false,
      currentMember: null
    }));
  },

  getCurrentMember: (): Member | null => {
    const userId = localStorage.getItem(KEYS.CURRENT_USER);
    if (!userId) return null;
    
    const members = getFromStorage<Member>(KEYS.MEMBERS);
    return members.find(m => m.id === userId) || null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(KEYS.CURRENT_USER);
  }
};

// ==================== MEMBERS ====================

export const memberApi = {
  create: (data: { email: string; name: string; password: string }): Member => {
    const members = getFromStorage<Member>(KEYS.MEMBERS);
    
    // Check if email already exists
    if (members.some(m => m.email === data.email)) {
      throw new Error('Email already registered');
    }

    const newMember: Member = {
      id: generateId(),
      email: data.email,
      name: data.name,
      createdAt: new Date().toISOString(),
      isVolunteer: false,
      ownedOrganizationIds: [],
      ownedBusinessIds: []
    };

    members.push(newMember);
    saveToStorage(KEYS.MEMBERS, members);
    
    // Auto-login after signup
    authApi.login(data.email, data.password);
    
    return newMember;
  },

  getById: (id: string): Member | null => {
    const members = getFromStorage<Member>(KEYS.MEMBERS);
    return members.find(m => m.id === id) || null;
  },

  update: (id: string, updates: Partial<Member>): Member => {
    const members = getFromStorage<Member>(KEYS.MEMBERS);
    const index = members.findIndex(m => m.id === id);
    
    if (index === -1) {
      throw new Error('Member not found');
    }

    members[index] = { ...members[index], ...updates };
    saveToStorage(KEYS.MEMBERS, members);
    return members[index];
  },

  getAll: (): Member[] => {
    return getFromStorage<Member>(KEYS.MEMBERS);
  }
};

// ==================== VOLUNTEERS ====================

export const volunteerApi = {
  create: (memberId: string, data: {
    skills: string[];
    availability: string;
    preferredJobs: string[];
    bio?: string;
  }): VolunteerProfile => {
    const volunteers = getFromStorage<VolunteerProfile>(KEYS.VOLUNTEERS);

    const newProfile: VolunteerProfile = {
      id: generateId(),
      memberId,
      skills: data.skills,
      availability: data.availability,
      preferredJobs: data.preferredJobs,
      bio: data.bio,
      hoursContributed: 0,
      projectsParticipated: 0,
      createdAt: new Date().toISOString()
    };

    volunteers.push(newProfile);
    saveToStorage(KEYS.VOLUNTEERS, volunteers);

    // Update member to mark as volunteer
    memberApi.update(memberId, {
      isVolunteer: true,
      volunteerProfileId: newProfile.id
    });

    return newProfile;
  },

  getByMemberId: (memberId: string): VolunteerProfile | null => {
    const volunteers = getFromStorage<VolunteerProfile>(KEYS.VOLUNTEERS);
    return volunteers.find(v => v.memberId === memberId) || null;
  },

  getById: (id: string): VolunteerProfile | null => {
    const volunteers = getFromStorage<VolunteerProfile>(KEYS.VOLUNTEERS);
    return volunteers.find(v => v.id === id) || null;
  },

  update: (id: string, updates: Partial<VolunteerProfile>): VolunteerProfile => {
    const volunteers = getFromStorage<VolunteerProfile>(KEYS.VOLUNTEERS);
    const index = volunteers.findIndex(v => v.id === id);
    
    if (index === -1) {
      throw new Error('Volunteer profile not found');
    }

    volunteers[index] = { ...volunteers[index], ...updates };
    saveToStorage(KEYS.VOLUNTEERS, volunteers);
    return volunteers[index];
  },

  getAll: (): VolunteerProfile[] => {
    return getFromStorage<VolunteerProfile>(KEYS.VOLUNTEERS);
  }
};

// ==================== ORGANIZATIONS ====================

export const organizationApi = {
  create: (ownerId: string, data: Omit<Organization, 'id' | 'ownerId' | 'createdAt' | 'verified'>): Organization => {
    const organizations = getFromStorage<Organization>(KEYS.ORGANIZATIONS);

    const newOrg: Organization = {
      ...data,
      id: generateId(),
      ownerId,
      createdAt: new Date().toISOString(),
      verified: false
    };

    organizations.push(newOrg);
    saveToStorage(KEYS.ORGANIZATIONS, organizations);

    // Add to member's owned organizations
    const member = memberApi.getById(ownerId);
    if (member) {
      memberApi.update(ownerId, {
        ownedOrganizationIds: [...member.ownedOrganizationIds, newOrg.id]
      });
    }

    return newOrg;
  },

  getById: (id: string): Organization | null => {
    const organizations = getFromStorage<Organization>(KEYS.ORGANIZATIONS);
    return organizations.find(o => o.id === id) || null;
  },

  getByOwnerId: (ownerId: string): Organization[] => {
    const organizations = getFromStorage<Organization>(KEYS.ORGANIZATIONS);
    return organizations.filter(o => o.ownerId === ownerId);
  },

  update: (id: string, updates: Partial<Organization>): Organization => {
    const organizations = getFromStorage<Organization>(KEYS.ORGANIZATIONS);
    const index = organizations.findIndex(o => o.id === id);
    
    if (index === -1) {
      throw new Error('Organization not found');
    }

    organizations[index] = { ...organizations[index], ...updates };
    saveToStorage(KEYS.ORGANIZATIONS, organizations);
    return organizations[index];
  },

  getAll: (): Organization[] => {
    return getFromStorage<Organization>(KEYS.ORGANIZATIONS);
  },

  delete: (id: string): void => {
    const organizations = getFromStorage<Organization>(KEYS.ORGANIZATIONS);
    const filtered = organizations.filter(o => o.id !== id);
    saveToStorage(KEYS.ORGANIZATIONS, filtered);
  }
};

// ==================== LOCAL BUSINESSES ====================

export const businessApi = {
  create: (ownerId: string, data: Omit<LocalBusiness, 'id' | 'ownerId' | 'createdAt' | 'verified'>): LocalBusiness => {
    const businesses = getFromStorage<LocalBusiness>(KEYS.BUSINESSES);

    const newBusiness: LocalBusiness = {
      ...data,
      id: generateId(),
      ownerId,
      createdAt: new Date().toISOString(),
      verified: false
    };

    businesses.push(newBusiness);
    saveToStorage(KEYS.BUSINESSES, businesses);

    // Add to member's owned businesses
    const member = memberApi.getById(ownerId);
    if (member) {
      memberApi.update(ownerId, {
        ownedBusinessIds: [...member.ownedBusinessIds, newBusiness.id]
      });
    }

    return newBusiness;
  },

  getById: (id: string): LocalBusiness | null => {
    const businesses = getFromStorage<LocalBusiness>(KEYS.BUSINESSES);
    return businesses.find(b => b.id === id) || null;
  },

  getByOwnerId: (ownerId: string): LocalBusiness[] => {
    const businesses = getFromStorage<LocalBusiness>(KEYS.BUSINESSES);
    return businesses.filter(b => b.ownerId === ownerId);
  },

  update: (id: string, updates: Partial<LocalBusiness>): LocalBusiness => {
    const businesses = getFromStorage<LocalBusiness>(KEYS.BUSINESSES);
    const index = businesses.findIndex(b => b.id === id);
    
    if (index === -1) {
      throw new Error('Business not found');
    }

    businesses[index] = { ...businesses[index], ...updates };
    saveToStorage(KEYS.BUSINESSES, businesses);
    return businesses[index];
  },

  getAll: (): LocalBusiness[] => {
    return getFromStorage<LocalBusiness>(KEYS.BUSINESSES);
  },

  delete: (id: string): void => {
    const businesses = getFromStorage<LocalBusiness>(KEYS.BUSINESSES);
    const filtered = businesses.filter(b => b.id !== id);
    saveToStorage(KEYS.BUSINESSES, filtered);
  }
};

// ==================== CUSTOM CATEGORIES ====================

export const categoryApi = {
  create: (memberId: string, categoryName: string): CustomCategory | { error: string } => {
    const categories = getFromStorage<CustomCategory>(KEYS.CATEGORIES);
    
    // Normalize category name
    const normalizedName = categoryName.toLowerCase().trim().replace(/\s+/g, '-');
    
    // Check if it's a default category
    if (DEFAULT_POST_CATEGORIES.includes(normalizedName as any)) {
      return { error: 'This category already exists as a built-in category' };
    }

    // Check if custom category already exists
    const existing = categories.find(c => c.name === normalizedName);
    if (existing) {
      return { error: `Similar category "${existing.displayName}" already exists. Please use that one.` };
    }

    // Check for similar categories (simple similarity check)
    const similar = categories.find(c => {
      const similarity = calculateSimilarity(c.name, normalizedName);
      return similarity > 0.7; // 70% similar
    });

    if (similar) {
      return { error: `Similar category "${similar.displayName}" already exists. Did you mean that one?` };
    }

    // Create new category
    const newCategory: CustomCategory = {
      id: generateId(),
      name: normalizedName,
      displayName: categoryName.trim(),
      createdBy: memberId,
      createdAt: new Date().toISOString(),
      usageCount: 0,
      verified: false // Admin can verify later
    };

    categories.push(newCategory);
    saveToStorage(KEYS.CATEGORIES, categories);
    return newCategory;
  },

  getAll: (): CustomCategory[] => {
    return getFromStorage<CustomCategory>(KEYS.CATEGORIES);
  },

  getAllCategoryNames: (): string[] => {
    const customCategories = getFromStorage<CustomCategory>(KEYS.CATEGORIES);
    const customNames = customCategories.map(c => c.name);
    return [...DEFAULT_POST_CATEGORIES, ...customNames];
  },

  incrementUsage: (categoryName: string): void => {
    const categories = getFromStorage<CustomCategory>(KEYS.CATEGORIES);
    const index = categories.findIndex(c => c.name === categoryName);
    
    if (index !== -1) {
      categories[index].usageCount++;
      saveToStorage(KEYS.CATEGORIES, categories);
    }
  },

  verify: (id: string): void => {
    const categories = getFromStorage<CustomCategory>(KEYS.CATEGORIES);
    const index = categories.findIndex(c => c.id === id);
    
    if (index !== -1) {
      categories[index].verified = true;
      saveToStorage(KEYS.CATEGORIES, categories);
    }
  }
};

// Simple string similarity (Levenshtein distance)
function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

// ==================== POSTS ====================

export const postApi = {
  create: (authorId: string, data: {
    title: string;
    description: string;
    category: string;
    location: string;
    images?: string[];
    organizationId?: string;
    businessId?: string;
  }): Post => {
    const posts = getFromStorage<Post>(KEYS.POSTS);

    const newPost: Post = {
      id: generateId(),
      authorId,
      title: data.title,
      description: data.description,
      category: data.category,
      status: 'open',
      location: data.location,
      images: data.images,
      supporters: 0,
      organizationId: data.organizationId,
      businessId: data.businessId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    posts.push(newPost);
    saveToStorage(KEYS.POSTS, posts);

    // Increment category usage if custom
    if (!DEFAULT_POST_CATEGORIES.includes(data.category as any)) {
      categoryApi.incrementUsage(data.category);
    }

    return newPost;
  },

  getById: (id: string): Post | null => {
    const posts = getFromStorage<Post>(KEYS.POSTS);
    return posts.find(p => p.id === id) || null;
  },

  getWithAuthor: (id: string): PostWithAuthor | null => {
    const post = postApi.getById(id);
    if (!post) return null;

    const author = memberApi.getById(post.authorId);
    if (!author) return null;

    const result: PostWithAuthor = { ...post, author };

    if (post.organizationId) {
      const org = organizationApi.getById(post.organizationId);
      if (org) result.organization = org;
    }

    if (post.businessId) {
      const business = businessApi.getById(post.businessId);
      if (business) result.business = business;
    }

    return result;
  },

  getAll: (): Post[] => {
    const posts = getFromStorage<Post>(KEYS.POSTS);
    return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getAllWithAuthors: (): PostWithAuthor[] => {
    const posts = postApi.getAll();
    return posts.map(post => {
      const author = memberApi.getById(post.authorId);
      if (!author) return null;

      const result: PostWithAuthor = { ...post, author };

      if (post.organizationId) {
        const org = organizationApi.getById(post.organizationId);
        if (org) result.organization = org;
      }

      if (post.businessId) {
        const business = businessApi.getById(post.businessId);
        if (business) result.business = business;
      }

      return result;
    }).filter((p): p is PostWithAuthor => p !== null);
  },

  getByCategory: (category: string): Post[] => {
    const posts = getFromStorage<Post>(KEYS.POSTS);
    return posts.filter(p => p.category === category)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getByStatus: (status: PostStatus): Post[] => {
    const posts = getFromStorage<Post>(KEYS.POSTS);
    return posts.filter(p => p.status === status)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  update: (id: string, updates: Partial<Post>): Post => {
    const posts = getFromStorage<Post>(KEYS.POSTS);
    const index = posts.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new Error('Post not found');
    }

    posts[index] = {
      ...posts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveToStorage(KEYS.POSTS, posts);
    return posts[index];
  },

  addSupporter: (id: string): Post => {
    const post = postApi.getById(id);
    if (!post) throw new Error('Post not found');
    
    return postApi.update(id, { supporters: post.supporters + 1 });
  },

  delete: (id: string): void => {
    const posts = getFromStorage<Post>(KEYS.POSTS);
    const filtered = posts.filter(p => p.id !== id);
    saveToStorage(KEYS.POSTS, filtered);

    // Delete associated responses
    const responses = getFromStorage<PostResponse>(KEYS.RESPONSES);
    const filteredResponses = responses.filter(r => r.postId !== id);
    saveToStorage(KEYS.RESPONSES, filteredResponses);
  }
};

// ==================== POST RESPONSES ====================

export const responseApi = {
  create: (postId: string, authorId: string, data: {
    content: string;
    images?: string[];
    parentResponseId?: string;
  }): PostResponse => {
    const responses = getFromStorage<PostResponse>(KEYS.RESPONSES);

    const newResponse: PostResponse = {
      id: generateId(),
      postId,
      authorId,
      content: data.content,
      images: data.images,
      parentResponseId: data.parentResponseId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    responses.push(newResponse);
    saveToStorage(KEYS.RESPONSES, responses);

    return newResponse;
  },

  getById: (id: string): PostResponse | null => {
    const responses = getFromStorage<PostResponse>(KEYS.RESPONSES);
    return responses.find(r => r.id === id) || null;
  },

  getByPostId: (postId: string): PostResponse[] => {
    const responses = getFromStorage<PostResponse>(KEYS.RESPONSES);
    return responses.filter(r => r.postId === postId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  },

  getByPostIdWithAuthors: (postId: string): ResponseWithAuthor[] => {
    const responses = responseApi.getByPostId(postId);
    return responses.map(response => {
      const author = memberApi.getById(response.authorId);
      if (!author) return null;
      return { ...response, author };
    }).filter((r): r is ResponseWithAuthor => r !== null);
  },

  update: (id: string, updates: Partial<PostResponse>): PostResponse => {
    const responses = getFromStorage<PostResponse>(KEYS.RESPONSES);
    const index = responses.findIndex(r => r.id === id);
    
    if (index === -1) {
      throw new Error('Response not found');
    }

    responses[index] = {
      ...responses[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveToStorage(KEYS.RESPONSES, responses);
    return responses[index];
  },

  delete: (id: string): void => {
    const responses = getFromStorage<PostResponse>(KEYS.RESPONSES);
    const filtered = responses.filter(r => r.id !== id);
    saveToStorage(KEYS.RESPONSES, filtered);
  }
};

// ==================== UTILITY FUNCTIONS ====================

export const storageApi = {
  clearAll: (): void => {
    Object.values(KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  },

  exportData: (): string => {
    const data: Record<string, any> = {};
    Object.entries(KEYS).forEach(([key, storageKey]) => {
      data[key] = getFromStorage(storageKey);
    });
    return JSON.stringify(data, null, 2);
  },

  importData: (jsonString: string): void => {
    try {
      const data = JSON.parse(jsonString);
      Object.entries(KEYS).forEach(([key, storageKey]) => {
        if (data[key]) {
          saveToStorage(storageKey, data[key]);
        }
      });
    } catch (error) {
      throw new Error('Invalid JSON data');
    }
  }
};
