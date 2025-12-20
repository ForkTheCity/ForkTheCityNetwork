export const headerContent = {
  title: "ForkTheCity",
  subtitle: "Don't wait for bureaucracy. Build the infrastructure your community needs—today.",
  description: "A platform for communities to create transparent, community-owned civic networks from open-source infrastructure.",
  buttons: [
    { text: "Fork Your City", href: "#create", type: "primary" as const },
    { text: "Explore Communities", href: "#directory", type: "secondary" as const }
  ]
};

export const problemCards = [
  {
    emoji: "🐌",
    title: "Slow Governments",
    description: "Cities don't lack resources—they lack coordination. Government systems have become slow, opaque, and tangled in regulations that hinder local efficiency."
  },
  {
    emoji: "🔀",
    title: "Fragmentation",
    description: "Donors, coalitions, and volunteers mean well, but fragmentation between these entities results in duplicated efforts and wasted time."
  },
  {
    emoji: "⏳",
    title: "Waiting Game",
    description: "Communities wait months or years for simple improvements while navigating bureaucratic hurdles and outdated processes."
  }
];

export const solutionContent = {
  title: "The Solution",
  tagline: "Instead of waiting for governments to act, ForkTheCity provides the digital infrastructure for communities to \"fork the system\".",
  showcase: {
    emoji: "🛠️",
    title: "Build Community Infrastructure",
    description: "ForkTheCity provides everything you need to create a transparent, community-owned civic network. From tracking local issues to coordinating volunteers and managing funding, we give communities the tools to solve problems without waiting for bureaucracy."
  },
  features: [
    {
      icon: "🏙️",
      title: "Microsite Template",
      description: "A civic network platform for each city or community, enabling residents to:",
      items: [
        "Track local issues and civic projects",
        "Coordinate volunteers and contributors",
        "Manage direct community funding",
        "Provide visibility for local nonprofits and coalitions",
        "Organize and execute community-driven solutions"
      ]
    },
    {
      icon: "🌐",
      title: "Landing Page & Directory",
      description: "The gateway for users to discover ForkTheCity instances:",
      items: [
        "Learn how to fork a microsite for your community",
        "Browse existing community instances",
        "Prevent duplicate microsites for the same city",
        "Recruit maintainers, advocates, and engineers",
        "Share success stories and best practices"
      ]
    },
    {
      icon: "🛠️",
      title: "Open Infrastructure",
      description: "Comprehensive resources and tools for community forkers:",
      items: [
        "Detailed setup guides and documentation",
        "Security measures and data protection",
        "CI/CD pipelines and deployment tooling",
        "Testing environments and uptime monitoring",
        "Backup strategies and disaster recovery"
      ]
    }
  ]
};

export const timelineItems = [
  {
    phase: "The Problem",
    title: "Communities Are Stuck Waiting",
    description: "Cities have resources but lack coordination. Government systems are slow, opaque, and tangled in regulations.",
    icon: "🏛️",
    emoji: "🌆",
    details: [
      "Bureaucracy slows down simple improvements by months or years",
      "Fragmented efforts between donors, coalitions, and volunteers",
      "Communities lose momentum waiting for permission to solve their own problems"
    ]
  },
  {
    phase: "The Vision",
    title: "Fork the System",
    description: "What if communities could build their own civic infrastructure without waiting for bureaucracy?",
    icon: "💡",
    emoji: "💡",
    details: [
      "Open-source platform for transparent civic coordination",
      "Community-owned data and decision-making",
      "Direct funding and volunteer management",
      "Proven templates that communities can fork and customize"
    ]
  },
  {
    phase: "How It Works",
    title: "Create Your City Instance",
    description: "Launch your own ForkTheCity microsite in minutes, not months.",
    icon: "🚀",
    emoji: "🌍",
    hasCTA: true,
    ctaContent: {
      emoji: "🍴",
      title: "Ready to Start?",
      buttonText: "Fork Your City Now!",
      buttonUrl: "https://github.com/forkthecity",
      hint: "Click to get started →"
    },
    details: [
      "1. Fork the repository and customize for your city",
      "2. Deploy your microsite (we provide hosting guides)",
      "3. Invite community members and start tracking issues",
      "4. Coordinate volunteers and manage transparent funding",
      "5. Build real solutions without waiting for permission"
    ]
  },
  {
    phase: "The Impact",
    title: "Communities Taking Action",
    description: "When communities own their civic infrastructure, real change happens.",
    icon: "🌟",
    emoji: "🚀",
    details: [
      "Track and resolve local issues transparently",
      "Fund community projects with full accountability",
      "Build a network of engaged volunteers",
      "Share successes and learnings with other cities",
      "Prove that citizen-led infrastructure works"
    ]
  },
  {
    phase: "Join the Movement",
    title: "Be Part of the Solution",
    description: "ForkTheCity is more than software—it's a movement to rebuild civic infrastructure from the ground up.",
    icon: "🤝",
    emoji: "🤝",
    details: [
      "Fork your city and start building today",
      "Connect with other community organizers",
      "Contribute code, design, or policy advocacy",
      "Help us prove that communities can govern themselves",
      "Build the future of civic engagement"
    ]
  }
];

export const involvedRoles = [
  {
    icon: "💻",
    title: "Infrastructure Team",
    items: [
      "Handle CI/CD pipelines and build scripts",
      "Maintain testing environments",
      "Oversee uptime monitoring and backups",
      "Improve deployment tooling"
    ]
  },
  {
    icon: "📋",
    title: "Policy Advocates",
    items: [
      "Map regulations obstructing civic innovation",
      "Create educational materials for volunteers",
      "Build partnerships with local governments",
      "Use data to demonstrate impact and push reform"
    ]
  },
  {
    icon: "🎨",
    title: "Design & UX Team",
    items: [
      "Define visual language and branding",
      "Create wireframes and component libraries",
      "Design gamified features and local badges",
      "Ensure mobile and low-bandwidth accessibility"
    ]
  },
  {
    icon: "📢",
    title: "Outreach Team",
    items: [
      "Recruit contributors and manage Discord",
      "Manage social media and educational content",
      "Help new forks grow their networks",
      "Organize hackathons and prototype challenges"
    ]
  },
  {
    icon: "🔬",
    title: "R&D Engineering Team",
    items: [
      "Prototype low-cost civic technologies",
      "Develop build guides and cost breakdowns",
      "Publish accessible research findings",
      "Partner with universities and makerspaces"
    ]
  },
  {
    icon: "🏘️",
    title: "Community Forker",
    items: [
      "Deploy a ForkTheCity instance for your area",
      "Organize local volunteers and initiatives",
      "Build transparent civic infrastructure",
      "Own your community's data and decisions"
    ]
  }
];

export const involvedButtons = [
  {
    text: "View on GitHub",
    href: "https://github.com/forkthecity",
    type: "primary" as const,
    external: true
  },
  {
    text: "Join Discord",
    href: "#",
    type: "secondary" as const,
    external: false
  }
];

export const volunteerGalleryContent = {
  header: {
    title: "We Need You",
    description: "ForkTheCity is built by volunteers who believe communities can govern themselves. Join us.",
    buttons: [
      { text: "View on GitHub", href: "https://github.com/forkthecity", type: "primary" as const, external: true },
      { text: "Join Discord", href: "#", type: "secondary" as const, external: false }
    ]
  },
  roles: [
    {
      icon: "💻",
      title: "Full-Stack Engineers",
      tagline: "Build the Platform",
      description: "Help us create and maintain the core ForkTheCity infrastructure that communities worldwide will use.",
      hoverButton: { text: "Start Contributing", href: "https://github.com/forkthecity" }
    },
    {
      icon: "🎨",
      title: "UI/UX Designers",
      tagline: "Design for Everyone",
      description: "Create intuitive, accessible interfaces that make civic engagement feel natural and empowering.",
      hoverButton: { text: "View Design Tasks", href: "#design" }
    },
    {
      icon: "📋",
      title: "Policy Advocates",
      tagline: "Navigate the System",
      description: "Help communities understand regulations and build partnerships with local governments.",
      hoverButton: { text: "Join Policy Team", href: "#policy" }
    },
    {
      icon: "📢",
      title: "Community Organizers",
      tagline: "Grow the Network",
      description: "Recruit new cities, manage communications, and build relationships across the ForkTheCity network.",
      hoverButton: { text: "Get Started", href: "#outreach" }
    },
    {
      icon: "🔬",
      title: "R&D Engineers",
      tagline: "Prototype Solutions",
      description: "Research and develop low-cost civic technologies that communities can build themselves.",
      hoverButton: { text: "View Projects", href: "#research" }
    },
    {
      icon: "🛡️",
      title: "Security Experts",
      tagline: "Protect Communities",
      description: "Ensure that community data stays safe and that the platform remains secure and trustworthy.",
      hoverButton: { text: "Join Security Team", href: "#security" }
    },
    {
      icon: "📊",
      title: "Data Analysts",
      tagline: "Measure Impact",
      description: "Track metrics, analyze outcomes, and help communities demonstrate the value of their work.",
      hoverButton: { text: "Explore Data", href: "#analytics" }
    },
    {
      icon: "✍️",
      title: "Technical Writers",
      tagline: "Document Everything",
      description: "Create clear guides that help communities fork, deploy, and maintain their instances.",
      hoverButton: { text: "Write Docs", href: "#docs" }
    },
    {
      icon: "🏘️",
      title: "City Maintainers",
      tagline: "Lead Your Community",
      description: "Deploy and manage a ForkTheCity instance for your local area. Be the change.",
      hoverButton: { text: "Fork Your City", href: "#fork" }
    }
  ],
  footer: {
    title: "Ready to Get Started?",
    description: "Pick a role above that matches your skills, or create your own. Every contribution matters.",
    button: { text: "Start Contributing", href: "https://github.com/forkthecity/contribute" }
  }
};

export const ethicsPrinciples = [
  {
    icon: "🔒",
    title: "Data Ownership & Privacy",
    items: [
      "All data belongs to the community",
      "We never store user identities from microsites",
      "Contributors can remain pseudonymous",
      "Right to delete data at any time"
    ]
  },
  {
    icon: "⚖️",
    title: "Liability & Responsibility",
    items: [
      "We provide infrastructure, not authority",
      "Communities ensure local legal compliance",
      "Maintainers not liable for platform misuse",
      "Encouraged to register as nonprofit/cooperative"
    ]
  },
  {
    icon: "✨",
    title: "Ethical Use Standards",
    items: [
      "Transparent decision-making processes",
      "No disguising unpaid labor for profit",
      "Optional but recommended residency verification",
      "Community-owned and community-governed"
    ]
  }
];

export const footerContent = {
  copyright: "© 2025 ForkTheCity. Released under the MIT License.",
  tagline: "Empowering communities to build transparent, efficient civic infrastructure.",
  links: [
    { text: "GitHub", href: "https://github.com/forkthecity", external: true },
    { text: "Documentation", href: "#" },
    { text: "Discord", href: "#" },
    { text: "Contact", href: "#" }
  ]
};
