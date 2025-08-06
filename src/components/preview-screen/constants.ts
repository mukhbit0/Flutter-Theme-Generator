// Design constants for consistent styling
export const DESIGN_CONSTANTS = {
  // Spacing
  SPACING: {
    XS: '0.25rem',    // 4px
    SM: '0.5rem',     // 8px
    MD: '1rem',       // 16px
    LG: '1.5rem',     // 24px
    XL: '2rem',       // 32px
    XXL: '3rem',      // 48px
  },
  
  // Border radius
  RADIUS: {
    SM: '0.375rem',   // 6px
    MD: '0.5rem',     // 8px
    LG: '0.75rem',    // 12px
    XL: '0.875rem',   // 14px
    XXL: '1rem',      // 16px
  },
  
  // Shadows
  SHADOWS: {
    SM: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    MD: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    LG: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    XL: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  
  // Transitions
  TRANSITIONS: {
    FAST: '150ms ease-in-out',
    NORMAL: '200ms ease-in-out',
    SLOW: '300ms ease-in-out',
  },
  
  // Z-index layers
  Z_INDEX: {
    DROPDOWN: 10,
    STICKY: 20,
    MODAL: 30,
    TOOLTIP: 40,
  },
  
  // Color opacity values
  OPACITY: {
    DISABLED: 0.5,
    HOVER: 0.1,
    FOCUS: 0.2,
    SELECTED: 0.15,
  }
} as const

// Sample data for realistic previews
export const SAMPLE_DATA = {
  USER_PROFILES: [
    { name: "Alex Johnson", role: "Senior Flutter Developer", avatar: "👨‍💻", status: "online" },
    { name: "Sarah Chen", role: "UI/UX Designer", avatar: "👩‍🎨", status: "away" },
    { name: "Mike Rodriguez", role: "Product Manager", avatar: "👨‍💼", status: "busy" },
    { name: "Emily Davis", role: "Mobile Architect", avatar: "👩‍💻", status: "online" },
  ],
  
  CARD_CONTENT: [
    {
      title: "Flutter 3.24 Released",
      subtitle: "New features and improvements",
      content: "Discover the latest Material Design 3 improvements, enhanced performance, and new widget capabilities in Flutter 3.24.",
      timestamp: "2 hours ago",
      reactions: 24,
      comments: 8
    },
    {
      title: "Material Design 3 Guide",
      subtitle: "Best practices for modern apps",
      content: "Learn how to implement Material You design system in your Flutter applications with dynamic color schemes.",
      timestamp: "5 hours ago",
      reactions: 56,
      comments: 12
    }
  ],
  
  FORM_FIELDS: [
    { label: "Email Address", placeholder: "john.doe@example.com", type: "email" },
    { label: "Full Name", placeholder: "Enter your full name", type: "text" },
    { label: "Phone Number", placeholder: "+1 (555) 123-4567", type: "tel" },
    { label: "Company", placeholder: "Your company name", type: "text" },
  ],
  
  NAVIGATION_ITEMS: [
    { label: "Dashboard", icon: "🏠", badge: null },
    { label: "Projects", icon: "📁", badge: 3 },
    { label: "Team", icon: "👥", badge: null },
    { label: "Settings", icon: "⚙️", badge: 1 },
    { label: "Analytics", icon: "📊", badge: null },
  ]
} as const

// Accessibility constants
export const A11Y_CONSTANTS = {
  ARIA_LABELS: {
    COLOR_PICKER: "Choose color",
    THEME_TOGGLE: "Toggle theme mode",
    CLOSE_DIALOG: "Close dialog",
    LOADING: "Loading content",
    ERROR: "Error message",
    SUCCESS: "Success message",
  },
  
  KEYBOARD_SHORTCUTS: {
    ESCAPE: 'Escape',
    ENTER: 'Enter',
    SPACE: ' ',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
  }
} as const
