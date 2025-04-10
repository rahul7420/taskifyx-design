
import React from 'react';

const SprintIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
      <path d="M16.2 6.8a4 4 0 0 1 0 5.6" />
      <path d="M17.8 4.2a8 8 0 0 1 0 10.6" />
    </svg>
  );
};

export default SprintIcon;
