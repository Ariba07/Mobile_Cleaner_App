import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { theme } from '../theme/Theme';

export const FolderIcon = ({ size = 24, color = '#3B82F6' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 8.2C3 7.08 3 6.52 3.218 6.092C3.41 5.716 3.716 5.41 4.092 5.218C4.52 5 5.08 5 6.2 5H9.68C10.24 5 10.52 5 10.78 5.055C11.012 5.104 11.236 5.188 11.442 5.304C11.674 5.436 11.874 5.626 12.274 6.006L13.726 7.394C14.126 7.774 14.326 7.964 14.558 8.096C14.764 8.212 14.988 8.296 15.22 8.345C15.48 8.4 15.76 8.4 16.32 8.4H17.8C18.92 8.4 19.48 8.4 19.908 8.618C20.284 8.81 20.59 9.116 20.782 9.492C21 9.92 21 10.48 21 11.6V15.8C21 16.92 21 17.48 20.782 17.908C20.59 18.284 20.284 18.59 19.908 18.782C19.48 19 18.92 19 17.8 19H6.2C5.08 19 4.52 19 4.092 18.782C3.716 18.59 3.41 18.284 3.218 17.908C3 17.48 3 16.92 3 15.8V8.2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export const CopyIcon = ({ size = 24, color = '#8B5CF6' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M8 8V5.2C8 4.08 8 3.52 8.218 3.092C8.41 2.716 8.716 2.41 9.092 2.218C9.52 2 10.08 2 11.2 2H18.8C19.92 2 20.48 2 20.908 2.218C21.284 2.41 21.59 2.716 21.782 3.092C22 3.52 22 4.08 22 5.2V12.8C22 13.92 22 14.48 21.782 14.908C21.59 15.284 21.284 15.59 20.908 15.782C20.48 16 19.92 16 18.8 16H16M5.2 22H12.8C13.92 22 14.48 22 14.908 21.782C15.284 21.59 15.59 21.284 15.782 20.908C16 20.48 16 19.92 16 18.8V11.2C16 10.08 16 9.52 15.782 9.092C15.59 8.716 15.284 8.41 14.908 8.218C14.48 8 13.92 8 12.8 8H5.2C4.08 8 3.52 8 3.092 8.218C2.716 8.41 2.41 8.716 2.218 9.092C2 9.52 2 10.08 2 11.2V18.8C2 19.92 2 20.48 2.218 20.908C2.41 21.284 2.716 21.59 3.092 21.782C3.52 22 4.08 22 5.2 22Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export const BoltIcon = ({ size = 24, color = '#F59E0B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export const ChartIcon = ({ size = 24, color = '#10B981' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 3V21H21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 16L12 11L16 15L21 10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="7" cy="16" r="1.5" fill={color} />
    <Circle cx="12" cy="11" r="1.5" fill={color} />
    <Circle cx="16" cy="15" r="1.5" fill={color} />
    <Circle cx="21" cy="10" r="1.5" fill={color} />
  </Svg>
);

export const SearchIcon = ({ size = 16, color = '#10B981' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle
      cx="11"
      cy="11"
      r="8"
      stroke={color}
      strokeWidth="2"
    />
    <Path
      d="M21 21L16.65 16.65"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

// Animated Trash Icon
export const TrashIcon = ({ 
  size = 80, 
  color = theme.colors.primary 
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 11v6M14 11v6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

// Sparkles Icon for clean state
export const SparklesIcon = ({ size = 80 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3l1.545 4.635L18.18 9.18l-4.635 1.545L12 15.36l-1.545-4.635L5.82 9.18l4.635-1.545L12 3z"
      fill="#10B981"
      stroke="#10B981"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 3l.5 1.5L8 5l-1.5.5L6 7 5.5 5.5 4 5l1.5-.5L6 3zM18 17l.5 1.5L20 19l-1.5.5L18 21l-.5-1.5L16 19l1.5-.5L18 17z"
      fill="#10B981"
    />
  </Svg>
);

// Refresh Icon
export const RefreshIcon = ({ 
  size = 20, 
  color = '#FFF' 
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 4v6h6M23 20v-6h-6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);