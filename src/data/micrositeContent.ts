export const micrositeHeroContent = {
  defaultCityName: "[City Name]",
  description: "A community-powered civic network for transparent, efficient local problem-solving. Track issues, coordinate volunteers, and fund civic projects directly.",
  buttons: [
    { text: "Report an Issue", href: "#issues", type: "primary" as const },
    { text: "Volunteer", href: "#volunteers", type: "secondary" as const },
    { text: "Contribute Funding", href: "#funding", type: "secondary" as const }
  ]
};

export const issuesData = [
  {
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic issues near intersection of Main St and 5th Ave.",
    status: "open" as const,
    location: "Downtown",
    supporters: 12,
    timeAgo: "2 days ago"
  },
  {
    title: "Park Lighting Needed",
    description: "Community park needs additional lighting for safety in evening hours.",
    status: "progress" as const,
    location: "Riverside",
    supporters: 28,
    timeAgo: "1 week ago"
  },
  {
    title: "Bike Lane Completion",
    description: "Missing section of bike lane on Oak Avenue has been completed.",
    status: "resolved" as const,
    location: "Northside",
    supporters: 45,
    timeAgo: "2 weeks ago"
  }
];

export const projectsShowcase = {
  emoji: "🌱",
  title: "Making Real Impact",
  description: "Our community projects are making tangible improvements to local infrastructure and quality of life. From tree planting initiatives to smart bus shelters, every project is funded and tracked transparently."
};

export const projectsData = [
  {
    emoji: "🌳",
    title: "Urban Tree Planting",
    description: "Planting 500 trees across the city to improve air quality and provide shade.",
    progress: 65,
    raised: "$12,500",
    volunteers: 32
  },
  {
    emoji: "♻️",
    title: "Community Recycling Hub",
    description: "Building a neighborhood recycling center with educational workshops.",
    progress: 40,
    raised: "$8,200",
    volunteers: 18
  },
  {
    emoji: "🚌",
    title: "Smart Bus Shelters",
    description: "Installing solar-powered shelters with real-time transit information.",
    progress: 85,
    raised: "$24,000",
    volunteers: 15
  }
];

export const volunteersData = [
  {
    initials: "JD",
    name: "Jane Doe",
    role: "Project Coordinator",
    projects: 15,
    hours: 120
  },
  {
    initials: "MS",
    name: "Mike Smith",
    role: "Community Organizer",
    projects: 8,
    hours: 85
  },
  {
    initials: "SJ",
    name: "Sarah Johnson",
    role: "Technical Lead",
    projects: 12,
    hours: 95
  },
  {
    initials: "AL",
    name: "Alex Lee",
    role: "Volunteer",
    projects: 5,
    hours: 42
  }
];

export const fundingShowcase = {
  emoji: "💰",
  title: "100% Transparent Funding",
  description: "Every dollar is tracked and accounted for. Our community members can see exactly where funds come from and how they're being used to improve our city."
};

export const fundingOverview = {
  totalAmount: "$44,700",
  label: "Total Funds Raised This Year"
};

export const fundingData = [
  {
    icon: "💰",
    title: "Available Funds",
    amount: "$6,500",
    description: "Ready to be allocated to new projects"
  },
  {
    icon: "🚀",
    title: "Active Projects",
    amount: "$32,200",
    description: "Currently funding 8 active initiatives"
  },
  {
    icon: "✅",
    title: "Completed",
    amount: "$6,000",
    description: "5 projects successfully funded and completed"
  }
];

export const fundingButtons = [
  { text: "Make a Contribution", href: "#", type: "accent" as const },
  { text: "View Transparency Report", href: "#", type: "secondary" as const }
];

export const micrositeFooterContent = {
  defaultCityName: "[City Name]",
  about: {
    title: "About",
    description: "This is a ForkTheCity instance for {cityName}. We're a community-owned civic network dedicated to transparent, efficient local problem-solving."
  },
  quickLinks: {
    title: "Quick Links",
    links: [
      { text: "Report Issue", href: "#issues" },
      { text: "View Projects", href: "#projects" },
      { text: "Volunteer", href: "#volunteers" },
      { text: "Contribute", href: "#funding" }
    ]
  },
  resources: {
    title: "Resources",
    links: [
      { text: "Documentation", href: "#" },
      { text: "Community Guidelines", href: "#" },
      { text: "Privacy Policy", href: "#" },
      { text: "Data Transparency", href: "#" }
    ]
  },
  connect: {
    title: "Connect",
    links: [
      { text: "Discord Community", href: "#" },
      { text: "ForkTheCity Network", href: "https://forkthecity.org" },
      { text: "GitHub Repository", href: "#" },
      { text: "Contact Us", href: "#" }
    ]
  },
  copyright: "© 2025 {cityName} ForkTheCity Instance • Community-Owned • MIT License",
  tagline: "All data belongs to this community and its contributors."
};
