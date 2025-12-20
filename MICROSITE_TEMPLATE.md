# Microsite Template Documentation

The ForkTheCity Microsite Template is a complete, ready-to-deploy platform that communities can use to organize, collaborate, and solve local issues. It includes multi-stage registration, collaborative post management, volunteer coordination, and more.

## Table of Contents

- [Purpose](#purpose)
- [Routes](#routes)
- [Features](#features)
- [Architecture](#architecture)
- [Data Management](#data-management)
- [Styling & Theming](#styling--theming)
- [Testing Guide](#testing-guide)
- [Debugging](#debugging)
- [Production Deployment](#production-deployment)
- [Try It Out](#try-it-out)
- [Support](#support)

---

## Purpose

The Microsite Template empowers communities to:

1. **Track Issues**: Identify and discuss local problems transparently
2. **Manage Projects**: Coordinate collaborative initiatives
3. **Organize Volunteers**: Match skills with opportunities
4. **Display Funding**: Show transparent allocation of community resources
5. **Enable Collaboration**: Create posts, respond, and build consensus
6. **Build Community**: Foster connections between residents, organizations, and businesses

## Routes

| Route | Purpose | Authentication |
|-------|---------|----------------|
| `/microsite` | Main microsite page | Optional |
| `/login` | Member login | Public |
| `/registration/signup` | Member registration (Step 1) | Public |
| `/registration/volunteer` | Volunteer profile setup (Step 2) | Required |
| `/registration/entity` | Organization/business registration (Step 3) | Required |
| `/posts/create` | Create new post with categories | Required |
| `/posts/:postId` | View post details and responses | Optional |

---

## Features

### 1. Authentication System

- `LoginPage.tsx` - Member authentication
- `MemberSignupPage.tsx` - New member registration
- localStorage-based session persistence
- Auto-login on page reload if session exists
- User menu displays avatar (initials) with dropdown (Profile, My Posts, Settings, Log Out)

**Production:** Use bcrypt for passwords, JWT for sessions, HTTPS required

---

### 2. Multi-Stage Registration

A progressive registration system allowing users to provide information at their own pace.

#### Step 1: Member Signup (`MemberSignupPage.tsx`)

**Required:** First Name, Last Name, Email (unique), Password (8+ chars)

**Features:** Real-time email check, password strength indicator, form validation

**After:** Account created, auto-login, redirect to volunteer profile (optional)

---

#### Step 2: Volunteer Profile (`VolunteerProfilePage.tsx`) - Optional

**Fields:** Skills, Availability, Bio (500 chars max), Phone, Emergency Contact

**After:** Profile linked to member, can participate in volunteer opportunities

---

#### Step 3: Entity Registration (`EntityRegistrationPage.tsx`) - Optional

**Types:** Organization (non-profits, advocacy groups) or Local Business (restaurants, retail, services)

**Fields:** Name, Type, Description, Website, Address, plus type-specific fields (Mission Statement or Hours/Price Range)

**Features:** Logo upload (500KB max), one-to-many relationship (users can own multiple entities)

**After:** Entity linked to member, can create posts on behalf of entity, listed in directory

---

### 3. Collaborative Post System

The core feature enabling community discussion and problem-solving.

#### Post Creation (`CreatePostPage.tsx`)

**Fields:** Title (200 chars max), Description, Category (custom), Image (optional, 500KB max)

**Category System:** Custom categories on-the-fly, Levenshtein distance (70% threshold) prevents duplicates (e.g., "Transportation" vs "Transport"), suggests similar existing categories

**After:** Post created, redirected to detail page, appears in Issues section

---

#### Post Detail Page (`PostDetailPage.tsx`)

**Display:** Title, description, image, author (name, avatar), category badge, timestamp, response count

**Responses:** Threaded comments with author attribution and timestamps (login required)

**Actions:** Create response (now), Edit/Delete/Report/Share (future)

---

### 4. Posts Section (`IssuesSection.tsx`)

**Display:** Grid layout with category filtering, time-based sorting (newest first), empty/loading states

**Post Cards:** Title excerpt, author, timestamp, category badge, status indicator (Open/In Progress/Resolved)

**Future:** Search, multiple filters, sort by popularity, pagination

---

### 5. Other Components

- **Navigation** (`MicrositeNav.tsx`): Logged out (Sign Up/Log In), Logged in (avatar with dropdown), responsive hamburger menu
- **Hero** (`MicrositeHero.tsx`): Community stats, action buttons (Report Issue, Get Involved, Browse Projects)
- **Projects** (`ProjectsSection.tsx`): Grid of project cards with status, timeline, volunteers needed
- **Volunteers** (`VolunteersSection.tsx`): Grid of volunteer cards with stats, "Join as Volunteer" CTA, opt-in privacy
- **Funding** (`FundingSection.tsx`): Total funding, sources breakdown, allocation by project, transparent transactions
- **Footer** (`MicrositeFooter.tsx`): About, Quick Links, Resources, Connect sections

---

## Architecture

### Registration Flow

```
Member Account (required)
    ↓
Volunteer Profile (optional)
    ↓
Organization/Business Registration (optional, one-to-many)
    ↓
Access Microsite
    ↓
Create Posts with Categories
    ↓
Upload Images (base64)
    ↓
Community Responds
```

### File Structure

```
src/
  types/index.ts                  - All TypeScript types
  lib/api/
    localStorage.ts               - All CRUD operations
    imageHandler.ts               - Image processing utilities
  apps/
    registration/
      MemberSignupPage.tsx        - Step 1: Create account
      VolunteerProfilePage.tsx    - Step 2: Volunteer setup
      EntityRegistrationPage.tsx  - Step 3: Org/Business
      LoginPage.tsx               - Sign in
    posts/
      CreatePostPage.tsx          - Create post form
      PostDetailPage.tsx          - View post & responses
  components/
    microsite-template/
      MicrositeNav.tsx            - Nav with user menu
      IssuesSection.tsx           - Dynamic posts display
      [other components]
```

---

## Data Management

All data stored in **browser localStorage** for testing (replace with database for production).

### View Data

DevTools → Application → Local Storage → Keys starting with `ftc_`

### Clear Data

```javascript
// Browser console:
localStorage.clear()

// Or via API:
import { storageApi } from '@/lib/api/localStorage';
storageApi.clearAll();
```

### Export Data

```javascript
import { storageApi } from '@/lib/api/localStorage';
const data = storageApi.exportData();
console.log(data); // Copy JSON for migration
```

### Important Limits

- **localStorage**: ~5-10MB browser limit
- **Images**: 500KB max (warnings at 300KB)
- **Categories**: Validated for 70%+ similarity
- **Entities**: One member can own multiple orgs/businesses
- **Session**: Persists until logout

---

## Data Architecture

### Type System (`src/types/index.ts`)

```typescript
interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Post {
  id: string;
  title: string;
  description: string;
  category: string;
  authorId: string;
  authorName: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Organization {
  id: string;
  name: string;
  type: string;
  description: string;
  ownerId: string; // Member who registered it
  logoUrl?: string;
  website?: string;
  createdAt: Date;
}

// See src/types/index.ts for complete definitions
```

---

### localStorage API (`src/lib/api/localStorage.ts`)

Complete CRUD operations for all entity types.

**API Modules:**
- `authApi` - Authentication and session management
- `memberApi` - Member CRUD operations
- `volunteerApi` - Volunteer profile management
- `organizationApi` - Organization management
- `businessApi` - Local business management
- `postApi` - Post CRUD operations
- `responseApi` - Post response/reply management
- `categoryApi` - Category management with similarity detection

**Example Usage:**
```typescript
import { postApi, authApi } from '@/lib/api/localStorage';

// Get current user
const currentUser = authApi.getCurrentSession();

// Create post
const newPost = await postApi.createPost({
  title: "Fix the broken streetlight on Main St",
  description: "The streetlight has been out for weeks...",
  category: "Infrastructure",
  authorId: currentUser.memberId,
  imageUrl: base64Image
});

// Get all posts
const allPosts = postApi.getAllPosts();

// Get posts by category
const infraPosts = postApi.getPostsByCategory("Infrastructure");
```

**Storage Keys:**
```
ftc_members
ftc_volunteers
ftc_organizations
ftc_businesses
ftc_posts
ftc_responses
ftc_categories
ftc_session
```

---

### Image Handler (`src/lib/api/imageHandler.ts`)

Base64 image processing with validation.

**Features:**
- File to base64 conversion
- Size validation (500KB max)
- Warning at 300KB threshold
- MIME type validation
- Auto-resize (future)

**Usage:**
```typescript
import { fileToBase64 } from '@/lib/api/imageHandler';

const handleImageUpload = async (file: File) => {
  try {
    const base64 = await fileToBase64(file);
    setImagePreview(base64);
  } catch (error) {
    alert(error.message); // "File size too large"
  }
};
```

---

## Styling & Theming

### CSS Architecture

| File | Purpose |
|------|---------|
| `global.css` | Shared styles, typography, buttons, forms |
| `microsite.css` | Microsite-specific layouts and components |
| `animations.css` | Scroll animations and transitions |
| `images.css` | Image styling utilities |

### Color Palette

```css
:root {
  --primary-color: #7DC95E;    /* Green - growth, action */
  --secondary-color: #455439;  /* Dark green - stability */
  --accent-color: #DE6449;     /* Coral - energy, urgency */
  --text-dark: #51291E;        /* Warm dark brown */
  --text-light: #4a5568;       /* Medium gray */
  --bg-light: #f7fafc;         /* Very light gray */
  --bg-dark: #1a202c;          /* Very dark gray */
}
```

### Accessibility

- **WCAG AA Compliance**: All text/background combinations meet 4.5:1 contrast ratio
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Focus Indicators**: Clear visual focus states
- **Responsive Text**: Scales with user preferences

### Responsive Breakpoints

```css
/* Mobile first */
@media (min-width: 768px) {
  /* Tablet */
}

@media (min-width: 1024px) {
  /* Desktop */
}

@media (min-width: 1280px) {
  /* Large desktop */
}
```

---

## Testing Guide

For complete setup, see **[Quick Start in main README](./README.md#quick-start)**.

### Quick Test Scenarios

**1. Registration Flow**
- Visit `/registration/signup`
- Create account → Complete volunteer profile (optional) → Register entity (optional)
- Verify user menu shows avatar with initials

**2. Create Post**
- Visit `/posts/create`
- Fill title, description, select/create category, upload image
- Verify post appears in Issues section

**3. Category Similarity**
- Create post with category "Transportation"
- Try creating post with "Transport" (85% similar)
- System warns and suggests existing category

**4. Post Responses**
- Click post to view detail
- Add response (login required)
- Verify response shows author and timestamp

**5. Session Persistence**
- Log in → Refresh (still logged in)
- Log out → Refresh (still logged out)

**6. Image Limits**
- Upload <500KB (succeeds)
- Upload >500KB (rejected)
- Upload 300-400KB (warning but allowed)

**7. Responsive Design**
- Test Desktop (1280px+), Tablet (768-1024px), Mobile (<768px)
- Verify hamburger menu, touch targets, stacked layouts

**8. Data Persistence**
- Create members, posts, responses
- Check localStorage (DevTools → Application)
- Refresh and verify data persists

**9. Error Handling**
- Test invalid email, password mismatch, duplicate email, empty fields

**10. One-to-Many Relationships**
- Register multiple entities as single user
- Verify all have same `ownerId` in localStorage
- Create posts on behalf of different entities

---

## Debugging

## Debugging

### localStorage Inspection

```javascript
// View all members
JSON.parse(localStorage.getItem('ftc_members'))

// View all posts
JSON.parse(localStorage.getItem('ftc_posts'))

// View current session
JSON.parse(localStorage.getItem('ftc_session'))

// Clear specific key
localStorage.removeItem('ftc_posts')

// Clear everything
localStorage.clear()
```

### Common Issues

| Issue | Solution |
|-------|----------|
| "Loading..." forever on microsite | Need to be logged in - visit `/registration/signup` |
| Can't create custom category | Check if similar category exists (>70% similarity) |
| Images not uploading | Max 500KB, check localStorage isn't full |
| Lost data after refresh | localStorage persists unless manually cleared |
| Category filter not working | Verify case-sensitive exact match |

---

## Production Deployment

### Migration Checklist

- [ ] Replace localStorage with database (PostgreSQL, MongoDB, Supabase)
- [ ] Implement proper authentication (JWT, OAuth, bcrypt)
- [ ] Add server-side validation and rate limiting
- [ ] Use cloud storage for images (S3, Cloudinary)
- [ ] Set up monitoring and error tracking
- [ ] Add email verification and password reset
- [ ] Create admin panel for moderation
- [ ] Set up CI/CD pipeline and automated tests
- [ ] Enable HTTPS and CSP headers
- [ ] Implement backup strategy

### Migration Path

1. **Database**: Update `src/lib/api/localStorage.ts` to make HTTP requests to backend API
2. **Auth**: Implement JWT tokens or OAuth providers
3. **Images**: S3, Cloudinary, or similar (no more base64)
4. **Admin**: Category moderation, user management panel
5. **Real-time**: WebSockets or polling for live updates

The API interface is designed to make this transition straightforward!

---

## Try It Out

### What You Can Do

✅ Create accounts with multi-stage registration  
✅ Register as volunteers with skills and availability  
✅ Register organizations and local businesses  
✅ Create posts with custom categories  
✅ Upload images (500KB max)  
✅ Respond to community posts  
✅ Filter posts by category

### Quick Start (2 Minutes)

For complete installation, see **[Quick Start in main README](./README.md#quick-start)**.

```bash
npm install
npm run dev
```

1. **Visit**: `http://localhost:5173/microsite` (redirects to signup)
2. **Sign up**: `/registration/signup` - Fill name, email, password
3. **Volunteer** (optional): Add skills, availability
4. **Register entity** (optional): Organization or Business with logo
5. **Create posts**: Custom categories, upload images, respond to others

### Key URLs

| URL | Description |
|-----|-------------|
| `/microsite` | Main microsite (auth required) |
| `/registration/signup` | Create account |
| `/login` | Sign in |
| `/posts/create` | Create post |
| `/posts/:postId` | View post detail |

### Troubleshooting

| Issue | Fix |
|-------|-----|
| Stuck on "Loading..." | Visit `/registration/signup` to log in |
| Can't create category | Similar category exists (>70% match) |
| Image won't upload | Max 500KB, localStorage may be full |
| Want fresh start | Run `localStorage.clear()` in console |

---

## Future Enhancements

- [ ] Notifications (real-time updates)
- [ ] Direct messaging between members
- [ ] Event calendar
- [ ] Voting system (upvote/downvote)
- [ ] Moderation tools (flag, report)
- [ ] Advanced search (full-text)
- [ ] Maps integration (geolocation)
- [ ] Email notifications
- [ ] Mobile app (native or PWA)
- [ ] API for integrations
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Gamification (badges, points)
- [ ] Data export tools

---

## Related Documentation

- **[Main README](./README.md)** - Project overview and installation
- **[Hub Page Docs](./HUB_PAGE.md)** - Hub page features
- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute
- **[License](./LICENSE.md)** - Open source license

---

## Support

For issues or questions about the Microsite Template:
1. Check existing [GitHub Issues](https://github.com/ForkTheCity/ForkTheCityNetwork/issues)
2. Create new issue with `microsite-template` label
3. Include:
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS information

---

*Empowering communities, one microsite at a time.* 🌱
