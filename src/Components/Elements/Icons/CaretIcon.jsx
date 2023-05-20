import React from 'react';


export const CaretIcon = ({ fill, ...props }) => {
  return (
    <svg
      {...props}
      width="11"
      height="7"
      viewBox="0 0 11 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6315 0H0.368974C0.0611615 0 -0.110714 0.325 0.0799115 0.546875L5.21116 6.49687C5.35804 6.66719 5.64085 6.66719 5.78929 6.49687L10.9205 0.546875C11.1112 0.325 10.9393 0 10.6315 0Z"
        fill={fill}
      />
    </svg>
  );
};

CaretIcon.defaultProps = {
  fill: '#000',
};

export default CaretIcon;
