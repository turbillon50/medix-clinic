"use client"
import * as React from "react"

type P = { size?: number; className?: string; style?: React.CSSProperties }
const base = (size: number, style?: React.CSSProperties): React.SVGProps<SVGSVGElement> => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round",
  style,
})

// Inline SVG icon set — propios, sin lucide ni ninguna dependencia.
export const Icons: Record<string, (p: P) => React.ReactElement> = {
  home: ({ size = 18, style }) => (<svg {...base(size, style)}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></svg>),
  calendar: ({ size = 18, style }) => (<svg {...base(size, style)}><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v3M16 3v3" /></svg>),
  file: ({ size = 18, style }) => (<svg {...base(size, style)}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></svg>),
  flask: ({ size = 18, style }) => (<svg {...base(size, style)}><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" /><path d="M7.5 15h9" /></svg>),
  card: ({ size = 18, style }) => (<svg {...base(size, style)}><rect x="2.5" y="5.5" width="19" height="13" rx="2" /><path d="M2.5 10h19M6 15h4" /></svg>),
  pill: ({ size = 18, style }) => (<svg {...base(size, style)}><rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-45 12 12)" /><path d="M8.5 8.5l7 7" /></svg>),
  star: ({ size = 18, style }) => (<svg {...base(size, style)}><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z" /></svg>),
  stethoscope: ({ size = 18, style }) => (<svg {...base(size, style)}><path d="M6 3v5a4 4 0 0 0 8 0V3" /><path d="M10 16a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="11" r="2" /></svg>),
  users: ({ size = 18, style }) => (<svg {...base(size, style)}><circle cx="9" cy="8" r="3.2" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M16 5.5a3 3 0 0 1 0 5.8M17.5 20a5.5 5.5 0 0 0-3-4.9" /></svg>),
  money: ({ size = 18, style }) => (<svg {...base(size, style)}><circle cx="12" cy="12" r="8.5" /><path d="M14.5 9.2C14 8.4 13 8 12 8c-1.4 0-2.5.8-2.5 2s1.1 1.8 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1 0-2-.4-2.5-1.2M12 6.5v11" /></svg>),
  chart: ({ size = 18, style }) => (<svg {...base(size, style)}><path d="M4 4v16h16" /><path d="M8 16v-4M12 16V8M16 16v-6" /></svg>),
  report: ({ size = 18, style }) => (<svg {...base(size, style)}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></svg>),
  logout: ({ size = 18, style }) => (<svg {...base(size, style)}><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" /><path d="M10 12H3M6 8l-4 4 4 4" /></svg>),
  bolt: ({ size = 18, style }) => (<svg {...base(size, style)}><path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="currentColor" stroke="none" /></svg>),
  plus: ({ size = 18, style }) => (<svg {...base(size, style)}><path d="M12 5v14M5 12h14" /></svg>),
  arrowRight: ({ size = 18, style }) => (<svg {...base(size, style)}><path d="M4 12h15M13 6l6 6-6 6" /></svg>),
  back: ({ size = 18, style }) => (<svg {...base(size, style)}><path d="M20 12H5M11 6l-6 6 6 6" /></svg>),
  bell: ({ size = 18, style }) => (<svg {...base(size, style)}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>),
  sun: ({ size = 18, style }) => (<svg {...base(size, style)}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>),
  moon: ({ size = 18, style }) => (<svg {...base(size, style)}><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8z" /></svg>),
  heart: ({ size = 18, style }) => (<svg {...base(size, style)}><path d="M12 20s-7-4.6-9.2-9C1.4 8 3 4.7 6.2 4.7c2 0 3.2 1.2 3.8 2.3.6-1.1 1.8-2.3 3.8-2.3 3.2 0 4.8 3.3 3.4 6.3C19 15.4 12 20 12 20z" /></svg>),
}

export function Icon({ name, size = 18, style }: { name: string; size?: number; style?: React.CSSProperties }) {
  const C = Icons[name] || Icons.heart
  return <C size={size} style={style} />
}
