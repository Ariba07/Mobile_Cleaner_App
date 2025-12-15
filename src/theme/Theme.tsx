// src/theme/Theme.ts

export const theme = {
  colors: {
    // Base Colors
    background: '#F8FAFC', // Very light cool gray (Slate 50)
    surface: '#FFFFFF', // Pure white for cards
    primary: '#3B82F6', // Modern Royal Blue
    primaryLight: '#EFF6FF', // Light blue background for active states

    // Text Colors
    textPrimary: '#1E293B', // Dark Slate (Almost Black)
    textSecondary: '#64748B', // Medium Slate (Gray)
    textTertiary: '#94A3B8', // Light Slate
    textInverse: '#FFFFFF',

    // Functional Colors
    success: '#10B981', // Emerald Green
    warning: '#F59E0B', // Amber
    error: '#EF4444', // Red
    info: '#3B82F6', // Blue

    // UI Elements
    border: '#E2E8F0', // Light gray border
    divider: '#F1F5F9',
    ripple: 'rgba(59, 130, 246, 0.1)',
  },

  // Spacing & Layout
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },

  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 999,
  },

  // Typography Scale
  // WE ADD 'as const' HERE TO FIX THE TYPE ERROR
  typography: {
    h1: { fontSize: 28, fontWeight: '700' as const, letterSpacing: -0.5 },
    h2: { fontSize: 22, fontWeight: '700' as const, letterSpacing: -0.3 },
    h3: { fontSize: 18, fontWeight: '600' as const, letterSpacing: -0.2 },
    body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
    caption: { fontSize: 13, fontWeight: '500' as const, color: '#64748B' },
    button: { fontSize: 16, fontWeight: '600' as const, letterSpacing: 0.5 },
  },

  // Soft Shadows (Elevation)
  shadows: {
    sm: {
      shadowColor: '#64748B',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#64748B',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    lg: {
      shadowColor: '#1E293B',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 24,
      elevation: 8,
    },
  },
};

export type Theme = typeof theme;
