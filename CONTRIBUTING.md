# Contributing to ForkTheCity

Thank you for your interest in contributing to ForkTheCity! This document provides guidelines and information for different ways to contribute to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Getting Started](#getting-started)
- [Good First Issues](#good-first-issues)
- [Development Workflow](#development-workflow)
- [Becoming a Maintainer](#becoming-a-maintainer)
- [Style Guidelines](#style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive, and welcoming environment for all contributors. We expect:

- **Respectful Communication**: Be kind, considerate, and constructive in all interactions
- **Inclusive Language**: Avoid discriminatory or exclusionary language
- **Collaborative Spirit**: Welcome diverse perspectives and skill levels
- **Constructive Feedback**: Provide helpful, actionable feedback on code and ideas
- **Professional Conduct**: Keep discussions focused on the project and its goals

Violations of these principles may result in removal from the project community.

## Ways to Contribute

There are many ways to contribute to ForkTheCity, regardless of your technical background:

### 🐛 Bug Reports
Found a bug? Help us fix it!
- Search existing [issues](https://github.com/ForkTheCity/ForkTheCityNetwork/issues) first
- Provide detailed reproduction steps
- Include screenshots or error messages
- Note your browser, OS, and Node.js versions

### ✨ Feature Requests
Have an idea for improvement?
- Check if it's already been suggested
- Describe the problem it solves
- Explain your proposed solution
- Consider implementation complexity

### 📝 Documentation
Improve our docs!
- Fix typos or unclear explanations
- Add examples and use cases
- Write tutorials or guides
- Translate documentation

### 💻 Code Contributions
Write code to fix bugs or add features!
- Start with "good first issues" (see below)
- Follow our style guidelines
- Write tests for new features
- Update documentation as needed

### 🎨 Design Contributions
Improve the user experience!
- Suggest UI/UX improvements
- Create mockups or prototypes
- Improve accessibility
- Design new components

### 🧪 Testing & QA
Help ensure quality!
- Test new features and bug fixes
- Write automated tests
- Improve test coverage
- Report edge cases

### 💬 Community Support
Help other contributors!
- Answer questions in issues/discussions
- Help newcomers get started
- Share your use cases and experiences
- Provide feedback on proposals

## Getting Started

### Prerequisites & Installation

For complete setup instructions, see the **[Quick Start section in the main README](./README.md#quick-start)**.

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/ForkTheCityNetwork.git
cd ForkTheCityNetwork

# Add upstream remote
git remote add upstream https://github.com/ForkTheCity/ForkTheCityNetwork.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/bug-description
```

### 4. Make Changes

- Write your code following our [Style Guidelines](#style-guidelines)
- Test your changes thoroughly
- Update documentation if needed

### 5. Run Tests

```bash
# Run linter
npm run lint

# Build to ensure no TypeScript errors
npm run build

# Test in development mode
npm run dev
```

## Good First Issues

Looking for a place to start? Check out issues labeled [`good first issue`](https://github.com/ForkTheCity/ForkTheCityNetwork/labels/good%20first%20issue). These are carefully selected tasks that:

- Are well-defined and scoped
- Have clear acceptance criteria
- Don't require deep system knowledge
- Provide a great learning experience

### Suggested First Contributions

**For Beginners:**
- Fix typos in documentation
- Add comments to complex code sections
- Improve error messages
- Add input validation

**For Intermediate Developers:**
- Implement new UI components
- Add unit tests for existing features
- Improve accessibility (ARIA labels, keyboard navigation)
- Optimize performance (reduce bundle size, lazy loading)

**For Advanced Developers:**
- Refactor complex components
- Implement new API endpoints
- Add new collaborative features
- Improve build/deployment pipeline

**For Designers:**
- Create component variants
- Improve responsive layouts
- Design dark mode theme
- Create icon set

## Development Workflow

### Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring
- `test/description` - Test additions/improvements
- `chore/description` - Maintenance tasks

### Development Best Practices

1. **Keep Changes Focused**: One logical change per PR
2. **Write Meaningful Commits**: Clear, descriptive commit messages
3. **Test Thoroughly**: Verify your changes in multiple scenarios
4. **Update Documentation**: Keep docs in sync with code changes
5. **Follow Conventions**: Match existing code style and patterns

### Testing Your Changes

```bash
# Run development server
npm run dev

# Test different routes
# - http://localhost:5173/hub
# - http://localhost:5173/microsite
# - http://localhost:5173/registration/signup

# Build for production
npm run build

# Preview production build
npm run preview
```

## Style Guidelines

### TypeScript

```typescript
// Use named exports
export const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  // ...
};

// Use TypeScript interfaces for props
interface MyComponentProps {
  title: string;
  count?: number; // Optional props with ?
  onClick: () => void;
}

// Avoid 'any' - use proper types
const handleData = (data: Post[]): void => {
  // ...
};
```

### React

```tsx
// Use functional components with hooks
const MyComponent: React.FC<Props> = ({ title }) => {
  const [state, setState] = useState<string>('');
  
  useEffect(() => {
    // Side effects here
  }, []);
  
  return <div>{title}</div>;
};

// Use path aliases
import { postApi } from '@/lib/api/localStorage';
import type { Post } from '@/types';
```

### CSS

```css
/* Use BEM-like naming for clarity */
.component-name {
  /* Container styles */
}

.component-name__element {
  /* Element styles */
}

.component-name--modifier {
  /* Modifier styles */
}

/* Use CSS custom properties for theming */
:root {
  --primary-color: #7DC95E;
  --text-dark: #51291E;
}

/* Ensure WCAG AA contrast ratios */
.text-on-dark {
  color: #ffffff; /* 4.5:1 minimum for normal text */
}
```

### File Organization

```
src/
├── components/
│   └── microsite-template/
│       └── MyComponent.tsx      # PascalCase for components
├── lib/
│   ├── api/
│   │   └── myApi.ts            # camelCase for utilities
│   └── utils/
│       └── myHelper.ts
├── types/
│   └── index.ts                # Centralized types
└── styles/
    └── my-component.css        # kebab-case for CSS
```

## Commit Guidelines

We follow conventional commits for clear, semantic commit history:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring without functional changes
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, config, etc.)

### Examples

```bash
# Feature
git commit -m "feat(posts): add category filtering to posts section"

# Bug fix
git commit -m "fix(auth): resolve session persistence issue on page reload"

# Documentation
git commit -m "docs(readme): add installation instructions for Windows"

# Refactor
git commit -m "refactor(api): simplify localStorage API error handling"
```

## Pull Request Process

### Before Submitting

1. ✅ Pull latest changes from `upstream/main`
2. ✅ Resolve any merge conflicts
3. ✅ Run linter: `npm run lint`
4. ✅ Build successfully: `npm run build`
5. ✅ Test manually in browser
6. ✅ Update documentation if needed
7. ✅ Write clear commit messages

### PR Template

When creating a PR, include:

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (describe)

## Related Issues
Fixes #123
Related to #456

## Changes Made
- Detailed list of changes
- Another change
- And another

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested responsive layouts
- [ ] Tested with screen reader (if applicable)

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Tested thoroughly
```

### Review Process

1. **Automated Checks**: Linting and build checks must pass
2. **Code Review**: At least one maintainer will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, a maintainer will merge your PR
5. **Recognition**: Your contribution will be acknowledged!

### After Your PR is Merged

- Delete your feature branch locally and on your fork
- Update your local main branch
- Celebrate! 🎉 You've contributed to civic technology!

## Becoming a Maintainer

Maintainers have additional responsibilities and privileges:

### Maintainer Responsibilities

- **Code Review**: Review and approve pull requests
- **Issue Triage**: Label, prioritize, and respond to issues
- **Community Support**: Help contributors and answer questions
- **Release Management**: Coordinate releases and changelogs
- **Strategic Planning**: Guide project direction and roadmap
- **Quality Assurance**: Maintain code quality and standards

### Path to Maintainership

Becoming a maintainer is a natural progression for active, trusted contributors:

1. **Consistent Contributions**: Make regular, quality contributions over 3-6 months
2. **Community Involvement**: Actively participate in discussions and help others
3. **Code Quality**: Demonstrate understanding of project architecture and best practices
4. **Reliability**: Show up, follow through, and communicate clearly
5. **Alignment**: Share ForkTheCity's values and vision

### How to Express Interest

If you're interested in becoming a maintainer:

1. Continue making quality contributions
2. Open an issue titled "Maintainer Interest: [Your Name]"
3. Describe your involvement and why you want to be a maintainer
4. Current maintainers will discuss and respond

### Maintainer Privileges

- Commit access to the repository
- Ability to approve and merge PRs
- Access to project management tools
- Listed in project credits
- Influence over project direction

## Questions?

- **General Questions**: Open a [discussion](https://github.com/ForkTheCity/ForkTheCityNetwork/discussions)
- **Bug Reports**: Open an [issue](https://github.com/ForkTheCity/ForkTheCityNetwork/issues)

---

Thank you for contributing to civic technology and making communities better! 🌱
