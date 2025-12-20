# ForkTheCity Apps

A modern web platform for civic engagement, community building, and collaborative problem-solving. Built with Vite, React, and TypeScript.

## What is ForkTheCity?

ForkTheCity is a civic technology platform that empowers communities to identify, discuss, and solve local issues collaboratively. By connecting residents, organizations, and local businesses, we create transparent, accountable pathways for civic engagement and community improvement.

### Problem We're Solving

Many communities face challenges with:
- **Fragmented Communication**: Important civic discussions happen across disconnected platforms
- **Limited Transparency**: Lack of visibility into how civic issues are being addressed
- **Barriers to Entry**: High technical/financial barriers prevent communities from organizing online
- **Volunteer Coordination**: Difficulty connecting willing volunteers with meaningful opportunities
- **Funding Opacity**: Unclear how community funds are allocated and what impact they create

### Our Solution

ForkTheCity provides:
1. **Hub Page**: A central landing page showcasing the ForkTheCity network, mission, and directory of active community microsites
2. **Microsite Template**: A ready-to-deploy, feature-rich platform for communities to launch their own civic engagement site with:
   - Issue tracking and discussion
   - Project management and collaboration
   - Volunteer coordination
   - Transparent funding displays
   - Multi-stage registration system
   - Post creation with custom categories
   - Response/reply threading

## Applications Included

### 1. Hub Page (`/hub`)
The main landing page for the ForkTheCity network. Features sections explaining the problem, solution, ethics, timeline, volunteer gallery, and a directory of active community microsites.

📄 **[Read detailed Hub Page documentation →](./HUB_PAGE.md)**

### 2. Microsite Template (`/microsite`)
A fully-featured template that communities can customize for their own civic engagement needs. Includes collaborative features, multi-stage registration, post management, and more.

📄 **[Read detailed Microsite Template documentation →](./MICROSITE_TEMPLATE.md)**

## Tech Stack

> **Note**: The current tech stack is provisional and may evolve based on community needs and contributions. We're open to discussing alternatives that better serve our mission.

| Technology | Purpose |
|------------|---------|
| **Vite 5.4** | Lightning-fast build tool and dev server with HMR |
| **React 19** | Modern UI framework with latest concurrent features |
| **TypeScript 5.9** | Type safety and enhanced developer experience |
| **React Router 6** | Client-side routing with nested routes |
| **localStorage API** | Development-ready data persistence layer |

## Project Structure

```
FTCapps/
├── index.html                          # Main HTML entry point
├── package.json                        # Dependencies and scripts
├── tsconfig.json                       # TypeScript configuration
├── vite.config.ts                      # Vite build configuration
│
├── src/
│   ├── main.tsx                        # Application entry point
│   ├── App.tsx                         # Root component with routing
│   │
│   ├── apps/                           # Main application pages
│   │   ├── hub-page/
│   │   │   ├── HubPage.tsx            # Hub page container
│   │   │   └── index.html             # Hub page specific HTML
│   │   ├── microsite-template/
│   │   │   ├── MicrositePage.tsx      # Microsite container
│   │   │   └── index.html             # Microsite specific HTML
│   │   ├── registration/
│   │   │   ├── MemberSignupPage.tsx   # Step 1: Member signup
│   │   │   ├── LoginPage.tsx          # Authentication
│   │   │   ├── VolunteerProfilePage.tsx  # Step 2: Volunteer profile
│   │   │   └── EntityRegistrationPage.tsx # Step 3: Org/business
│   │   └── posts/
│   │       ├── CreatePostPage.tsx     # Post creation with categories
│   │       └── PostDetailPage.tsx     # Post view with responses
│   │
│   ├── components/                     # Reusable React components
│   │   ├── hub-page/                  # Hub-specific components
│   │   │   ├── HubHeader.tsx
│   │   │   ├── ProblemSection.tsx
│   │   │   ├── SolutionSection.tsx
│   │   │   ├── EthicsSection.tsx
│   │   │   ├── Timeline.tsx
│   │   │   ├── VolunteerGallery.tsx
│   │   │   ├── DirectorySection.tsx
│   │   │   └── HubFooter.tsx
│   │   ├── microsite-template/        # Microsite-specific components
│   │   │   ├── MicrositeNav.tsx
│   │   │   ├── MicrositeHero.tsx
│   │   │   ├── IssuesSection.tsx      # Dynamic posts display
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── VolunteersSection.tsx
│   │   │   ├── FundingSection.tsx
│   │   │   └── MicrositeFooter.tsx
│   │   └── shared/                    # Shared components
│   │       ├── Card.tsx
│   │       └── SectionHeader.tsx
│   │
│   ├── data/                          # Static content data
│   │   ├── hubPageContent.ts          # Hub page content
│   │   └── micrositeContent.ts        # Microsite template content
│   │
│   ├── lib/                           # Utilities and libraries
│   │   ├── api/
│   │   │   ├── localStorage.ts        # Complete CRUD API layer
│   │   │   └── imageHandler.ts        # Base64 image processing
│   │   ├── hooks/
│   │   │   └── useScrollAnimation.ts  # Scroll-triggered animations
│   │   └── utils/
│   │       └── smoothScroll.ts        # Smooth scrolling behavior
│   │
│   ├── types/
│   │   └── index.ts                   # TypeScript type definitions
│   │
│   └── styles/                        # CSS stylesheets
│       ├── global.css                 # Global styles and shared components
│       ├── hub-page.css              # Hub page specific styles
│       ├── microsite.css             # Microsite template styles
│       ├── timeline.css              # Timeline component styles
│       ├── animations.css            # Animation utilities
│       └── images.css                # Image styling utilities
│
└── docs/                              # Documentation
    ├── HUB_PAGE.md                   # Hub page documentation
    ├── MICROSITE_TEMPLATE.md         # Microsite documentation
    ├── CONTRIBUTING.md               # Contribution guidelines
    └── LICENSE.md                    # License information
```

## Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ForkTheCity/ForkTheCityNetwork.git
cd FTCapps
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Available Routes

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/hub` |
| `/hub` | ForkTheCity hub/landing page |
| `/microsite` | Demo microsite template |
| `/login` | Member login |
| `/registration/signup` | Member registration (Step 1) |
| `/registration/volunteer` | Volunteer profile setup (Step 2) |
| `/registration/entity` | Organization/business registration (Step 3) |
| `/posts/create` | Create new post with categories |
| `/posts/:postId` | View post details and responses |

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory. Preview the production build:

```bash
npm run preview
```

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

| Alias | Maps To |
|-------|---------|
| `@/*` | `src/*` |
| `@/components/*` | `src/components/*` |
| `@/styles/*` | `src/styles/*` |
| `@/lib/*` | `src/lib/*` |
| `@/data/*` | `src/data/*` |
| `@/types/*` | `src/types/*` |

Example usage:
```typescript
import { MicrositeNav } from '@/components/microsite-template/MicrositeNav';
import { postApi } from '@/lib/api/localStorage';
import type { Post, Member } from '@/types';
import '@/styles/global.css';
```

## Key Features

### Multi-Stage Registration
- **Step 1**: Member signup with email and password
- **Step 2**: Optional volunteer profile with skills and availability
- **Step 3**: Optional organization or local business registration
- One-to-many relationships: Members can own multiple organizations/businesses

### Collaborative Post System
- Create posts with custom categories (validated for similarity)
- Levenshtein distance algorithm prevents duplicate categories (70% threshold)
- Base64 image uploads with 500KB limit
- Category filtering and time-based sorting
- Response/reply threading on posts

### Data Persistence
- localStorage-based API for development and testing
- Complete CRUD operations for all entity types
- Session management for authentication
- Automatic cleanup of orphaned data

## Contributing

We welcome contributions from developers, designers, and civic enthusiasts! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

📄 **[Read our Contributing Guide →](./CONTRIBUTING.md)**

## License

This project is open source. See [LICENSE.md](./LICENSE.md) for details.

## Documentation

- **[Hub Page Documentation](./HUB_PAGE.md)** - Detailed hub page features and structure
- **[Microsite Template Documentation](./MICROSITE_TEMPLATE.md)** - Complete microsite guide and testing instructions
- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute to the project

## Community

- **Website**: [forkthecity.org](https://forkthecity.org)
- **GitHub**: [github.com/ForkTheCity](https://github.com/ForkTheCity)

## Support

For questions, issues, or feature requests:
1. Check existing [GitHub Issues](https://github.com/ForkTheCity/ForkTheCityNetwork/issues)
2. Create a new issue with detailed information
3. Tag issues appropriately (`bug`, `feature`, `documentation`, etc.)

---

Built with ❤️ by the ForkTheCity community

## Migration from Static HTML

This project was migrated from static HTML files. The following changes were made:

1. **Components**: Each major section of the HTML pages was extracted into reusable React components
2. **Styles**: CSS was moved from inline `<style>` tags to separate CSS files in `src/styles/`
3. **Routing**: React Router was added to handle navigation between pages
4. **TypeScript**: Type safety was added throughout the codebase

## Contributing

Please read the main project documentation for contribution guidelines.

## License

MIT License
