export const StarIcon = ({ filled = false, className = "h-4 w-4" }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    className={className}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={filled ? undefined : "1.7"}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m10 2.7 2.273 4.606 5.083.739-3.678 3.585.868 5.062L10 14.298 5.454 16.692l.868-5.062-3.678-3.585 5.083-.739L10 2.702Z" />
  </svg>
);

export const SearchIcon = ({ className = "h-4 w-4" }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const CalendarIcon = ({ className = "h-4 w-4" }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 3v3" />
    <path d="M16 3v3" />
    <path d="M4 9h16" />
    <rect x="4" y="5" width="16" height="15" rx="2" />
  </svg>
);

export const ChevronDownIcon = ({ className = "h-4 w-4" }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);