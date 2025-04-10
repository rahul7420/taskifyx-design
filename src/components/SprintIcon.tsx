
import React from 'react';

const SprintIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 12h5" />
      <path d="M17 12h5" />
      <path d="M7 12a5 5 0 0 1 5-5" />
      <path d="M17 12a5 5 0 0 0-5-5" />
      <path d="M12 7v10" />
      <path d="m9 17 3 3 3-3" />
    </svg>
  );
};

export default SprintIcon;
