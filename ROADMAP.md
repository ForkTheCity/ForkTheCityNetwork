# Roadmap

This document outlines the development phases for Fork The City Network, from proof of concept to production-ready deployment.

---

## v0.1 — Proof of Concept (Current)

**Goal:** Demonstrate core functionality with a working prototype that showcases the platform's potential.

**Status:** 📍 Current

### Features
- Clickable hub page with timeline, directory, and volunteer sections
- Microsite template with authentication flow (login, signup)
- Registration system (volunteer profile, entity registration)
- Post creation and management (issues, projects, funding opportunities)
- Local-only data persistence using localStorage API
- Mobile-friendly responsive UI
- Basic accessibility features (WCAG contrast compliance, semantic HTML)
- Simple development workflow (Vite dev server, TypeScript, hot reload)

### Technical Stack (Provisional)
- React 19 + TypeScript
- Vite build system
- CSS-based styling with animations
- localStorage for data persistence
- No backend dependencies

### What's Working
Users can explore the hub page, navigate to microsites, create accounts, register as volunteers or entities, and create/view posts — all without a backend. Perfect for demos and stakeholder feedback.

### What We're Learning

This proof of concept helps us answer:

- **Is this model compelling?** — Do people see value in neighborhood-specific civic organizing platforms?
- **What's missing?** — Which features are essential vs. nice-to-have? What workflows feel clunky?
- **Who's it for?** — Are we serving community organizers, volunteers, civic tech developers, or all three? What do each need?
- **How flexible should it be?** — Should neighborhoods heavily customize their instances, or is consistency more valuable?

**Try it out and share feedback** — We're still shaping what this platform becomes.

---

## v0.2 — Community Pilots

**Goal:** Enable real-world testing with pilot communities by transitioning from localStorage to persistent backend infrastructure.

**Status:** 🚧 Planning

### Business Needs

To move from demo to pilot deployments, communities need:

- **Persistent data** — Real backend that survives browser refreshes and allows multi-device access
- **Identity & access** — User accounts that can be authenticated and authorized with appropriate permissions
- **Media handling** — Ability to upload and display images for profiles, posts, and projects
- **Basic moderation** — Tools for community admins to manage content and handle bad actors
- **Deployment pathways** — Clear instructions for getting an instance running (whether self-hosted or managed)

### Open Questions

We're figuring out:

- **Backend architecture** — What tech stack makes sense for our community of contributors? What makes deployment easiest for non-technical admins?
- **Auth model** — How do we balance security with ease of onboarding? What roles and permissions are needed at this stage?
- **Media storage** — Self-hosted vs. cloud storage? What are the cost/complexity tradeoffs?
- **Moderation approach** — What's the minimum viable tooling? How much should be automated vs. human-reviewed?
- **Hosting options** — Should we provide a managed service, or focus on self-hosting guides? Both?

### Testing with Pilots

We aim to onboard 2-3 local civic tech communities to:
- Validate that the platform meets real-world needs
- Gather feedback on UX, features, and pain points
- Learn what breaks and what works in production
- Iterate based on actual usage patterns

**Interested in piloting?** Open an issue or reach out via project channels.

---

## v0.3 — Production-Ready Forks

**Goal:** Prepare the platform for wider adoption by addressing the technical, legal, and operational needs of communities running independent instances.

**Status:** 📅 Future

### Business Needs

As communities begin deploying their own forks, they'll need:

- **Operational resilience** — How do we ensure instances stay online, recover from failures, and scale with growing user bases?
- **Trust & safety** — What tools and policies do community admins need to maintain healthy, safe spaces? How do we balance openness with protection?
- **Legal compliance** — What are the privacy, data protection, and content liability requirements in different jurisdictions? How can we make compliance accessible to non-technical admins?
- **Sustainability** — How do communities fund hosting, maintenance, and moderation? What cost models make sense for different scales?

### Open Questions

We don't have all the answers yet. Here's what we need to figure out together:

- What's the right balance between prescriptive tooling and flexible customization?
- Should there be a shared infrastructure service, or is full independence better?
- How do we support admins with varying technical expertise?
- What's the minimum viable compliance package for a community fork?
- How do instances federate or share resources without compromising autonomy?

**💬 Join the discussion:** Open an issue or start a thread to share your perspective on production deployment needs.

---

## Future / Wishlist

**Goal:** Expand the platform's reach and capabilities based on community feedback and emerging needs.

### Areas to Explore

Once the core platform is stable, communities have expressed interest in:

- **Mobile-first experiences** — Native apps, PWA support, offline functionality
- **Richer collaboration tools** — Real-time editing, video calls, project management integrations
- **Impact measurement** — Analytics to demonstrate community outcomes for grants and reporting
- **Broader connectivity** — Integration with social media, calendars, payment processors, civic data sources
- **Accessibility enhancements** — Going beyond WCAG AA to serve diverse user needs
- **Internationalization** — Multi-language support and localization for global communities

### How to Shape the Future

These ideas are aspirational, not commitments. The actual direction will depend on:

- What problems pilot communities encounter in practice
- Where contributors choose to invest their time
- What funding or partnerships emerge
- Technological changes in the broader ecosystem

**Have a vision?** Share it in a GitHub issue tagged `wishlist` or `discussion`.

---

## Contributing to the Roadmap

Have ideas for features or improvements? Here's how to contribute:

1. **Open a GitHub Issue** — Tag it with `enhancement` or `feature-request`
2. **Join the Discussion** — Comment on existing roadmap issues
3. **Submit a Pull Request** — Implement features marked as `help-wanted`
4. **Attend Community Calls** — Voice your priorities and use cases

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

---

## Version History

| Version | Release Date | Status | Highlights |
|---------|-------------|--------|------------|
| v0.1    | Dec 2024    | 📍 Current | Initial proof of concept, localStorage-based |
| v0.2    | TBD         | 🚧 Planning | Backend, auth, media storage, pilots |
| v0.3    | TBD         | 📅 Future | Security, privacy, monitoring, production-ready |

---

**Last Updated:** December 19, 2024  
**Maintained by:** Fork The City Community

For questions about the roadmap, open an issue or reach out via the project's communication channels.
